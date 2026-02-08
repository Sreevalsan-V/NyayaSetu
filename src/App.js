import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import Login from './pages/Login';
import ClientDashboard from './pages/ClientDashboard';
import AdvocateDashboard from './pages/AdvocateDashboard';

function PrivateRoute({ children, allowedRole }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    } else if (user.role !== allowedRole) {
      navigate('/login', { replace: true });
    }
  }, [user, allowedRole, navigate]);
  
  if (!user || user.role !== allowedRole) {
    return null;
  }
  
  return children;
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={user.role === 'CLIENT' ? '/client' : '/advocate'} replace /> : <Login />} />
      <Route 
        path="/client/*" 
        element={
          <PrivateRoute allowedRole="CLIENT">
            <ClientDashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/advocate/*" 
        element={
          <PrivateRoute allowedRole="ADVOCATE">
            <AdvocateDashboard />
          </PrivateRoute>
        } 
      />
      <Route path="/" element={<Navigate to={user ? (user.role === 'CLIENT' ? '/client' : '/advocate') : '/login'} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
