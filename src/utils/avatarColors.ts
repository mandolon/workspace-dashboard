
/**
 * Maps user initials to default Tailwind color classes, matching CRM palette.
 * Add initials and classes as needed to match your team.
 */
export const AVATAR_COLOR_PALETTE: Record<string, string> = {
  AL: 'bg-blue-600',     // Armando Lopez
  ALD: 'bg-cyan-500',    // Alice Dale
  MP: 'bg-orange-500',   // Mark Pinsky
  JH: 'bg-purple-500',   // James Hall
  SS: 'bg-blue-500',     // Stephanie Sharp
  JJ: 'bg-orange-500',   // Joshua Jones
  RH: 'bg-pink-500',     // Rhonda Hill
  JD: 'bg-emerald-500',  // jennifer davis (example)
  SK: 'bg-indigo-500',   // sarah kim (example)
  RT: 'bg-red-500',      // ryan taylor (example)
  // Add/adjust as needed.
};

/**
 * Return avatar color class for a given user (by initials or name), defaults to gray.
 */
export function getAvatarColor(user: { name?: string; avatar?: string; fullName?: string }): string {
  if (!user) return 'bg-gray-400';

  // Prefer name prop (e.g. 'AL', 'ALD'), then avatar, then fallback
  const key = user.name || user.avatar || '';
  if (key && AVATAR_COLOR_PALETTE[key]) {
    return AVATAR_COLOR_PALETTE[key];
  }
  return 'bg-gray-400';
}
