import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterChapter, setFilterChapter] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [sortBy, setSortBy] = useState("membershipNo");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "members"));
      const membersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMembers(membersList);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const deleteMember = async (id: string) => {
    try {
      await deleteDoc(doc(db, "members", id));
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const filteredMembers = members
    .filter((member: any) => {
      const matchesSearch = 
        member.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.membershipNo?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesChapter = filterChapter === "all" || member.chapter === filterChapter;
      const matchesYear = filterYear === "all" || member.yearOfStudy === filterYear;
      
      return matchesSearch && matchesChapter && matchesYear;
    })
    .sort((a: any, b: any) => {
      if (sortBy === "membershipNo") {
        // Sort by membership number descending (latest first)
        return (b.membershipNo || "").localeCompare(a.membershipNo || "");
      }
      if (sortBy === "name") return a.fullName?.localeCompare(b.fullName);
      if (sortBy === "chapter") return a.chapter?.localeCompare(b.chapter);
      if (sortBy === "year") return a.yearOfStudy?.localeCompare(b.yearOfStudy);
      return 0;
    });

  const chapters = Array.from(new Set(members.map((m: any) => m.chapter).filter(Boolean)));
  const years = Array.from(new Set(members.map((m: any) => m.yearOfStudy).filter(Boolean)));

  const clearFilters = () => {
    setSearchTerm("");
    setFilterChapter("all");
    setFilterYear("all");
    setSortBy("membershipNo");
  };

  const hasActiveFilters = searchTerm || filterChapter !== "all" || filterYear !== "all" || sortBy !== "membershipNo";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Manage Members ({filteredMembers.length}/{members.length})</h1>
          <Button onClick={() => navigate("/admin/dashboard")}>Back to Dashboard</Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Search & Filter</h3>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or membership no..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterChapter} onValueChange={setFilterChapter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Chapter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chapters</SelectItem>
                  {chapters.map((chapter: any) => (
                    <SelectItem key={chapter} value={chapter}>{chapter}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year: any) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="membershipNo">Sort by Registration (Latest First)</SelectItem>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="chapter">Sort by Chapter</SelectItem>
                  <SelectItem value="year">Sort by Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Members List</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="min-w-max">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Full Name</TableHead>
                    <TableHead className="min-w-[200px]">Email</TableHead>
                    <TableHead className="min-w-[120px]">Contact</TableHead>
                    <TableHead className="min-w-[100px]">Chapter</TableHead>
                    <TableHead className="min-w-[120px]">Year of Study</TableHead>
                    <TableHead className="min-w-[150px]">Admission No.</TableHead>
                    <TableHead className="min-w-[120px]">Membership No.</TableHead>
                    <TableHead className="min-w-[100px]">Payment</TableHead>
                    <TableHead className="min-w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member: any) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.fullName}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.contact}</TableCell>
                      <TableCell>{member.chapter}</TableCell>
                      <TableCell>{member.yearOfStudy}</TableCell>
                      <TableCell>{member.admissionNo}</TableCell>
                      <TableCell>{member.membershipNo}</TableCell>
                      <TableCell>{member.paymentAmount}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteMember(member.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMembers;