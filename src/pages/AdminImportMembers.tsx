import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Upload, CheckCircle, XCircle } from "lucide-react";

const AdminImportMembers = () => {
  const [csvText, setCsvText] = useState("");
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ success: number; failed: number; total: number } | null>(null);
  const navigate = useNavigate();

  const handleImport = async () => {
    if (!csvText.trim()) return;
    
    setImporting(true);
    setResult(null);
    
    try {
      const lines = csvText.trim().split('\n');
      let success = 0;
      let failed = 0;
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split('\t');
        
        const member = {
          fullName: values[0]?.trim() || "",
          email: values[1]?.trim() || "",
          contact: values[2]?.trim() || "",
          chapter: values[3]?.trim() || "",
          yearOfStudy: values[4]?.trim() || "",
          admissionNo: values[5]?.trim() || "",
          membershipNo: values[6]?.trim() || "",
          paymentAmount: values[7]?.trim() || "KSH.100",
          registeredAt: new Date().toISOString()
        };
        
        try {
          await addDoc(collection(db, "members"), member);
          success++;
          console.log(`Imported: ${member.fullName}`);
        } catch (error) {
          failed++;
          console.error(`Failed: ${member.fullName}`, error);
        }
      }
      
      setResult({ success, failed, total: lines.length - 1 });
    } catch (error) {
      console.error("Import error:", error);
      alert("Import failed. Check console for details.");
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Import Members from CSV</h1>
          <Button onClick={() => navigate("/admin/dashboard")}>Back to Dashboard</Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>1. Open your Excel/Google Sheets file</p>
            <p>2. Select all the data rows (excluding header)</p>
            <p>3. Copy (Ctrl+C)</p>
            <p>4. Paste in the text area below</p>
            <p>5. Click "Import Members"</p>
            <p className="text-orange-600 font-medium">Expected columns: NAME, EMAIL, CONTACT, COURSE, YEAR OF STUDY, Admission No., MEMBERSHIP NO, 2024/2025</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Paste CSV Data</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-64 p-4 border rounded font-mono text-sm"
              placeholder="Paste your copied data here..."
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
            />
            <div className="mt-4 flex gap-2">
              <Button onClick={handleImport} disabled={!csvText.trim() || importing}>
                <Upload className="h-4 w-4 mr-2" />
                {importing ? "Importing..." : "Import Members"}
              </Button>
              <Button onClick={() => setCsvText("")} variant="outline">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Import Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Successfully imported: {result.success}</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <span>Failed: {result.failed}</span>
              </div>
              <div className="font-semibold">Total processed: {result.total}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminImportMembers;
