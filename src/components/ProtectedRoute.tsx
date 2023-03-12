import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../utils/useAuth";

type Props = {
  allowedRole: string;
};

function ProtectedRoute({ allowedRole }: Props) {
  const { profile } = useAuth();
  const location = useLocation();

  return profile?.role?.match(allowedRole) ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
}

export default ProtectedRoute;
