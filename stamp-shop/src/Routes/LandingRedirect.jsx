import React from 'react';
import { Navigate } from 'react-router-dom';

function LandingRedirect({ role }) {
  if (role === 'admin') return <Navigate to="/admindash" replace />;
  return <Navigate to="/home" replace />;
}

export default LandingRedirect;
