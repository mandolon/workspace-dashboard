
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/contexts/UserContext';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const AccountTab = () => {
  const { currentUser } = useUser();

  // Email Change
  const [email, setEmail] = useState(currentUser.email);
  const [emailLoading, setEmailLoading] = useState(false);

  // Password Change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Validation
  const passwordsMatch = newPassword && newPassword === confirmPassword;

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Error", description: "Email is required", variant: "destructive" });
      return;
    }
    setEmailLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) throw error;
      toast({
        title: "Email updated",
        description: "If you changed your email, check your inbox to confirm.",
      });
    } catch (err: any) {
      toast({ title: "Error updating email", description: err.message, variant: "destructive" });
    }
    setEmailLoading(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({ title: "Error", description: "All password fields are required.", variant: "destructive" });
      return;
    }
    if (!passwordsMatch) {
      toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    setPasswordLoading(true);
    try {
      // Confirm current password by re-authenticating the user
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: currentUser.email,
        password: currentPassword,
      });
      if (signInErr) {
        throw new Error("Current password is incorrect.");
      }
      // Update to the new password
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast({ title: "Password updated", description: "Your password has been updated." });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      toast({ title: "Error updating password", description: err.message, variant: "destructive" });
    }
    setPasswordLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl">
      <div className="space-y-8">
        {/* Email Settings */}
        <form className="space-y-4" onSubmit={handleChangeEmail}>
          <h3 className="text-sm font-medium">Email</h3>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              disabled={emailLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" disabled={emailLoading}>
            {emailLoading ? "Updating..." : "Change email"}
          </Button>
        </form>

        <Separator />

        {/* Password Settings */}
        <form className="space-y-4" onSubmit={handleChangePassword}>
          <h3 className="text-sm font-medium">Password</h3>
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={passwordLoading}
              autoComplete="current-password"
            />
          </div>
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={passwordLoading}
              autoComplete="new-password"
            />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={passwordLoading}
              autoComplete="new-password"
            />
          </div>
          <Button variant="outline" size="sm" disabled={passwordLoading}>
            {passwordLoading ? "Updating..." : "Update password"}
          </Button>
        </form>

        <Separator />

        {/* Security Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Security</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Two-factor authentication</span>
              <Button variant="outline" size="sm" disabled>
                Coming soon
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Active sessions</span>
              <Button variant="outline" size="sm" disabled>
                Coming soon
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Data Management */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Data Management</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Export your data</span>
              <Button variant="outline" size="sm" disabled>
                Coming soon
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Delete account</span>
              <Button variant="destructive" size="sm" disabled>
                Coming soon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
