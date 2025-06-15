import React, { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { TEAM_USERS } from "@/utils/teamUsers";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { loginAs, isAuthenticated } = useUser();
  const [selectedId, setSelectedId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already authenticated (on a weird reload), redirect
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId) {
      setSubmitting(true);
      loginAs(selectedId);
      setTimeout(() => {
        setSubmitting(false);
        navigate("/dashboard", { replace: true });
      }, 200); // delay for effect
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-xs bg-white border border-border rounded-lg shadow-lg p-7 flex flex-col gap-5 mt-10">
        <div className="rounded bg-yellow-50 border border-yellow-200 px-3 py-2 text-xs text-yellow-900 mb-4 text-center">
          <strong>Demo Login</strong>: Instantly log in as any test user for trying different roles and interfaces.<br/>
          <span className="block mt-1">
            For real accounts (email/password), use <a href="/auth" className="underline text-yellow-700 hover:text-yellow-900">Real Account Login</a>.
          </span>
        </div>
        <h2 className="text-lg font-semibold text-center mb-2">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-sm" htmlFor="user-select">
            Select user:
          </label>
          <select
            id="user-select"
            value={selectedId}
            disabled={submitting}
            onChange={e => setSelectedId(e.target.value)}
            className="rounded border border-input px-3 py-2"
          >
            <option value="">Choose a user...</option>
            {TEAM_USERS.map(u => (
              <option key={u.id} value={u.id}>
                {u.fullName} ({u.role})
              </option>
            ))}
          </select>
          <Button type="submit" disabled={!selectedId || submitting} className="mt-2 w-full">
            {submitting ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </div>
      <div className="mt-6 text-xs text-muted-foreground text-center">
        Demo authentication<br />
        (No password required. Choose a user to test as Admin, Team, or Client)
        <br />
        <span className="block mt-3">
          <a href="/auth" className="underline text-yellow-700 hover:text-yellow-900">
            Or use Real Account Login (email/password)
          </a>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
