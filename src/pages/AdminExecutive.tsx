import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { seedExecutives } from "@/utils/seedExecutives";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface Executive {
  id: string;
  name: string;
  role: string;
  linkedIn: string;
  tier: number;
  year: string;
  imageUrl?: string;
}

const AdminExecutive = () => {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExec, setEditingExec] = useState<Executive | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    linkedIn: "",
    tier: 1,
    year: "2024/2025",
    imageUrl: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });
  const navigate = useNavigate();

  const fetchExecutives = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "executives"));
      const execs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Executive));
      setExecutives(execs.sort((a, b) => a.tier - b.tier));
    } catch (error) {
      console.error("Error fetching executives:", error);
      alert("Error loading executives. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/admin/login");
      } else {
        fetchExecutives();
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSeed = async () => {
    if (!confirm("This will add all executives to the database. Continue?")) return;
    setLoading(true);
    try {
      await seedExecutives();
      await fetchExecutives();
      alert("Executives seeded successfully!");
    } catch (error: any) {
      console.error("Seed error:", error);
      alert(`Error seeding executives: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = formData.imageUrl;
      
      if (imageFile) {
        const storageRef = ref(storage, `executives/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }
      
      const data = { ...formData, imageUrl };
      
      if (editingExec) {
        await updateDoc(doc(db, "executives", editingExec.id), data);
      } else {
        await addDoc(collection(db, "executives"), data);
      }
      setDialogOpen(false);
      resetForm();
      await fetchExecutives();
    } catch (error) {
      console.error("Error saving executive:", error);
    }
  };

  const handleEdit = (exec: Executive) => {
    setEditingExec(exec);
    setFormData({
      name: exec.name,
      role: exec.role,
      linkedIn: exec.linkedIn,
      tier: exec.tier,
      year: exec.year,
      imageUrl: exec.imageUrl || ""
    });
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteDialog.id) return;
    try {
      await deleteDoc(doc(db, "executives", deleteDialog.id));
      setDeleteDialog({ open: false, id: null });
      await fetchExecutives();
    } catch (error) {
      console.error("Error deleting executive:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      linkedIn: "",
      tier: 1,
      year: "2024/2025",
      imageUrl: ""
    });
    setImageFile(null);
    setEditingExec(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading executives...</p>
          <p className="text-sm text-gray-500 mt-2">If this takes too long, check Firebase Console</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Manage Executive Council</h1>
          <Button onClick={() => navigate("/admin/dashboard")}>Back to Dashboard</Button>
        </div>

        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="mb-6">
              <Plus className="mr-2 h-4 w-4" />
              Add Executive
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingExec ? "Edit" : "Add"} Executive</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Role</Label>
                <Input
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>LinkedIn URL (optional)</Label>
                <Input
                  value={formData.linkedIn}
                  onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                />
              </div>
              <div>
                <Label>Tier</Label>
                <Select
                  value={formData.tier.toString()}
                  onValueChange={(value) => setFormData({ ...formData, tier: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - President</SelectItem>
                    <SelectItem value="2">2 - Vice President/Secretary</SelectItem>
                    <SelectItem value="3">3 - Treasurer/Organizer/Registrar</SelectItem>
                    <SelectItem value="4">4 - Representatives</SelectItem>
                    <SelectItem value="5">5 - Patrons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Year</Label>
                <Input
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2024/2025"
                  required
                />
              </div>
              <div>
                <Label>Profile Picture</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
                {formData.imageUrl && <p className="text-xs text-gray-500 mt-1">Current image will be replaced if new file is uploaded</p>}
              </div>
              <Button type="submit" className="w-full">
                {editingExec ? "Update" : "Add"} Executive
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <div className="grid gap-4">
          {executives.map((exec) => (
            <Card key={exec.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  {exec.imageUrl && (
                    <img src={exec.imageUrl} alt={exec.name} className="w-16 h-16 rounded-full object-cover" />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{exec.name}</h3>
                    <p className="text-sm text-gray-600">{exec.role} - Tier {exec.tier}</p>
                    <p className="text-xs text-gray-500">{exec.year}</p>
                    {exec.linkedIn && (
                      <a href={exec.linkedIn} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                        LinkedIn Profile
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(exec)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => setDeleteDialog({ open: true, id: exec.id })}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ConfirmDialog
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({ open, id: null })}
          onConfirm={handleDelete}
          title="Delete Executive?"
          description="This will permanently remove this executive from the council."
        />
      </div>
    </div>
  );
};

export default AdminExecutive;
