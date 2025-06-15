import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/contexts/UserContext';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';

const cleanupAuthState = () => {
  // Remove all Supabase auth keys from localStorage and sessionStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

const AccountTab = () => {
  const { currentUser, updateUser, logout, supabaseUserId } = useUser();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Handler for account deletion
  const handleDeleteAccount = async () => {
    setDeleting(true);
    let errorMsg: string | null = null;

    try {
      if (supabaseUserId) {
        await supabase.from('profiles').delete().eq('id', supabaseUserId);

        const { error } = await supabase.auth.admin.deleteUser(supabaseUserId);
        if (error) {
          errorMsg = 'Could not delete your authentication record: ' + error.message;
        }
      } else if (currentUser?.id) {
        await supabase.from('profiles').delete().eq('id', currentUser.id);
      }
    } catch (err: any) {
      errorMsg = 'An unexpected error occurred while deleting your account.';
    } finally {
      // Cleanup all Supabase tokens and session data before logout
      cleanupAuthState();
      setDeleting(false);
      // Optionally, display the error before logout/redirect
      if (errorMsg) {
        // Optionally use a toast or alert here:
        alert(errorMsg);
      }
      // Log the user out and redirect (always)
      logout();
      // After logout, user will be redirected to login
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <div className="space-y-8">
        {/* Email Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Email</h3>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={currentUser.email}
              onChange={(e) => updateUser({ email: e.target.value })}
            />
          </div>
          <Button variant="outline" size="sm">Change email</Button>
        </div>

        <Separator />

        {/* Password Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Password</h3>
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button variant="outline" size="sm">Update password</Button>
        </div>

        <Separator />

        {/* Security Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Security</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Two-factor authentication</span>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Active sessions</span>
              <Button variant="outline" size="sm">Manage</Button>
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
              <Button variant="outline" size="sm">Request export</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Delete account</span>
              <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" disabled={deleting}>
                    Delete account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete your account?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action is permanent and will remove your user record and authentication. You will be signed out.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      disabled={deleting}
                      onClick={handleDeleteAccount}
                      className="bg-destructive text-white"
                    >
                      {deleting ? 'Deleting...' : 'Delete account'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
