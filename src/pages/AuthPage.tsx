import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
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
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setErrorMsg(error.message);
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const randomName = getRandomName();
    const redirectTo = `${window.location.origin}/auth`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: randomName, crm_role: "team" },
        emailRedirectTo: redirectTo,
      },
    });
    if (error) setErrorMsg(error.message);
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
              : "Sign up to create an account (random name will be assigned)"}
          </p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={isLoginPage ? handleLogin : handleSignUp}>
          <label className="text-sm" htmlFor="email">Email</label>
          <Input
            id="email"
            autoComplete="username"
            type="email"
            value={email}
            disabled={loading}
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
            disabled={loading}
            onChange={e => setPassword(e.target.value)}
            required
            className="mb-4"
          />
          {errorMsg && <div className="text-red-600 dark:text-red-400 text-xs text-center">{errorMsg}</div>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-2"
          >
            {isLoginPage ? "Log In" : "Sign Up"}
          </Button>
        </form>
        <div className="flex flex-row items-center justify-center mt-6 text-xs text-muted-foreground">
          <button
            type="button"
            className="underline text-primary"
            onClick={() => setIsLoginPage(!isLoginPage)}
          >
            {isLoginPage ? "Create an account" : "Already have an account?"}
          </button>
        </div>
      </div>
      <div className="mt-6 text-xs text-muted-foreground text-center">
        {isLoginPage
          ? "Forgot your password? Use the Supabase reset!"
          : "Random name is assigned for each new user on sign up. All signups become Admins."}
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
