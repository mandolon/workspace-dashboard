
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [oAuthError, setOAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/dashboard", { replace: true });
      }
    });
  }, [navigate]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    if (!email || !password) {
      setError("Please enter email and password.");
      setBusy(false);
      return;
    }
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/dashboard", { replace: true });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` }
        });
        if (error) throw error;
        setMode("login");
        setError("Sign up successful! Please check your email to confirm your account.");
      }
    } catch (err: any) {
      setError(err.message || "Unknown error.");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setOAuthError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setOAuthError(err.message || "Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md bg-white border rounded-lg shadow-lg px-8 py-9 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-center mb-2">{mode === "login" ? "Log In" : "Sign Up"}</h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            type="email"
            autoComplete="email"
            value={email}
            disabled={busy}
            onChange={handleEmailChange}
          />
          <Input
            placeholder="Password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            value={password}
            disabled={busy}
            onChange={handlePasswordChange}
          />
          {error && <div className="text-red-500 text-xs">{error}</div>}
          <Button type="submit" disabled={busy} className="mt-2 w-full">
            {mode === "login" ? (busy ? "Logging in..." : "Log In") : (busy ? "Signing up..." : "Sign Up")}
          </Button>
        </form>
        <div className="relative flex justify-center items-center py-2">
          <span className="text-xs text-muted-foreground bg-white px-2">OR</span>
          <div className="absolute w-full left-0 border-t -z-10" />
        </div>
        <Button onClick={handleGoogle} className="w-full bg-red-500 hover:bg-red-600 text-white">
          Continue with Google
        </Button>
        {oAuthError && <div className="text-xs text-red-500 text-center">{oAuthError}</div>}
        <div className="mt-1 text-xs text-center">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button type="button" className="text-blue-600 hover:underline" onClick={() => setMode("signup")}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" className="text-blue-600 hover:underline" onClick={() => setMode("login")}>
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
