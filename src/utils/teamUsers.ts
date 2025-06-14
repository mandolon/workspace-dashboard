
import { ArchitectureRole } from '@/types/roles';

export interface TeamUser {
  id: string;
  name: string;
  fullName: string;
  role: ArchitectureRole;
  avatar: string;
}

export const TEAM_USERS: TeamUser[] = [
  {
    id: 't0',
    name: 'AL',
    fullName: 'Armando Lopez',
    role: 'Admin',
    avatar: 'bg-blue-800'
  },
  {
    id: 't1',
    name: 'ALD',
    fullName: 'Alice Liddell',
    role: 'Team Lead',
    avatar: 'bg-purple-500'
  },
  {
    id: 't2',
    name: 'MP',
    fullName: 'Mark Pinsky',
    role: 'Engineer',
    avatar: 'bg-green-500'
  },
  {
    id: 't3',
    name: 'SS',
    fullName: 'Stephanie Sharkey',
    role: 'Architect',
    avatar: 'bg-blue-500'
  },
  {
    id: 't4',
    name: 'JJ',
    fullName: 'Joshua Jones',
    role: 'Designer',
    avatar: 'bg-orange-500'
  },
  {
    id: 't5',
    name: 'RH',
    fullName: 'Rhonda Rhodes',
    role: 'Consultant',
    avatar: 'bg-pink-500'
  },
  {
    id: 't6',
    name: 'JH',
    fullName: 'James Hall',
    role: 'QA Tester',
    avatar: 'bg-gray-500'
  }
];
