
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

// Simple random name generator (first name + last name)
function generateRandomName() {
  const firstNames = ["Jordan", "Morgan", "Taylor", "Casey", "Drew", "Riley", "Reese", "Jamie", "Skyler", "Dakota", "Alex", "Avery", "Rowan", "Charlie", "Emery"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Davis", "Miller", "Wilson", "Taylor", "Moore", "Clark", "Lopez", "Lee", "Walker", "Hall", "Allen"];
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(generateRandomName());
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Check if authenticated; if so, redirect
  useEffect(() => {
    let ignore = false;
    supabase.auth.getSession().then(({ data }) => {
      if (!ignore && data?.session) {
        navigate("/dashboard", { replace: true });
      }
      setLoading(false);
    });
    return () => { ignore = true };
  }, [navigate]);

  // Handle auth state changes (redirect after login/signup)
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/dashboard", { replace: true });
      }
    });
    return () => { listener.subscription.unsubscribe(); };
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Clean up any stale auth state (best practice)
    try {
      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith("supabase.auth.") || k.includes("sb-")) localStorage.removeItem(k);
      });
      await supabase.auth.signOut({ scope: "global" });
    } catch (e) {}

    const { error: err } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setIsSubmitting(false);
    if (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Always set fullName in metadata and profiles at signup
    const randomName = fullName.trim() !== "" ? fullName : generateRandomName();

    // Email magic: let user sign up then assign name and insert to profiles (relay goes through trigger)
    const { data, error: err } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: randomName
        },
        emailRedirectTo: `${window.location.origin}/`, // always needed!
      }
    });
    if (err) {
      setIsSubmitting(false);
      setError(err.message || "Sign up failed");
      return;
    }
    // Best-effort: if signup succeeded, insert/update the profile as well (the DB trigger may do this too)
    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        email: data.user.email,
        full_name: randomName,
        avatar_url: null,
        created_at: new Date().toISOString(),
      });
    }
    setIsSubmitting(false);
    // Note: user may have to check their email if confirm email is ON.
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading…</div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="rounded-lg border border-border bg-white dark:bg-card shadow-xl p-7 w-full max-w-xs flex flex-col gap-5">
        <h2 className="text-lg font-bold text-center mb-2">
          {isLogin ? "Log in" : "Create your account"}
        </h2>
        <form onSubmit={isLogin ? handleLogin : handleSignUp} className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            autoComplete="username"
            id="email"
            required
            type="email"
            value={email}
            disabled={isSubmitting}
            onChange={e => setEmail(e.target.value)}
            className="rounded border border-input px-3 py-2"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            autoComplete={isLogin ? "current-password" : "new-password"}
            id="password"
            required
            type="password"
            value={password}
            disabled={isSubmitting}
            onChange={e => setPassword(e.target.value)}
            className="rounded border border-input px-3 py-2"
          />
          {!isLogin && (
            <>
              <Label htmlFor="full_name">Your Name</Label>
              <Input
                id="full_name"
                type="text"
                value={fullName}
                disabled={isSubmitting}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Jane Smith"
                className="rounded border border-input px-3 py-2"
                maxLength={40}
                minLength={3}
              />
              <div className="flex justify-end">
                <Button
                  tabIndex={-1}
                  variant="outline"
                  size="sm"
                  type="button"
                  className="text-xs"
                  onClick={() => setFullName(generateRandomName())}
                  disabled={isSubmitting}
                >
                  Randomize
                </Button>
              </div>
            </>
          )}
          {error && (
            <div className="rounded bg-destructive/80 text-destructive-foreground px-2 py-1 mb-2 text-xs">{error}</div>
          )}
          <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
            {isSubmitting ? (isLogin ? "Logging in…" : "Signing up…") : (isLogin ? "Log In" : "Sign Up")}
          </Button>
        </form>
        <div className="text-center mt-2 text-xs">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button className="font-medium hover:underline text-primary" disabled={isSubmitting} onClick={() => { setIsLogin(false); setFullName(generateRandomName()); }}>Sign up</button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button className="font-medium hover:underline text-primary" disabled={isSubmitting} onClick={() => setIsLogin(true)}>Log in</button>
            </>
          )}
        </div>
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Demo Authentication (Supabase)
          <br />
          All new users become <span className="font-semibold">Admin</span> automatically.
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

