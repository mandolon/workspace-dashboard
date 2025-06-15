
import { ArchitectureRole } from '@/types/roles';
import { getAllClients } from '@/data/projectClientData';

/**
 * Shared type for all user roles.
 * Only TEAM users have a titleRole, others = undefined.
 */
export interface TeamMember {
  id: string;
  name: string; // e.g. "AL"
  fullName: string;
  crmRole: 'Admin' | 'Team' | 'Client';
  titleRole?: ArchitectureRole; // ONLY used for Team members. Others: undefined.
  lastActive: string;
  status: 'Active' | 'Inactive' | 'Pending';
  avatar: string; // initials ONLY
  email: string;
  avatarColor: string; // Always present, Tailwind class
}

const CLIENT_COLOR_PALETTE = [
  'bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500',
  'bg-pink-500', 'bg-indigo-500', 'bg-orange-500', 'bg-teal-500', 'bg-cyan-500'
];

// Static admins -- NO titleRole
export const ADMIN_USERS: TeamMember[] = [
  {
    id: 't0',
    name: 'AL',
    fullName: 'Armando Lopez',
    crmRole: 'Admin',
    // titleRole omitted for non-Team
    lastActive: 'Jun 2, 2025',
    status: 'Active',
    email: 'armando.lopez@example.com',
    avatar: 'AL',
    avatarColor: 'bg-blue-800'
  }
];

// Static team members - only Team gets titleRole!
export const TEAM_USERS: TeamMember[] = [
  {
    id: 't1',
    name: 'ALD',
    fullName: 'Alice Dale',
    crmRole: 'Team',
    titleRole: 'Team Lead',
    lastActive: '—',
    status: 'Active',
    email: 'alice.dale@example.com',
    avatar: 'ALD',
    avatarColor: 'bg-purple-500'
  },
  {
    id: 't2',
    name: 'MP',
    fullName: 'Mark Pinsky',
    crmRole: 'Team',
    titleRole: 'Team Lead',
    lastActive: '—',
    status: 'Active',
    email: 'mark.pinsky@example.com',
    avatar: 'MP',
    avatarColor: 'bg-green-500'
  },
  {
    id: 't3',
    name: 'SS',
    fullName: 'Stephanie Sharp',
    crmRole: 'Team',
    titleRole: 'Team Lead',
    lastActive: '—',
    status: 'Active',
    email: 'stephanie.sharp@example.com',
    avatar: 'SS',
    avatarColor: 'bg-blue-500'
  },
  {
    id: 't4',
    name: 'JJ',
    fullName: 'Joshua Jones',
    crmRole: 'Team',
    titleRole: 'Team Lead',
    lastActive: '—',
    status: 'Inactive',
    email: 'joshua.jones@example.com',
    avatar: 'JJ',
    avatarColor: 'bg-orange-500'
  }
];

// Dynamic clients - NO titleRole
export const CLIENT_USERS: TeamMember[] = getAllClients().map((client, i) => ({
  id: client.clientId,
  name: (client.firstName[0] + (client.lastName?.[0] ?? "")).toUpperCase(),
  fullName: `${client.firstName} ${client.lastName}`,
  crmRole: 'Client' as const,
  lastActive: '—',
  status: 'Active' as const,
  email: client.email || 'unknown@email.com',
  avatar: (client.firstName[0] + (client.lastName?.[0] ?? "")).toUpperCase(),
  avatarColor: CLIENT_COLOR_PALETTE[i % CLIENT_COLOR_PALETTE.length]
}));

// ALL_USERS helper includes all admins, teams, clients
export const ALL_USERS: TeamMember[] = [
  ...ADMIN_USERS,
  ...TEAM_USERS,
  ...CLIENT_USERS
];

// Helper for any role
export function getUsersByRole(role: TeamMember['crmRole']): TeamMember[] {
  if (role === 'Admin') return ADMIN_USERS;
  if (role === 'Team') return TEAM_USERS;
  if (role === 'Client') return CLIENT_USERS;
  return [];
}
