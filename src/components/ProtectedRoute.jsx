import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useUserStore from '../store/userStore';

const ProtectedRoute = () => {
  const { user, loading } = useUserStore();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
