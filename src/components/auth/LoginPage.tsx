
// This page is obsolete since /login now uses Supabase auth!
// Redirect to /auth if accessed.

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => { navigate("/auth", { replace: true }); }, [navigate]);
  return null;
};
export default LoginPage;
