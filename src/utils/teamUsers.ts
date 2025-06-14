
import { ArchitectureRole } from '@/types/roles';

export interface TeamUser {
  id: string;
  name: string;
  fullName: string;
  crmRole: 'Admin' | 'Team' | 'Client';
  titleRole: ArchitectureRole;
  avatar: string;
}

export const TEAM_USERS: TeamUser[] = [
  {
    id: 't0',
    name: 'AL',
    fullName: 'Armando Lopez',
    crmRole: 'Admin',
    titleRole: 'Admin',
    avatar: 'bg-blue-800'
  },
  {
    id: 't1',
    name: 'ALD',
    fullName: 'Alice Dale',
    crmRole: 'Team',
    titleRole: 'Team Lead',
    avatar: 'bg-purple-500'
  },
  {
    id: 't2',
    name: 'MP',
    fullName: 'Mark Pinsky',
    crmRole: 'Team',
    titleRole: 'Team Lead',
    avatar: 'bg-green-500'
  },
  {
    id: 't3',
    name: 'SS',
    fullName: 'Stephanie Sharp',
    crmRole: 'Team',
    titleRole: 'Team Lead',
    avatar: 'bg-blue-500'
  },
  {
    id: 't4',
    name: 'JJ',
    fullName: 'Joshua Jones',
    crmRole: 'Team',
    titleRole: 'Team Lead',
    avatar: 'bg-orange-500'
  },
  {
    id: 't5',
    name: 'RH',
    fullName: 'Rhonda Hill',
    crmRole: 'Client',
    titleRole: 'Client',
    avatar: 'bg-pink-500'
  },
  {
    id: 't6',
    name: 'JH',
    fullName: 'James Hall',
    crmRole: 'Client',
    titleRole: 'Client',
    avatar: 'bg-gray-500'
  }
];

