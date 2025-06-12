
// Client data mapping for all projects - using LastName - Address format
export const projectClientData: Record<string, any> = {
  'adams-1063-40th-street': {
    firstName: 'Robert', lastName: 'Adams', projectAddress: '1063 40th Street',
    city: 'Sacramento', state: 'CA', projectId: '00001',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'ogden-thew-2709-t-street': {
    firstName: 'Margaret', lastName: 'Ogden-Thew', projectAddress: '2709 T Street',
    city: 'Sacramento', state: 'CA', projectId: '00002',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'henderson-1524-tiverton': {
    firstName: 'James', lastName: 'Henderson', projectAddress: '1524 Tiverton',
    city: 'Sacramento', state: 'CA', projectId: '00003',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'peterson-2015-10th-street': {
    firstName: 'Linda', lastName: 'Peterson', projectAddress: '2015 10th Street',
    city: 'Sacramento', state: 'CA', projectId: '00004',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'johnson-2200-i-street': {
    firstName: 'Michael', lastName: 'Johnson', projectAddress: '2200 I Street',
    city: 'Sacramento', state: 'CA', projectId: '00005',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'adamo-6605-s-land-park-dr': {
    firstName: 'Anthony', lastName: 'Adamo', projectAddress: '6605 S. Land Park Dr.',
    city: 'Sacramento', state: 'CA', projectId: '00006',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'mcvarish-salmina-6251-el-dorado-street': {
    firstName: 'Patricia', lastName: 'McVarish-Salmina', projectAddress: '6251 El Dorado Street',
    city: 'Sacramento', state: 'CA', projectId: '00007',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'andre-2119-h-street': {
    firstName: 'David', lastName: 'Andre', projectAddress: '2119 H Street',
    city: 'Sacramento', state: 'CA', projectId: '00008',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'fleming-veisze-1111-33rd-street': {
    firstName: 'Sarah', lastName: 'Fleming-Veisze', projectAddress: '1111 33rd Street',
    city: 'Sacramento', state: 'CA', projectId: '00009',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'ganson-2125-i-street': {
    firstName: 'William', lastName: 'Ganson', projectAddress: '2125 I Street',
    city: 'Sacramento', state: 'CA', projectId: '00010',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'decarlo-1141-swanston-dr': {
    firstName: 'Maria', lastName: 'DeCarlo', projectAddress: '1141 Swanston Dr',
    city: 'Sacramento', state: 'CA', projectId: '00011',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'green-920-u-street': {
    firstName: 'Christopher', lastName: 'Green', projectAddress: '920 U Street',
    city: 'Sacramento', state: 'CA', projectId: '00012',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'kubein-plymouth-project': {
    firstName: 'Jennifer', lastName: 'Kubein', projectAddress: 'Plymouth Project',
    city: 'Sacramento', state: 'CA', projectId: '00013',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'mcleod-joffe-2436-59th-street': {
    firstName: 'Thomas', lastName: 'McLeod-Joffe', projectAddress: '2436 59th Street',
    city: 'Sacramento', state: 'CA', projectId: '00014',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'piner-piner-haus-garage': {
    firstName: 'Richard', lastName: 'Piner', projectAddress: 'Piner Haus Garage',
    city: 'Sacramento', state: 'CA', projectId: '00015',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'rathbun-usfs-cabin': {
    firstName: 'Barbara', lastName: 'Rathbun', projectAddress: 'USFS Cabin',
    city: 'Sacramento', state: 'CA', projectId: '00016',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'vasquez-gutierrez-2508-55th-street': {
    firstName: 'Carlos', lastName: 'Vasquez-Gutierrez', projectAddress: '2508 55th Street',
    city: 'Sacramento', state: 'CA', projectId: '00017',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'wilcox-1808-u-street': {
    firstName: 'Nancy', lastName: 'Wilcox', projectAddress: '1808 U Street',
    city: 'Sacramento', state: 'CA', projectId: '00018',
    secondaryFirstName: '', secondaryLastName: ''
  },
  'donaldson-2717-58th-street': {
    firstName: 'Celine', lastName: 'Donaldson', projectAddress: '2717 58th Street',
    city: 'Sacramento', state: 'CA', projectId: '00019',
    secondaryFirstName: '', secondaryLastName: ''
  }
};

export const getClientData = (projectId?: string) => {
  if (projectId && projectClientData[projectId]) {
    return projectClientData[projectId];
  }
  // Default fallback
  return {
    firstName: 'John', lastName: 'Doe', projectAddress: 'Unknown Address',
    city: 'Sacramento', state: 'CA', projectId: '00000'
  };
};

export const updateClientData = (projectId: string, updatedData: any) => {
  if (projectId && projectClientData[projectId]) {
    projectClientData[projectId] = {
      ...projectClientData[projectId],
      ...updatedData
    };
  }
};

export const getProjectDisplayName = (projectId?: string) => {
  const clientData = getClientData(projectId);
  return `${clientData.lastName} - ${clientData.projectAddress}`;
};
