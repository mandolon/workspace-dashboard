
import { ArchitectureRole } from '@/types/roles';

// Central TeamMember type definition
export interface TeamMember {
  id: string;
  name: string; // e.g. "AL"
  fullName: string;
  crmRole: 'Admin' | 'Team' | 'Client';
  titleRole: ArchitectureRole;
  lastActive: string; // Now required
  status: 'Active' | 'Inactive' | 'Pending'; // Now required
  avatar: string;
  email: string; // used in Teams UI
  role: ArchitectureRole; // for compatibility with other user types
}

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
  {
    id: 't5',
    name: 'RH',
    fullName: 'Rhonda Hill',
    crmRole: 'Client',
    titleRole: 'Client',
    lastActive: '—',
    status: 'Pending',
    email: 'rhonda.hill@example.com',
    role: 'Client',
    avatar: 'bg-pink-500'
  },
  {
    id: 't6',
    name: 'JH',
    fullName: 'James Hall',
    crmRole: 'Client',
    titleRole: 'Client',
    lastActive: '—',
    status: 'Active',
    email: 'james.hall@example.com',
    role: 'Client',
    avatar: 'bg-gray-500'
  }
];
