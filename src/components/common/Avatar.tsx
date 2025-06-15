
import React from "react";

interface AvatarProps {
  initials: string;
  avatarUrl?: string;
  color?: string; // defaults to bg-blue-500
  size?: number;
  alt?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  initials,
  avatarUrl,
  color = "bg-blue-500",
  size = 44,
  alt,
  className = "",
}) => (
  <div
    className={`rounded-full flex items-center justify-center text-white font-semibold select-none ${color} ${className}`}
    style={{ width: size, height: size, fontSize: size / 2 }}
    aria-label={alt || initials}
  >
    {avatarUrl ? (
      <img
        src={avatarUrl}
        alt={alt || initials}
        className="w-full h-full object-cover rounded-full"
        style={{ backgroundColor: "transparent" }}
      />
    ) : (
      initials
    )}
  </div>
);

export default Avatar;
