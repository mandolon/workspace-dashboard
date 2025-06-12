
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import InboxPage from "./pages/InboxPage";
import TeamsPage from "./pages/TeamsPage";
import InvoicePage from "./pages/InvoicePage";
import NotFound from "./pages/NotFound";
import { SidebarProvider } from "./contexts/SidebarContext";

const queryClient = new QueryClient();

const LocationLogger = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('App component is rendering, current path:', location.pathname);
  }, [location]);
  
  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <LocationLogger />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tasks" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/project/:projectId" element={<ProjectPage />} />
              <Route path="/task/:taskId" element={<TaskDetailPage />} />
              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/invoices" element={<InvoicePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
