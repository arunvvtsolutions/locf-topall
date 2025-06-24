import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/Layout/AppLayout";
import Index from "./pages/index.tsx";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/guards/PrivateRoute.tsx";
import { AuthProvider } from "./components/auth/AuthProvider.tsx";
import Login from "./pages/Login.tsx";
import { UnifiedProgramManagement } from "./components/features/ProgramManagement/UnifiedProgramManagement.tsx";
import ProgramOutComes from "./components/features/programOutcomes/ProgramOutComes.tsx";

// Import all page components

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<h1>world</h1>} />

          {/* Protected Routes */}
          <Route
            path="*"
            element={
              <PrivateRoute>
                <AppLayout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/program-management" element={<UnifiedProgramManagement organizationId="1" />} />
                    <Route path="/program-outcomes/:programId" element={<ProgramOutComes />} />
                  </Routes>
                </AppLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </TooltipProvider>
);

export default App;
