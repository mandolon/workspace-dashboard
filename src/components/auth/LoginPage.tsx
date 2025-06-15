
import React, { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { TEAM_USERS, ALL_USERS } from "@/utils/teamUsers";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { loginAs, isAuthenticated, updateUser } = useUser();
  const [selectedId, setSelectedId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [customFullName, setCustomFullName] = useState("");
  const [customEmail, setCustomEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Get the selected user for default values
  const selectedUser = ALL_USERS.find(u => u.id === selectedId);

  // When user selection changes, set custom fields default to selected user data
  useEffect(() => {
    if (selectedUser) {
      setCustomFullName(selectedUser.fullName);
      setCustomEmail(selectedUser.email);
    } else {
      setCustomFullName("");
      setCustomEmail("");
    }
  }, [selectedUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId) {
      setSubmitting(true);
      loginAs(selectedId);
      // After logging in, override name/email in demo context
      setTimeout(() => {
        // Use updateUser to change name & email in context
        updateUser({
          name: customFullName,
          email: customEmail,
        });
        setSubmitting(false);
        navigate("/dashboard", { replace: true });
      }, 200);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-xs bg-white dark:bg-neutral-900 border border-border rounded-lg shadow-lg p-7 flex flex-col gap-5 mt-10">
        <div className="rounded 
            bg-yellow-50 dark:bg-yellow-900/40 
            border border-yellow-200 dark:border-yellow-800
            px-3 py-2 text-xs 
            text-yellow-900 dark:text-yellow-100 
            mb-4 text-center"
        >
          <strong>Demo Login</strong>: Instantly log in as any test user for trying different roles and interfaces.<br/>
          <span className="block mt-1">
            For real accounts (email/password), use{" "}
            <a href="/auth" className="underline text-yellow-700 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100">
              Real Account Login
            </a>
            .
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
            className="rounded border border-input px-3 py-2 bg-background dark:bg-neutral-800"
          >
            <option value="">Choose a user...</option>
            {ALL_USERS.map(u => (
              <option key={u.id} value={u.id}>
                {u.fullName} ({u.role})
              </option>
            ))}
          </select>
          {/* Show only if a user is selected */}
          {selectedId && (
            <>
              <label className="text-sm" htmlFor="custom-fullname">
                Full Name:
              </label>
              <input
                id="custom-fullname"
                className="rounded border border-input px-3 py-2 bg-background dark:bg-neutral-800"
                type="text"
                value={customFullName}
                onChange={e => setCustomFullName(e.target.value)}
                disabled={submitting}
                required
                placeholder="Full Name"
              />
              <label className="text-sm" htmlFor="custom-email">
                Email:
              </label>
              <input
                id="custom-email"
                className="rounded border border-input px-3 py-2 bg-background dark:bg-neutral-800"
                type="email"
                value={customEmail}
                onChange={e => setCustomEmail(e.target.value)}
                disabled={submitting}
                required
                placeholder="Email"
                autoComplete="username"
              />
            </>
          )}
          <Button type="submit" disabled={!selectedId || submitting} className="mt-2 w-full">
            {submitting ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </div>
      <div className="mt-6 text-xs text-muted-foreground text-center">
        <span>
          Demo authentication<br />
          (No password required. Choose a user to test as Admin, Team, or Client)
        </span>
        <br />
        <span className="block mt-3">
          <a
            href="/auth"
            className="underline text-yellow-700 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100"
          >
            Or use Real Account Login (email/password)
          </a>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;

