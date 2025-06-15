
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser } from '@/contexts/UserContext';
import { ARCHITECTURE_ROLES, ROLE_DISPLAY_NAMES } from '@/types/roles';
import AvatarUpload from './AvatarUpload';
import DisplayPreferences from './DisplayPreferences';
import { supabase } from '@/integrations/supabase/client';

const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-cyan-500',
];

const ProfileTab = () => {
  const { currentUser, updateUser, supabaseUserId } = useUser();
  const [formData, setFormData] = useState({
    name: currentUser.name,
    bio: currentUser.bio || '',
    company: currentUser.company || '',
    role: currentUser.role,
    showOnlineStatus: currentUser.showOnlineStatus,
    showLastActive: currentUser.showLastActive,
    avatarColor: currentUser.avatarColor || 'bg-blue-500',
  });
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (file: File) => {
    console.log('Avatar file selected:', file);
    // In a real app, this would upload the file and update the avatar URL
  };

  const handleAvatarColorChange = (color: string) => {
    setFormData(prev => ({ ...prev, avatarColor: color }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Update local user context
    updateUser(formData);

    // If Supabase user, update profile in Supabase
    if (supabaseUserId) {
      // Only update full_name, company, bio for demo
      const { error, data } = await supabase
        .from('profiles')
        .update({
          full_name: formData.name,
          company: formData.company,
          bio: formData.bio,
        })
        .eq('id', supabaseUserId)
        .select();

      console.log('Supabase profile update result', { error, data });

      // Immediately fetch from Supabase to check if the update took effect
      const { data: profileDb, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUserId)
        .maybeSingle();

      console.log('Fetched updated Supabase profile after update:', { error: fetchError, data: profileDb });

      if (error) {
        alert('Failed to update your profile in Supabase');
        console.error('Supabase update error:', error);
      } else {
        if (profileDb && profileDb.full_name === formData.name) {
          alert('Profile name updated in Supabase: ' + profileDb.full_name);
        } else if (profileDb) {
          alert('Supabase profile saved, but name did not match input. Current in DB: ' + profileDb.full_name);
        } else {
          alert('Profile update finished. No matching DB row found.');
        }
      }
    }
    setSaving(false);
    console.log('Profile updated (local state):', formData);
  };

  return (
    <div className="p-6 max-w-2xl">
      <div className="space-y-6">
        <AvatarUpload user={currentUser} onAvatarChange={handleAvatarChange} />
        <div className="space-y-4">
          {/* Avatar color picker */}
          <div>
            <Label>Avatar Color</Label>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {AVATAR_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition
                    ${formData.avatarColor === color ? 'border-black' : 'border-transparent'}
                    ${color}`}
                  aria-label={color}
                  onClick={() => handleAvatarColorChange(color)}
                >
                  {formData.avatarColor === color &&
                    <span className="w-3 h-3 rounded-full border-2 border-white bg-white block" />}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-1"
                disabled={saving}
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {ARCHITECTURE_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {ROLE_DISPLAY_NAMES[role]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="mt-1"
              placeholder="Enter your company name"
              disabled={saving}
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="mt-1"
              rows={3}
              placeholder="Tell us about yourself..."
              disabled={saving}
            />
          </div>
        </div>
        <DisplayPreferences
          showOnlineStatus={formData.showOnlineStatus}
          showLastActive={formData.showLastActive}
          onShowOnlineStatusChange={(value) => handleInputChange('showOnlineStatus', value)}
          onShowLastActiveChange={(value) => handleInputChange('showLastActive', value)}
        />
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
