
import { ArchitectureRole } from '@/types/roles';
import { getAllClients } from '@/data/projectClientData';

// Central TeamMember type definition
export interface TeamMember {
  id: string;
  name: string; // e.g. "AL"
  fullName: string;
  crmRole: 'Admin' | 'Team' | 'Client';
  titleRole?: ArchitectureRole; // Made optional
  lastActive: string;
  status: 'Active' | 'Inactive' | 'Pending';
  avatar: string;
  email: string;
  role: ArchitectureRole;
}

// Admin and Team remain static, client rows are generated from actual clients per project
export const TEAM_USERS: TeamMember[] = [
  {
    id: 't0',
    name: 'AL',
    fullName: 'Armando Lopez',
    crmRole: 'Admin',
    titleRole: 'Admin',
    lastActive: 'Jun 2, 2025',
    status: 'Active',
    email: 'armando.lopez@example.com',
    role: 'Admin',
    avatar: 'bg-blue-800'
  },
  {
    id: 't1',
    name: 'ALD',
    fullName: 'Alice Dale',
    crmRole: 'Team',
    titleRole: 'Team Lead',
    lastActive: '—',
    status: 'Active',
    email: 'alice.dale@example.com',
    role: 'Team Lead',
    avatar: 'bg-purple-500'
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
    role: 'Team Lead',
    avatar: 'bg-green-500'
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
    role: 'Team Lead',
    avatar: 'bg-blue-500'
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
    role: 'Team Lead',
    avatar: 'bg-orange-500'
  },
  // ... add client rows dynamically below
  ...getAllClients().map(client => ({
    id: client.clientId,
    name: (client.firstName[0] + (client.lastName?.[0] ?? "")).toUpperCase(),
    fullName: `${client.firstName} ${client.lastName}`,
    crmRole: 'Client' as const,
    // titleRole removed for clients
    lastActive: '—',
    status: 'Active' as const,
    email: client.email || 'unknown@email.com',
    role: 'Client' as ArchitectureRole,
    avatar: 'bg-gray-500'
  }))
];
