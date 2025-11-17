import React, { useState } from "react";
import { createAdminUser } from "@/utils/createAdmin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreateAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreateAdmin = async () => {
    setLoading(true);
    setMessage("");
    try {
      await createAdminUser();
      setMessage("Admin user created successfully! Email: cas@admin.com");
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Create Admin User</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleCreateAdmin} 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Admin User"}
          </Button>
          {message && (
            <p className={`text-sm ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAdmin;