
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MembershipPage from "./pages/MembershipPage";
import DownloadsPage from "./pages/DownloadsPage";
import MerchandisePage from "./pages/MerchandisePage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import ExecutivePage from "./pages/ExecutivePage";
import ChaptersPage from "./pages/ChaptersPage";
import ProfessionalRegPage from "./pages/ProfessionalRegPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMembers from "./pages/AdminMembers";
import AdminExecutive from "./pages/AdminExecutive";
import AdminChapters from "./pages/AdminChapters";
import AdminDownloads from "./pages/AdminDownloads";
import AdminGallery from "./pages/AdminGallery";
import AdminImportMembers from "./pages/AdminImportMembers";
import CreateAdmin from "./pages/CreateAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/merchandise" element={<MerchandisePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/executive" element={<ExecutivePage />} />
          <Route path="/chapters" element={<ChaptersPage />} />
          <Route path="/professional-reg" element={<ProfessionalRegPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/members" element={<AdminMembers />} />
          <Route path="/admin/executive" element={<AdminExecutive />} />
          <Route path="/admin/chapters" element={<AdminChapters />} />
          <Route path="/admin/downloads" element={<AdminDownloads />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/import-members" element={<AdminImportMembers />} />
          <Route path="/create-admin" element={<CreateAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
