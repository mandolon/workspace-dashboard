
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
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const cleanupAuthState = () => {
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

const EDGE_FUNCTION_URL = "https://xxarxbmmedbmpptjgtxe.functions.supabase.co/delete-user-account";

const AccountTab = () => {
  const { currentUser, updateUser, logout, supabaseUserId } = useUser();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  // Handler for account deletion (via edge function)
  const handleDeleteAccount = async () => {
    setDeleting(true);
    let errorMsg: string | null = null;

    try {
      const userId = supabaseUserId || currentUser?.id;
      if (!userId) {
        errorMsg = "Missing user ID";
      } else {
        const session = (await supabase.auth.getSession()).data.session;
        const accessToken = session?.access_token;

        const res = await fetch(EDGE_FUNCTION_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}),
          },
          body: JSON.stringify({ user_id: userId }),
        });
        // Try to parse error message if deletion fails
        if (!res.ok) {
          let reason = "";
          try {
            const json = await res.json();
            reason = json?.error || json?.message || res.statusText;
          } catch {
            reason = res.statusText;
          }
          errorMsg = `Account deletion failed: ${reason}`;
        }
      }
    } catch (err: any) {
      errorMsg = 'An unexpected error occurred during account deletion.';
    } finally {
      cleanupAuthState();
      setDeleting(false);
      if (errorMsg) {
        toast({
          title: "Account Deletion Failed",
          description: errorMsg,
          variant: "destructive",
        });
      }
      // Always log out for security and redirect
      logout();
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
