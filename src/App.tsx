import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from './components/Layout/Layout';
import { ThemeProvider } from './components/ThemeProvider';
import { useAuthStore } from './store/authStore';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AskQuestion from './pages/AskQuestion';
import QuestionDetail from './pages/QuestionDetail';
import Profile from './pages/Profile';
import Tags from './pages/Tags';
import Users from './pages/Users';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected routes with layout */}
                <Route path="/" element={
                  <Layout>
                    <Home />
                  </Layout>
                } />
                
                <Route path="/questions" element={
                  <Layout>
                    <Home />
                  </Layout>
                } />
                
                <Route path="/questions/:id" element={
                  <Layout>
                    <QuestionDetail />
                  </Layout>
                } />
                
                <Route path="/tags" element={
                  <Layout>
                    <Tags />
                  </Layout>
                } />
                
                <Route path="/users" element={
                  <Layout>
                    <Users />
                  </Layout>
                } />
                
                <Route path="/ask" element={
                  <ProtectedRoute>
                    <Layout>
                      <AskQuestion />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
