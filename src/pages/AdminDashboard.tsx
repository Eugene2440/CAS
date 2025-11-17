import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Image, Download, Award, Layers, TrendingUp } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, byChapter: {} as Record<string, number>, byYear: {} as Record<string, number> });

  useEffect(() => {
    const fetchStats = async () => {
      const snapshot = await getDocs(collection(db, "members"));
      const members = snapshot.docs.map(doc => doc.data());
      
      const byChapter: Record<string, number> = {};
      const byYear: Record<string, number> = {};
      
      members.forEach((member: any) => {
        byChapter[member.chapter] = (byChapter[member.chapter] || 0) + 1;
        byYear[member.yearOfStudy] = (byYear[member.yearOfStudy] || 0) + 1;
      });
      
      setStats({ total: members.length, byChapter, byYear });
    };
    fetchStats();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">CSA Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/admin/members")}>
              <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                <Users className="h-12 w-12 text-blue-600" />
                <p className="text-sm font-medium text-center">Members</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/admin/executive")}>
              <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                <Award className="h-12 w-12 text-purple-600" />
                <p className="text-sm font-medium text-center">Executive Council</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/admin/chapters")}>
              <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                <Layers className="h-12 w-12 text-orange-600" />
                <p className="text-sm font-medium text-center">Chapters</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/admin/gallery")}>
              <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                <Image className="h-12 w-12 text-green-600" />
                <p className="text-sm font-medium text-center">Gallery</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/admin/downloads")}>
              <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                <Download className="h-12 w-12 text-red-600" />
                <p className="text-sm font-medium text-center">Downloads</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Member Analytics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Total Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Layers className="h-4 w-4 mr-2" />
                    By Chapter
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(stats.byChapter).map(([chapter, count]) => (
                      <div key={chapter} className="flex justify-between text-sm">
                        <span>{chapter}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    By Year of Study
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(stats.byYear).map(([year, count]) => (
                      <div key={year} className="flex justify-between text-sm">
                        <span>Year {year}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;