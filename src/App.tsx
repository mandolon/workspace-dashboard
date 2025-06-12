
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import TaskDetailPage from "./pages/TaskDetailPage";
import ProjectPage from "./pages/ProjectPage";
import InboxPage from "./pages/InboxPage";
import TeamsPage from "./pages/TeamsPage";
import InvoicePage from "./pages/InvoicePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log('App component is rendering, current path:', window.location.pathname);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Index />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/invoices" element={<InvoicePage />} />
            <Route path="/task/:taskId" element={<TaskDetailPage />} />
            <Route path="/project/:projectId" element={<ProjectPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
