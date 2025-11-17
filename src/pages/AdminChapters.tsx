import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface ChapterMember {
  name: string;
  role: string;
}

interface Chapter {
  id: string;
  name: string;
  shortName: string;
  description: string;
  members: ChapterMember[];
}

const AdminChapters = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    description: "",
    members: [{ name: "", role: "" }]
  });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });
  const navigate = useNavigate();

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    const snapshot = await getDocs(collection(db, "chapters"));
    setChapters(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chapter)));
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateDoc(doc(db, "chapters", editingId), formData);
    } else {
      await addDoc(collection(db, "chapters"), formData);
    }
    resetForm();
    fetchChapters();
  };

  const handleDelete = async () => {
    if (!deleteDialog.id) return;
    await deleteDoc(doc(db, "chapters", deleteDialog.id));
    setDeleteDialog({ open: false, id: null });
    fetchChapters();
  };

  const handleEdit = (chapter: Chapter) => {
    setEditingId(chapter.id);
    setShowForm(true);
    setFormData({
      name: chapter.name,
      shortName: chapter.shortName,
      description: chapter.description,
      members: chapter.members
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({ name: "", shortName: "", description: "", members: [{ name: "", role: "" }] });
  };

  const addMember = () => {
    setFormData({ ...formData, members: [...formData.members, { name: "", role: "" }] });
  };

  const removeMember = (index: number) => {
    setFormData({ ...formData, members: formData.members.filter((_, i) => i !== index) });
  };

  const updateMember = (index: number, field: "name" | "role", value: string) => {
    const updated = [...formData.members];
    updated[index][field] = value;
    setFormData({ ...formData, members: updated });
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Manage Chapters</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-1" /> Add Chapter
            </Button>
            <Button onClick={() => navigate("/admin/dashboard")}>Back to Dashboard</Button>
          </div>
        </div>

        {showForm && <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Chapter" : "Add New Chapter"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Chapter Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                placeholder="Short Name (e.g., QS)"
                value={formData.shortName}
                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
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
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Members</h3>
                  <Button type="button" onClick={addMember} size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add Member
                  </Button>
                </div>
                {formData.members.map((member, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) => updateMember(index, "name", e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Role"
                      value={member.role}
                      onChange={(e) => updateMember(index, "role", e.target.value)}
                      required
                    />
                    <Button type="button" onClick={() => removeMember(index)} variant="destructive" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button type="submit">{editingId ? "Update" : "Add"} Chapter</Button>
                {editingId && <Button type="button" onClick={resetForm} variant="outline">Cancel</Button>}
              </div>
            </form>
          </CardContent>
        </Card>}

        <div className="grid gap-4">
          {chapters.map((chapter) => (
            <Card key={chapter.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{chapter.name} ({chapter.shortName})</h3>
                    <p className="text-gray-600 mt-2">{chapter.description}</p>
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Members:</h4>
                      <ul className="space-y-1">
                        {chapter.members.map((member, i) => (
                          <li key={i} className="text-sm">
                            {member.name} - <span className="text-gray-600">{member.role}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleEdit(chapter)} size="icon" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button onClick={() => setDeleteDialog({ open: true, id: chapter.id })} size="icon" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ConfirmDialog
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({ open, id: null })}
          onConfirm={handleDelete}
          title="Delete Chapter?"
          description="This will permanently remove this chapter and all its members."
        />
      </div>
    </div>
  );
};

export default AdminChapters;
