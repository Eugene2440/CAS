
import React from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    // Construct message with proper line breaks that work across platforms
    const whatsappMessage = 
      `Hello CSA, my name is ${data.name}.%0A%0A` +
      `Subject: ${data.subject}%0A%0A` +
      `Message: ${data.message}%0A%0A` +
      `You can reach me at: ${data.email}`;
    
    // Open in new tab with properly encoded message
    window.open(`https://wa.me/254758647130?text=${whatsappMessage}`, '_blank');
  }

  const gradientInputStyle = "text-lg bg-gradient-to-r from-blue-50 to-orange-50 focus:from-blue-100 focus:to-orange-100";

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="csa-container">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="section-title text-center after:left-1/2 after:-translate-x-1/2 text-slide-in" style={{ animationDelay: "0.1s" }}>
            Contact Us
          </h2>
          <p className="text-xl text-csa-gray mt-6 text-fade-in" style={{ animationDelay: "0.3s" }}>
            Have questions or want to get in touch? We'd love to hear from you!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-fade-in" style={{ animationDelay: "0.5s" }}>
            <h3 className="text-2xl font-semibold text-csa-navy mb-6">Get In Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start hover-scale">
                <Mail className="h-6 w-6 text-csa-orange mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-csa-navy text-lg">Email</h4>
                  <a href="mailto:csa@students.tukenya.ac.ke" className="text-csa-gray hover:text-csa-orange transition-colors text-lg">
                    csa@students.tukenya.ac.ke
                  </a>
                </div>
              </div>
              
              <div className="flex items-start hover-scale">
                <MessageCircle className="h-6 w-6 text-csa-orange mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-csa-navy text-lg">WhatsApp</h4>
                  <a href="https://wa.me/254758647130" target="_blank" rel="noopener noreferrer" className="text-csa-gray hover:text-csa-orange transition-colors text-lg">
                    +254 758 647 130
                  </a>
                </div>
              </div>
              
              <div className="flex items-start hover-scale">
                <Phone className="h-6 w-6 text-csa-orange mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-csa-navy text-lg">Phone</h4>
                  <a href="tel:+254704317047" className="text-csa-gray hover:text-csa-orange transition-colors text-lg">
                    +254 704 317 047
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 text-fade-in" style={{ animationDelay: "0.7s" }}>
            <h3 className="text-2xl font-semibold text-csa-navy mb-6">Send us a Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} className={gradientInputStyle} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" type="email" {...field} className={gradientInputStyle} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Message subject" {...field} className={gradientInputStyle} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message" 
                          rows={4} 
                          {...field} 
                          className={gradientInputStyle}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button type="submit" className="w-full bg-csa-navy hover:bg-csa-orange text-lg">
                    Send Message via WhatsApp
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Note: This will redirect you to WhatsApp to complete your message.
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
