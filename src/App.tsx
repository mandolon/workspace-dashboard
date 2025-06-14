
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "next-themes"; // Added
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import InboxPage from "./pages/InboxPage";
import TeamsPage from "./pages/TeamsPage";
import InvoicePage from "./pages/InvoicePage";
import TimesheetsPage from "./pages/TimesheetsPage";
import WhiteboardsPage from "./pages/WhiteboardsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import TasksPage from "./pages/TasksPage";
import { SidebarProvider } from "./contexts/SidebarContext";
import { ProjectDataProvider } from "./contexts/ProjectDataContext";
import { UserProvider } from "./contexts/UserContext";
import { TaskProvider } from "./contexts/TaskContext";

const LocationLogger = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('App component is rendering, current path:', location.pathname);
  }, [location]);
  
  return null;
};

const App = () => {
  // Create QueryClient inside the component to ensure proper React context
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <UserProvider>
            <SidebarProvider>
              <ProjectDataProvider>
                <BrowserRouter>
                  <TaskProvider>
                    <Toaster />
                    <Sonner />
                    <LocationLogger />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/tasks" element={<TasksPage />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/project/:projectId" element={<ProjectPage />} />
                      <Route path="/task/:taskId" element={<TaskDetailPage />} />
                      <Route path="/inbox" element={<InboxPage />} />
                      <Route path="/teams" element={<TeamsPage />} />
                      <Route path="/invoices" element={<InvoicePage />} />
                      <Route path="/timesheets" element={<TimesheetsPage />} />
                      <Route path="/whiteboards" element={<WhiteboardsPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/settings/notifications" element={<SettingsPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </TaskProvider>
                </BrowserRouter>
              </ProjectDataProvider>
            </SidebarProvider>
          </UserProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
