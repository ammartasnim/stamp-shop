import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute({ role, loggedIn }) {
    if(!loggedIn) return <Navigate to="/login" replace />;
    if(role !== 'admin') return <Navigate to="/home" replace />;

  return <Outlet />;
}

export default AdminRoute