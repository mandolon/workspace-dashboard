
import React, { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { TEAM_USERS } from "@/utils/teamUsers";
import { Button } from "@/components/ui/button";

const LoginPage: React.FC = () => {
  const { loginAs } = useUser();
  const [selectedId, setSelectedId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId) {
      loginAs(selectedId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-xs w-full bg-white border border-border rounded-lg shadow-lg p-7 flex flex-col gap-5">
        <h2 className="text-lg font-semibold text-center mb-2">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-sm" htmlFor="user-select">
            Select user:
          </label>
          <select
            id="user-select"
            value={selectedId}
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
          <Button type="submit" disabled={!selectedId} className="mt-2 w-full">
            Log In
          </Button>
        </form>
      </div>
      <div className="mt-6 text-xs text-muted-foreground text-center">
        Demo authentication<br />
        (No password required. Choose a user to test as Admin, Team, or Client)
      </div>
    </div>
  );
};

export default LoginPage;
