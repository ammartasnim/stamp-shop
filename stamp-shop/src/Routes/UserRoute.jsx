import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function UserRoute({ loggedIn, subscribed }) {
  if (!subscribed) return <Navigate to="/subscribe" replace />;
  if (!loggedIn) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default UserRoute;
