
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

// This assumes UserContext exposes isImpersonating and currentUser
const CLIENT_DASHBOARD_ROUTE = "/client/dashboard";

const ImpersonationGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, isImpersonating, impersonatedUser } = useUser() as any;
  const location = useLocation();
  const navigate = useNavigate();

  // Only lock when impersonating as a client
  useEffect(() => {
    if (
      isImpersonating &&
      impersonatedUser &&
      impersonatedUser.role === "Client" &&
      location.pathname !== CLIENT_DASHBOARD_ROUTE
    ) {
      navigate(CLIENT_DASHBOARD_ROUTE, { replace: true });
    }
  }, [isImpersonating, impersonatedUser, location.pathname, navigate]);

  // If impersonating as client, only allow client dashboard
  if (
    isImpersonating &&
    impersonatedUser &&
    impersonatedUser.role === "Client" &&
    location.pathname !== CLIENT_DASHBOARD_ROUTE
  ) {
    return null; // blank while redirecting
  }
  return <>{children}</>;
};

export default ImpersonationGate;
