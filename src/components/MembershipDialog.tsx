import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface MembershipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MembershipDialog = ({ open, onOpenChange }: MembershipDialogProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [course, setCourse] = useState("");
  const [isTukStudent, setIsTukStudent] = useState(false);
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const isFormValid = fullName && email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && yearOfStudy && course && (isTukStudent ? mpesaNumber.match(/^07\d{8}$/) : true);

  const handleProceedToPayment = async () => {
    if (!isFormValid) return;

    if (!isTukStudent) {
      toast({
        title: "External Registration",
        description: "Please contact the CSA Registrar for guidance on external membership registration.",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      
      const { data, error } = await supabase.functions.invoke("process-membership", {
        body: {
          fullName,
          email,
          yearOfStudy,
          course,
          mpesaNumber,
        },
      });

      if (error) throw error;

      toast({
        title: "Payment Processing",
        description: "M-Pesa STK Push has been sent to " + mpesaNumber,
      });

      // Poll for payment status
      const checkPaymentStatus = setInterval(async () => {
        const { data: statusData } = await supabase.functions.invoke("check-payment-status", {
          body: { checkoutRequestId: data.checkoutRequestId },
        });

        if (statusData?.status === "success") {
          clearInterval(checkPaymentStatus);
          toast({
            title: "Registration Successful!",
            description: "Your membership has been recorded.",
          });
          setIsProcessing(false);
          onOpenChange(false);
          // Reset form
          setFullName("");
          setEmail("");
          setYearOfStudy("");
          setCourse("");
          setIsTukStudent(false);
          setMpesaNumber("");
        } else if (statusData?.status === "failed") {
          clearInterval(checkPaymentStatus);
          throw new Error("Payment failed");
        }
      }, 3000);

      // Stop checking after 2 minutes
      setTimeout(() => clearInterval(checkPaymentStatus), 120000);
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Error",
        description: "Payment processing failed. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white border-2 border-csa-orange">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-csa-navy text-center">
            Join the Construction Students Association (CSA-TUK)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-csa-navy font-medium">
              Full Name *
            </Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="border-csa-navy/30 focus:border-csa-orange"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-csa-navy font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border-csa-navy/30 focus:border-csa-orange"
            />
          </div>

          {/* Year of Study */}
          <div className="space-y-2">
            <Label htmlFor="yearOfStudy" className="text-csa-navy font-medium">
              Year of Study *
            </Label>
            <Select value={yearOfStudy} onValueChange={setYearOfStudy}>
              <SelectTrigger className="border-csa-navy/30 focus:border-csa-orange">
                <SelectValue placeholder="Select year of study" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="year1">Year 1</SelectItem>
                <SelectItem value="year2">Year 2</SelectItem>
                <SelectItem value="year3">Year 3</SelectItem>
                <SelectItem value="year4">Year 4</SelectItem>
                <SelectItem value="graduate">Graduate Member</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Course */}
          <div className="space-y-2">
            <Label className="text-csa-navy font-medium">Course *</Label>
            <RadioGroup value={course} onValueChange={setCourse}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="qs" id="qs" />
                <Label htmlFor="qs" className="font-normal cursor-pointer">Quantity Surveying (QS)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cm" id="cm" />
                <Label htmlFor="cm" className="font-normal cursor-pointer">Construction Management (CM)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="re" id="re" />
                <Label htmlFor="re" className="font-normal cursor-pointer">Real Estate (RE)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bct" id="bct" />
                <Label htmlFor="bct" className="font-normal cursor-pointer">Building & Civil Technology (BCT)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* TUK Student Check */}
          <div className="flex items-center space-x-2 py-2">
            <Checkbox
              id="tukStudent"
              checked={isTukStudent}
              onCheckedChange={(checked) => setIsTukStudent(checked as boolean)}
            />
            <Label htmlFor="tukStudent" className="text-csa-navy font-medium cursor-pointer">
              Are you a TUK student?
            </Label>
          </div>

          {/* M-Pesa Number (conditional) */}
          {isTukStudent && (
            <div className="space-y-2 bg-blue-50 p-4 rounded-lg border border-csa-navy/20">
              <Label htmlFor="mpesaNumber" className="text-csa-navy font-medium">
                Safaricom M-Pesa Number *
              </Label>
              <Input
                id="mpesaNumber"
                value={mpesaNumber}
                onChange={(e) => setMpesaNumber(e.target.value)}
                placeholder="07xxxxxxxx"
                maxLength={10}
                className="border-csa-navy/30 focus:border-csa-orange"
              />
              <p className="text-sm text-csa-gray">
                Membership fee: Ksh 200
              </p>
            </div>
          )}

          {/* Non-TUK Student Message */}
          {!isTukStudent && course && (
            <div className="bg-orange-50 p-4 rounded-lg border border-csa-orange/30">
              <p className="text-sm text-csa-navy">
                Kindly contact the CSA Registrar via{" "}
                <a href="mailto:csa@students.tukenya.ac.ke" className="text-csa-orange font-medium hover:underline">
                  csa@students.tukenya.ac.ke
                </a>{" "}
                for guidance on external membership registration.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <Button
              onClick={handleProceedToPayment}
              disabled={!isFormValid || isProcessing}
              className="flex-1 bg-csa-orange hover:bg-csa-orange/90 text-white"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 border-csa-navy text-csa-navy hover:bg-csa-navy/10"
              disabled={isProcessing}
            >
              Cancel
            </Button>
          </div>
          
          {/* Privacy Note */}
          <p className="text-xs text-center text-csa-gray">
            Your details are used solely for CSA membership registration and remain confidential.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipDialog;
