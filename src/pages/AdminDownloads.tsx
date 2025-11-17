import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Document {
  id: string;
  name: string;
  description: string;
  url: string;
  fileName: string;
}

const AdminDownloads = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const snapshot = await getDocs(collection(db, "documents"));
    setDocuments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Document)));
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setUploading(true);
    const storageRef = ref(storage, `documents/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    
    await addDoc(collection(db, "documents"), {
      ...formData,
      url,
      fileName: file.name
    });
    
    resetForm();
    fetchDocuments();
    setUploading(false);
  };

  const handleDelete = async (document: Document) => {
    if (confirm("Delete this document?")) {
      await deleteDoc(doc(db, "documents", document.id));
      const storageRef = ref(storage, document.url);
      await deleteObject(storageRef);
      fetchDocuments();
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setFormData({ name: "", description: "" });
    setFile(null);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Manage Downloads</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-1" /> Add Document
            </Button>
            <Button onClick={() => navigate("/admin/dashboard")}>Back to Dashboard</Button>
          </div>
        </div>

        {showForm && <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload New Document</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Document Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
              <div>
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={uploading}>
                  <Upload className="h-4 w-4 mr-1" />
                  {uploading ? "Uploading..." : "Upload Document"}
                </Button>
                <Button type="button" onClick={resetForm} variant="outline">Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>}

        <div className="grid gap-4">
          {documents.map((document) => (
            <Card key={document.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{document.name}</h3>
                    <p className="text-gray-600 mt-2">{document.description}</p>
                    <p className="text-sm text-gray-500 mt-1">File: {document.fileName}</p>
                  </div>
                  <Button onClick={() => handleDelete(document)} size="icon" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDownloads;
