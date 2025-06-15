
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const getRandomName = () => {
  const names = [
    "Alex Morgan", "Helen Stark", "Marcelo Vieira", "Yana Petrov",
    "Keisha Yates", "Jan Novak", "Samuel Kim", "Rene Fischer", "Ruby Wang", "Casey Wright"
  ];
  return names[Math.floor(Math.random() * names.length)];
};

const AuthPage: React.FC = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Always redirect logged in users
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        navigate("/", { replace: true });
      }
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        navigate("/", { replace: true });
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMsg(error.message);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    if (!fullName.trim()) {
      setErrorMsg("Full Name is required.");
      toast({
        title: "Sign up failed",
        description: "Full Name is required.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const redirectTo = `${window.location.origin}/auth`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, crm_role: "team" },
        emailRedirectTo: redirectTo,
      },
    });
    if (error) {
      setErrorMsg(error.message);
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
      setSuccessMsg("");
    } else {
      setErrorMsg("");
      setSuccessMsg(
        "Sign up successful! Please check your email to confirm your account before logging in."
      );
      toast({
        title: "Sign up successful",
        description: "Check your email to confirm your account.",
        variant: "default",
      });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-3">
      <div className="w-full max-w-sm mx-auto bg-white dark:bg-neutral-900 border border-border rounded-lg shadow-xl p-7 mt-10">
        <div className="mb-2">
          <div className="rounded 
            bg-blue-50 dark:bg-blue-900/40 
            border border-blue-200 dark:border-blue-800 
            px-3 py-2 text-xs 
            text-blue-900 dark:text-blue-100 
            mb-4 text-center"
          >
            <strong>Real&nbsp;Account&nbsp;Login/Signup</strong>: Use this form to log in or register using your real email and password (Supabase auth).<br/>
            <span className="block mt-1">
              For quick testing, try the{" "}
              <a href="/login" className="underline text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-blue-100">
                Demo Login
              </a>
              .
            </span>
          </div>
        </div>
        <div className="mb-6 flex flex-col items-center">
          <LogIn className="text-primary mb-2" size={32} />
          <h2 className="text-xl font-bold">{isLoginPage ? "Log In" : "Sign Up"}</h2>
          <p className="text-xs text-muted-foreground mt-1 text-center">
            {isLoginPage
              ? "Log in with your email and password"
              : "Sign up to create an account (full name required)"}
          </p>
        </div>
        {/* Show a clear success message after signup */}
        {successMsg && (
          <div className="mb-4 p-2 rounded-md bg-green-50 text-green-900 border border-green-200 text-xs text-center dark:bg-green-900/40 dark:text-green-100 dark:border-green-700">
            {successMsg}
          </div>
        )}
        {/* Alert for error (if any and not handled by toast) */}
        {errorMsg && (
          <div className="mb-2 p-2 rounded-md bg-red-50 text-red-800 border border-red-200 text-xs text-center dark:bg-red-900/40 dark:text-red-100 dark:border-red-700">
            {errorMsg}
          </div>
        )}
        <form className="flex flex-col gap-3"
          onSubmit={isLoginPage ? handleLogin : handleSignUp}
          aria-disabled={!!successMsg}
        >
          {!isLoginPage && (
            <>
              <label className="text-sm" htmlFor="full-name">Full Name</label>
              <Input
                id="full-name"
                autoComplete="name"
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                disabled={loading || !!successMsg}
                required
                className="mb-2"
                placeholder="Enter your full name"
              />
            </>
          )}
          <label className="text-sm" htmlFor="email">Email</label>
          <Input
            id="email"
            autoComplete="username"
            type="email"
            value={email}
            disabled={loading || !!successMsg}
            onChange={e => setEmail(e.target.value)}
            required
            className="mb-2"
          />
          <label className="text-sm" htmlFor="password">Password</label>
          <Input
            id="password"
            autoComplete={isLoginPage ? "current-password" : "new-password"}
            type="password"
            value={password}
            disabled={loading || !!successMsg}
            onChange={e => setPassword(e.target.value)}
            required
            className="mb-4"
          />
          <Button
            type="submit"
            disabled={loading || !!successMsg}
            className="w-full mt-2"
          >
            {isLoginPage ? "Log In" : "Sign Up"}
          </Button>
        </form>
        <div className="flex flex-row items-center justify-center mt-6 text-xs text-muted-foreground">
          <button
            type="button"
            className="underline text-primary"
            onClick={() => {
              setIsLoginPage(!isLoginPage);
              setErrorMsg("");
              setSuccessMsg("");
            }}
            disabled={loading}
          >
            {isLoginPage ? "Create an account" : "Already have an account?"}
          </button>
        </div>
      </div>
      <div className="mt-6 text-xs text-muted-foreground text-center">
        {isLoginPage
          ? "Forgot your password? Use the Supabase reset!"
          : "Full name is required for sign up. All signups become Admins."}
        <br/>
        <span className="block mt-3">
          <a
            href="/login"
            className="underline text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-blue-100"
          >
            Or use Demo Login (instant, for testing)
          </a>
        </span>
      </div>
    </div>
  );
};

export default AuthPage;
