import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
}

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ alt: "", category: "Events" });
  const [file, setFile] = useState<File | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; image: GalleryImage | null }>({ open: false, image: null });
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const snapshot = await getDocs(collection(db, "gallery"));
    setImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage)));
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setUploading(true);
    const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    
    await addDoc(collection(db, "gallery"), {
      ...formData,
      url
    });
    
    resetForm();
    fetchImages();
    setUploading(false);
  };

  const handleDelete = async () => {
    if (!deleteDialog.image) return;
    await deleteDoc(doc(db, "gallery", deleteDialog.image.id));
    const storageRef = ref(storage, deleteDialog.image.url);
    await deleteObject(storageRef);
    setDeleteDialog({ open: false, image: null });
    fetchImages();
  };

  const resetForm = () => {
    setShowForm(false);
    setFormData({ alt: "", category: "Events" });
    setFile(null);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Manage Gallery</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-1" /> Add Image
            </Button>
            <Button onClick={() => navigate("/admin/dashboard")}>Back to Dashboard</Button>
          </div>
        </div>

        {showForm && <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload New Image</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Image Description"
                value={formData.alt}
                onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                required
              />
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Site Visits">Site Visits</SelectItem>
                  <SelectItem value="Meetings">Meetings</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
              <div className="flex gap-2">
                <Button type="submit" disabled={uploading}>
                  <Upload className="h-4 w-4 mr-1" />
                  {uploading ? "Uploading..." : "Upload Image"}
                </Button>
                <Button type="button" onClick={resetForm} variant="outline">Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="aspect-square relative group">
                <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button onClick={() => setDeleteDialog({ open: true, image })} size="icon" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-2">
                <p className="text-sm font-medium truncate">{image.alt}</p>
                <p className="text-xs text-gray-500">{image.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <ConfirmDialog
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({ open, image: null })}
          onConfirm={handleDelete}
          title="Delete Image?"
          description="This will permanently delete this image from the gallery."
        />
      </div>
    </div>
  );
};

export default AdminGallery;
