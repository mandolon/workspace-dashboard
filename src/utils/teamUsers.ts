
import { ArchitectureRole } from '@/types/roles';
import { getAllClients } from '@/data/projectClientData';

// New TeamMember type for unified avatar prop/casing
export interface TeamMember {
  id: string;
  name: string; // Initials or first name
  fullName: string;
  crmRole: 'Admin' | 'Team' | 'Client';
  titleRole?: ArchitectureRole;
  lastActive: string;
  status: 'Active' | 'Inactive' | 'Pending';
  email: string;
  role: ArchitectureRole;
  avatarUrl?: string;
  avatarColor?: string;
  initials: string;
}

// Color palette for clients (use only for fallback as default, now all will default to bg-blue-500)
const DEFAULT_AVATAR_COLOR = "bg-blue-500";

// Static team/admin users, now all start with default color
export const TEAM_USERS: TeamMember[] = [
  {
    id: 't0',
    name: 'Armando',
    fullName: 'Armando Lopez',
    crmRole: 'Admin',
    titleRole: 'Admin',
    lastActive: 'Jun 2, 2025',
    status: 'Active',
    email: 'armando.lopez@example.com',
    role: 'Admin',
    avatarColor: DEFAULT_AVATAR_COLOR,
    initials: "AL",
  },
  {
    id: 't1',
    name: 'Alice',
    fullName: 'Alice Dale',
    crmRole: 'Team',
    titleRole: 'Team Lead',
    lastActive: '—',
    status: 'Active',
    email: 'alice.dale@example.com',
    role: 'Team Lead',
    avatarColor: DEFAULT_AVATAR_COLOR,
    initials: "AD",
  },
  {
    id: 't2',
    name: 'Mark',
    fullName: 'Mark Pinsky',
    crmRole: 'Team',
    titleRole: 'Team Lead',
    lastActive: '—',
    status: 'Active',
    email: 'mark.pinsky@example.com',
    role: 'Team Lead',
    avatarColor: DEFAULT_AVATAR_COLOR,
    initials: "MP",
  },
  {
    id: 't3',
    name: 'Stephanie',
    fullName: 'Stephanie Sharp',
    crmRole: 'Team',
    titleRole: 'Team Lead',
    lastActive: '—',
    status: 'Active',
    email: 'stephanie.sharp@example.com',
    role: 'Team Lead',
    avatarColor: DEFAULT_AVATAR_COLOR,
    initials: "SS",
  },
  {
    id: 't4',
    name: 'Joshua',
    fullName: 'Joshua Jones',
    crmRole: 'Team',
    titleRole: 'Team Lead',
    lastActive: '—',
    status: 'Inactive',
    email: 'joshua.jones@example.com',
    role: 'Team Lead',
    avatarColor: DEFAULT_AVATAR_COLOR,
    initials: "JJ",
  },
  ...getAllClients().map((client, i) => ({
    id: client.clientId,
    name: client.firstName,
    fullName: `${client.firstName} ${client.lastName}`,
    crmRole: 'Client' as const,
    lastActive: '—',
    status: 'Active' as const,
    email: client.email || 'unknown@email.com',
    role: 'Client' as ArchitectureRole,
    avatarColor: DEFAULT_AVATAR_COLOR,
    initials: ((client.firstName[0] + (client.lastName?.[0] ?? "")).toUpperCase()),
  }))
];
