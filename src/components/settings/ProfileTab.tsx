
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/contexts/UserContext';

const ProfileTab = () => {
  const { currentUser, updateUser } = useUser();

  const handleSave = () => {
    // Handle save logic
    console.log('Saving profile changes');
  };

  return (
    <div className="p-6 max-w-2xl">
      <div className="space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center text-white text-2xl font-medium">
            {currentUser.avatar}
          </div>
          <div>
            <Button variant="outline" size="sm">Change photo</Button>
            <p className="text-xs text-muted-foreground mt-1">JPG, GIF or PNG. 1MB max.</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={currentUser.name}
                onChange={(e) => updateUser({ name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={currentUser.role}
                onChange={(e) => updateUser({ role: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={currentUser.bio || ''}
              onChange={(e) => updateUser({ bio: e.target.value })}
              placeholder="Tell us about yourself..."
              className="h-20"
            />
          </div>
        </div>

        {/* Display Preferences */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Display Preferences</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Show online status</span>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Show last active</span>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave}>Save changes</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
