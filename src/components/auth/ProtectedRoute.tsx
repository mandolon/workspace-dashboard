import React from "react";
import { useUser } from "@/contexts/UserContext";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useUser();
  const location = useLocation();

  // Re-route unauthenticated users (based on supabase not just context!)
  const [authChecked, setAuthChecked] = React.useState(false);
  const [authed, setAuthed] = React.useState(isAuthenticated);

  React.useEffect(() => {
    supabase.auth.getSession().then((result) => {
      setAuthed(!!result.data.session);
      setAuthChecked(true);
    });
  }, [location, isAuthenticated]);

  if (!authChecked) {
    return <div className="flex items-center justify-center min-h-screen"><span>Loading...</span></div>;
  }

  if (!authed) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
