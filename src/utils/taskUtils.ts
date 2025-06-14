
export const getRandomColor = (name: string, userColor?: string) => {
  if (userColor) return userColor;
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-cyan-500'
  ];
  // Use a hash of the name to consistently assign the same color
  const hash = name.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export const getInitials = (name: string) => {
  if (!name) return '';
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }
  // First letter of first and last word
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2);
    return `${month} ${day}, ${year}`;
  } catch {
    return dateString; // fallback to original string if parsing fails
  }
};

// Now consistently use 'avatarColor' for color property (for all available people)
// 'avatar' property is for displaying initials only (for legacy fallback).
export const availablePeople = [
  { name: "MP", avatar: "MP", fullName: "Marcus Pierce", avatarColor: "bg-blue-500" },
  { name: "JD", avatar: "JD", fullName: "Jennifer Davis", avatarColor: "bg-green-500" },
  { name: "SK", avatar: "SK", fullName: "Sarah Kim", avatarColor: "bg-purple-500" },
  { name: "AL", avatar: "AL", fullName: "Alex Lopez", avatarColor: "bg-orange-500" },
  { name: "RT", avatar: "RT", fullName: "Ryan Taylor", avatarColor: "bg-red-500" }
];

