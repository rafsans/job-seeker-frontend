import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const userStr = localStorage.getItem('user');
  let user = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    console.error('Failed to parse user data:', e);
  }

  const isOnboardingPage = location.pathname.startsWith('/onboarding');

  if (user) {
    const isRecruiter = user.role === 'RECRUITER';
    
    if (!user.isOnboarded && !isOnboardingPage) {
      const onboardingPath = isRecruiter ? '/onboarding/recruiter' : '/onboarding/seeker';
      return <Navigate to={onboardingPath} replace />;
    }

    if (user.isOnboarded && isOnboardingPage) {
      const dashboardPath = isRecruiter ? '/dashboard/recruiter' : '/dashboard';
      return <Navigate to={dashboardPath} replace />;
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
