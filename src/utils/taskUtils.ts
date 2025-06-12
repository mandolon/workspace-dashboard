
export const getRandomColor = (name: string) => {
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
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
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

export const availablePeople = [
  { name: "MP", avatar: "bg-blue-500", fullName: "Marcus Peterson" },
  { name: "JD", avatar: "bg-green-500", fullName: "Jennifer Davis" },
  { name: "SK", avatar: "bg-purple-500", fullName: "Sarah Kim" },
  { name: "AL", avatar: "bg-orange-500", fullName: "Alex Lopez" },
  { name: "RT", avatar: "bg-red-500", fullName: "Ryan Taylor" }
];
