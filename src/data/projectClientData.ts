// Client data mapping for all projects - using LastName - Address format
export interface Client {
  clientId: string;
  firstName: string;
  lastName: string;
  email?: string;
  isPrimary: boolean;
}

export type ProjectClientMap = Record<string, {
  clients: Client[];
  projectAddress: string;
  city: string;
  state: string;
  projectId: string;
}>;

// Generate deterministic clientId based on first/last (real app should use uuid, for now just simple)
function makeClientId(firstName: string, lastName: string) {
  return (
    firstName.toLowerCase().replace(/[^a-z0-9]/g, "") +
    "-" +
    lastName.toLowerCase().replace(/[^a-z0-9]/g, "")
  );
}

export const projectClientData: ProjectClientMap = {
  "adams-1063-40th-street": {
    clients: [
      {
        clientId: makeClientId("Robert", "Adams"),
        firstName: "Robert",
        lastName: "Adams",
        email: "robert.adams@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "1063 40th Street",
    city: "Sacramento",
    state: "CA",
    projectId: "00001",
  },
  "ogden-thew-2709-t-street": {
    clients: [
      {
        clientId: makeClientId("Margaret", "Ogden-Thew"),
        firstName: "Margaret",
        lastName: "Ogden-Thew",
        email: "margaret.ogden-thew@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "2709 T Street",
    city: "Sacramento",
    state: "CA",
    projectId: "00002",
  },
  "henderson-1524-tiverton": {
    clients: [
      {
        clientId: makeClientId("James", "Henderson"),
        firstName: "James",
        lastName: "Henderson",
        email: "james.henderson@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "1524 Tiverton",
    city: "Sacramento",
    state: "CA",
    projectId: "00003",
  },
  "peterson-2015-10th-street": {
    clients: [
      {
        clientId: makeClientId("Linda", "Peterson"),
        firstName: "Linda",
        lastName: "Peterson",
        email: "linda.peterson@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "2015 10th Street",
    city: "Sacramento",
    state: "CA",
    projectId: "00004",
  },
  "johnson-2200-i-street": {
    clients: [
      {
        clientId: makeClientId("Michael", "Johnson"),
        firstName: "Michael",
        lastName: "Johnson",
        email: "michael.johnson@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "2200 I Street",
    city: "Sacramento",
    state: "CA",
    projectId: "00005",
  },
  "adamo-6605-s-land-park-dr": {
    clients: [
      {
        clientId: makeClientId("Anthony", "Adamo"),
        firstName: "Anthony",
        lastName: "Adamo",
        email: "anthony.adamo@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "6605 S. Land Park Dr.",
    city: "Sacramento",
    state: "CA",
    projectId: "00006",
  },
  "mcvarish-salmina-6251-el-dorado-street": {
    clients: [
      {
        clientId: makeClientId("Patricia", "McVarish-Salmina"),
        firstName: "Patricia",
        lastName: "McVarish-Salmina",
        email: "patricia.mcvarish-salmina@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "6251 El Dorado Street",
    city: "Sacramento",
    state: "CA",
    projectId: "00007",
  },
  "andre-2119-h-street": {
    clients: [
      {
        clientId: makeClientId("David", "Andre"),
        firstName: "David",
        lastName: "Andre",
        email: "david.andre@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "2119 H Street",
    city: "Sacramento",
    state: "CA",
    projectId: "00008",
  },
  "fleming-veisze-1111-33rd-street": {
    clients: [
      {
        clientId: makeClientId("Sarah", "Fleming-Veisze"),
        firstName: "Sarah",
        lastName: "Fleming-Veisze",
        email: "sarah.fleming-veisze@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "1111 33rd Street",
    city: "Sacramento",
    state: "CA",
    projectId: "00009",
  },
  "ganson-2125-i-street": {
    clients: [
      {
        clientId: makeClientId("William", "Ganson"),
        firstName: "William",
        lastName: "Ganson",
        email: "william.ganson@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "2125 I Street",
    city: "Sacramento",
    state: "CA",
    projectId: "00010",
  },
  "decarlo-1141-swanston-dr": {
    clients: [
      {
        clientId: makeClientId("Maria", "DeCarlo"),
        firstName: "Maria",
        lastName: "DeCarlo",
        email: "maria.decarlo@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "1141 Swanston Dr",
    city: "Sacramento",
    state: "CA",
    projectId: "00011",
  },
  "green-920-u-street": {
    clients: [
      {
        clientId: makeClientId("Christopher", "Green"),
        firstName: "Christopher",
        lastName: "Green",
        email: "christopher.green@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "920 U Street",
    city: "Sacramento",
    state: "CA",
    projectId: "00012",
  },
  "kubein-plymouth-project": {
    clients: [
      {
        clientId: makeClientId("Jennifer", "Kubein"),
        firstName: "Jennifer",
        lastName: "Kubein",
        email: "jennifer.kubein@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "Plymouth Project",
    city: "Sacramento",
    state: "CA",
    projectId: "00013",
  },
  "mcleod-joffe-2436-59th-street": {
    clients: [
      {
        clientId: makeClientId("Thomas", "McLeod-Joffe"),
        firstName: "Thomas",
        lastName: "McLeod-Joffe",
        email: "thomas.mcleod-joffe@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "2436 59th Street",
    city: "Sacramento",
    state: "CA",
    projectId: "00014",
  },
  "piner-piner-haus-garage": {
    clients: [
      {
        clientId: makeClientId("Richard", "Piner"),
        firstName: "Richard",
        lastName: "Piner",
        email: "richard.piner@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "Piner Haus Garage",
    city: "Sacramento",
    state: "CA",
    projectId: "00015",
  },
  "rathbun-usfs-cabin": {
    clients: [
      {
        clientId: makeClientId("Barbara", "Rathbun"),
        firstName: "Barbara",
        lastName: "Rathbun",
        email: "barbara.rathbun@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "USFS Cabin",
    city: "Sacramento",
    state: "CA",
    projectId: "00016",
  },
  "vasquez-gutierrez-2508-55th-street": {
    clients: [
      {
        clientId: makeClientId("Carlos", "Vasquez-Gutierrez"),
        firstName: "Carlos",
        lastName: "Vasquez-Gutierrez",
        email: "carlos.vasquez-gutierrez@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "2508 55th Street",
    city: "Sacramento",
    state: "CA",
    projectId: "00017",
  },
  "wilcox-1808-u-street": {
    clients: [
      {
        clientId: makeClientId("Nancy", "Wilcox"),
        firstName: "Nancy",
        lastName: "Wilcox",
        email: "nancy.wilcox@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "1808 U Street",
    city: "Sacramento",
    state: "CA",
    projectId: "00018",
  },
  "donaldson-2717-58th-street": {
    clients: [
      {
        clientId: makeClientId("Celine", "Donaldson"),
        firstName: "Celine",
        lastName: "Donaldson",
        email: "celine.donaldson@email.com",
        isPrimary: true,
      },
    ],
    projectAddress: "2717 58th Street",
    city: "Sacramento",
    state: "CA",
    projectId: "00019",
  }
};

export const getClientData = (projectId?: string) => {
  if (projectId && projectClientData[projectId]) {
    return projectClientData[projectId];
  }
  // Default fallback
  return {
    clients: [
      {
        clientId: "default-johndoe",
        firstName: "John",
        lastName: "Doe",
        isPrimary: true
      }
    ],
    projectAddress: "Unknown Address",
    city: "Sacramento",
    state: "CA",
    projectId: "00000"
  };
};

// Get all clients across all projects
export const getAllClients = (): Client[] => {
  return Object.values(projectClientData).flatMap(p => p.clients);
};

// Update to accept optional address (so we can update just the address for the project):
export const updateClientData = (
  projectId: string,
  updatedClients?: Client[],
  updatedAddress?: string,
  updatedCity?: string,
  updatedState?: string
) => {
  if (projectId && projectClientData[projectId]) {
    if (updatedClients) {
      projectClientData[projectId].clients = updatedClients;
    }
    if (updatedAddress !== undefined) {
      projectClientData[projectId].projectAddress = updatedAddress;
    }
    if (updatedCity !== undefined) {
      projectClientData[projectId].city = updatedCity;
    }
    if (updatedState !== undefined) {
      projectClientData[projectId].state = updatedState;
    }
  }
};

export const addClientToProject = (projectId: string, newClient: Client) => {
  if (projectId && projectClientData[projectId]) {
    projectClientData[projectId].clients.push(newClient);
  }
};

// Set one client in the array as primary
export const setPrimaryClient = (projectId: string, clientId: string) => {
  if (projectId && projectClientData[projectId]) {
    projectClientData[projectId].clients.forEach(c => {
      c.isPrimary = c.clientId === clientId;
    });
  }
};

export const getProjectDisplayName = (projectId?: string) => {
  const project = getClientData(projectId);
  const primary = project.clients.find(c => c.isPrimary) || project.clients[0];
  return `${primary.lastName} - ${project.projectAddress}`;
};
