
import { projectClientData } from '@/data/projectClientData';

// Project display name to project ID mapping
export const projectDisplayToIdMapping: Record<string, string> = {
  'Piner Haus Garage': 'piner-piner-haus-garage',
  'Rathbun - USFS Cabin': 'rathbun-usfs-cabin',
  'Ogden - Thew - 2709 T Street': 'ogden-thew-2709-t-street',
  'Adams - 1063 40th Street': 'adams-1063-40th-street'
};

// Reverse mapping for dropdown options
export const projectIdToDisplayMapping: Record<string, string> = {
  'piner-piner-haus-garage': 'Piner Haus Garage',
  'rathbun-usfs-cabin': 'Rathbun - USFS Cabin', 
  'ogden-thew-2709-t-street': 'Ogden - Thew - 2709 T Street',
  'adams-1063-40th-street': 'Adams - 1063 40th Street'
};

// Get project ID from display name
export const getProjectIdFromDisplayName = (displayName: string): string => {
  console.log('Converting display name to project ID:', displayName);
  
  const projectId = projectDisplayToIdMapping[displayName];
  if (projectId) {
    console.log('Found project ID:', projectId);
    return projectId;
  }
  
  // Fallback: try to find by partial match in projectClientData
  const fallbackId = Object.keys(projectClientData).find(id => {
    const clientData = projectClientData[id];
    const generatedDisplayName = `${clientData.lastName} - ${clientData.projectAddress}`;
    return generatedDisplayName === displayName;
  });
  
  if (fallbackId) {
    console.log('Found fallback project ID:', fallbackId);
    return fallbackId;
  }
  
  console.warn('No project ID found for display name:', displayName);
  return 'unknown-project';
};

// Get display name from project ID
export const getDisplayNameFromProjectId = (projectId: string): string => {
  return projectIdToDisplayMapping[projectId] || projectId;
};

// Get all available projects for dropdowns
export const getAvailableProjects = () => {
  return Object.entries(projectDisplayToIdMapping).map(([displayName, projectId]) => ({
    displayName,
    projectId
  }));
};
