
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MeetingProvider } from "./contexts/MeetingContext";
import { LoginPage } from "./pages/LoginPage";
import { VisitorDashboard } from "./pages/VisitorDashboard";
import { ReceptionistDashboard } from "./pages/ReceptionistDashboard";
import { EmployeeDashboard } from "./pages/EmployeeDashboard";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFoundPage } from "./pages/NotFoundPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <MeetingProvider>
              <TooltipProvider>
                <Routes>
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/visitor-dashboard" element={<VisitorDashboard />} />
                  <Route path="/receptionist-dashboard" element={<ReceptionistDashboard />} />
                  <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </MeetingProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
