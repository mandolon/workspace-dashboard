import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from '@/contexts/SidebarContext';
import { UserProvider } from '@/contexts/UserContext';
import { TaskProvider } from '@/contexts/TaskContext';
import { ProjectDataProvider } from '@/contexts/ProjectDataContext';
import { TaskAttachmentProvider } from '@/contexts/TaskAttachmentContext';
import { ThemeProvider } from 'next-themes';
import ImpersonationGate from '@/components/ImpersonationGate';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Import pages
import Index from '@/pages/Index';
import Home2 from '@/pages/Home2';
import Home3 from '@/pages/Home3';
import TasksPage from '@/pages/TasksPage';
import TaskDetailPage from '@/pages/TaskDetailPage';
import ProjectPage from '@/pages/ProjectPage';
import TeamsPage from '@/pages/TeamsPage';
import Dashboard from '@/pages/Dashboard';
import InboxPage from '@/pages/InboxPage';
import SettingsPage from '@/pages/SettingsPage';
import TimesheetsPage from '@/pages/TimesheetsPage';
import WhiteboardsPage from '@/pages/WhiteboardsPage';
import InvoicePage from '@/pages/InvoicePage';
import ClientDashboard from '@/pages/ClientDashboard';
import ClientAccountPage from '@/pages/ClientAccountPage';
import ClientWhiteboards from '@/pages/ClientWhiteboards';
import NotFound from '@/pages/NotFound';
import LoginPage from '@/components/auth/LoginPage';

// Help pages
import AdminHelpPage from '@/pages/AdminHelpPage';
import TeamHelpPage from '@/pages/TeamHelpPage';
import ClientHelpPage from '@/pages/ClientHelpPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <UserProvider>
          <SidebarProvider>
            <ProjectDataProvider>
              <TaskAttachmentProvider>
                <Router>
                  <TaskProvider>
                    <ImpersonationGate>
                      <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/" element={
                          <ProtectedRoute>
                            <Index />
                          </ProtectedRoute>
                        } />
                        <Route path="/home2" element={
                          <ProtectedRoute>
                            <Home2 />
                          </ProtectedRoute>
                        } />
                        <Route path="/home3" element={
                          <ProtectedRoute>
                            <Home3 />
                          </ProtectedRoute>
                        } />
                        <Route path="/tasks" element={
                          <ProtectedRoute>
                            <TasksPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/task/:taskId" element={
                          <ProtectedRoute>
                            <TaskDetailPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/project/:projectId" element={
                          <ProtectedRoute>
                            <ProjectPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/teams" element={
                          <ProtectedRoute>
                            <TeamsPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/dashboard" element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        } />
                        <Route path="/inbox" element={
                          <ProtectedRoute>
                            <InboxPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/settings" element={
                          <ProtectedRoute>
                            <SettingsPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/timesheets" element={
                          <ProtectedRoute>
                            <TimesheetsPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/whiteboards" element={
                          <ProtectedRoute>
                            <WhiteboardsPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/invoice/:invoiceId" element={
                          <ProtectedRoute>
                            <InvoicePage />
                          </ProtectedRoute>
                        } />
                        <Route path="/client-dashboard" element={
                          <ProtectedRoute>
                            <ClientDashboard />
                          </ProtectedRoute>
                        } />
                        <Route path="/client-account" element={
                          <ProtectedRoute>
                            <ClientAccountPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/client-whiteboards" element={
                          <ProtectedRoute>
                            <ClientWhiteboards />
                          </ProtectedRoute>
                        } />
                        <Route path="/help/admin" element={
                          <ProtectedRoute>
                            <AdminHelpPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/help/team" element={
                          <ProtectedRoute>
                            <TeamHelpPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/help/client" element={
                          <ProtectedRoute>
                            <ClientHelpPage />
                          </ProtectedRoute>
                        } />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </ImpersonationGate>
                  </TaskProvider>
                </Router>
                <Toaster />
              </TaskAttachmentProvider>
            </ProjectDataProvider>
          </SidebarProvider>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
