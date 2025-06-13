
export const ARCHITECTURE_ROLES = [
  'Architect',
  'Engineer', 
  'CAD Tech',
  'Designer',
  'Interior Designer',
  'Consultant',
  'Project Manager'
] as const;

export type ArchitectureRole = typeof ARCHITECTURE_ROLES[number];

export const ROLE_DISPLAY_NAMES: Record<ArchitectureRole, string> = {
  'Architect': 'Architect',
  'Engineer': 'Engineer',
  'CAD Tech': 'CAD Tech',
  'Designer': 'Designer',
  'Interior Designer': 'Interior Designer',
  'Consultant': 'Consultant',
  'Project Manager': 'Project Manager'
};
