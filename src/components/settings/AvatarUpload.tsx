import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { User } from '@/types/user';
import Avatar from '@/components/common/Avatar';

interface AvatarUploadProps {
  user: User;
  onAvatarChange: (file: File) => void;
}

const AvatarUpload = ({ user, onAvatarChange }: AvatarUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert('File size must be less than 1MB');
        return;
      }
      onAvatarChange(file);
    }
  };

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar
        initials={user.initials}
        avatarUrl={user.avatarUrl}
        color={user.avatarColor || 'bg-blue-500'}
        size={64}
        alt={user.name}
      />
      <div>
        <button
          type="button"
          onClick={handleChangePhoto}
          className="text-primary hover:underline text-sm font-medium"
        >
          Change photo
        </button>
        <p className="text-xs text-muted-foreground mt-1">
          JPG, GIF or PNG, 1MB max.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/gif,image/png"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default AvatarUpload;
