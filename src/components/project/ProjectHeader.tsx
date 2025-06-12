
import React from 'react';
import { useParams } from 'react-router-dom';
import { Users } from 'lucide-react';

// Client data mapping for all projects - using LastName - Address format
const projectClientData: Record<string, any> = {
  'adams-1063-40th-street': {
    firstName: 'Robert', lastName: 'Adams', projectAddress: '1063 40th Street',
    city: 'Sacramento', state: 'CA', clientId: 'ADAMS-001'
  },
  'ogden-thew-2709-t-street': {
    firstName: 'Margaret', lastName: 'Ogden-Thew', projectAddress: '2709 T Street',
    city: 'Sacramento', state: 'CA', clientId: 'OGDEN-001'
  },
  'henderson-1524-tiverton': {
    firstName: 'James', lastName: 'Henderson', projectAddress: '1524 Tiverton',
    city: 'Sacramento', state: 'CA', clientId: 'HEND-001'
  },
  'peterson-2015-10th-street': {
    firstName: 'Linda', lastName: 'Peterson', projectAddress: '2015 10th Street',
    city: 'Sacramento', state: 'CA', clientId: 'PETE-001'
  },
  'johnson-2200-i-street': {
    firstName: 'Michael', lastName: 'Johnson', projectAddress: '2200 I Street',
    city: 'Sacramento', state: 'CA', clientId: 'JOHN-001'
  },
  'adamo-6605-s-land-park-dr': {
    firstName: 'Anthony', lastName: 'Adamo', projectAddress: '6605 S. Land Park Dr.',
    city: 'Sacramento', state: 'CA', clientId: 'ADAM-001'
  },
  'mcvarish-salmina-6251-el-dorado-street': {
    firstName: 'Patricia', lastName: 'McVarish-Salmina', projectAddress: '6251 El Dorado Street',
    city: 'Sacramento', state: 'CA', clientId: 'MCVA-001'
  },
  'andre-2119-h-street': {
    firstName: 'David', lastName: 'Andre', projectAddress: '2119 H Street',
    city: 'Sacramento', state: 'CA', clientId: 'ANDR-001'
  },
  'fleming-veisze-1111-33rd-street': {
    firstName: 'Sarah', lastName: 'Fleming-Veisze', projectAddress: '1111 33rd Street',
    city: 'Sacramento', state: 'CA', clientId: 'FLEM-001'
  },
  'ganson-2125-i-street': {
    firstName: 'William', lastName: 'Ganson', projectAddress: '2125 I Street',
    city: 'Sacramento', state: 'CA', clientId: 'GANS-001'
  },
  'decarlo-1141-swanston-dr': {
    firstName: 'Maria', lastName: 'DeCarlo', projectAddress: '1141 Swanston Dr',
    city: 'Sacramento', state: 'CA', clientId: 'DECA-001'
  },
  'green-920-u-street': {
    firstName: 'Christopher', lastName: 'Green', projectAddress: '920 U Street',
    city: 'Sacramento', state: 'CA', clientId: 'GREE-001'
  },
  'kubein-plymouth-project': {
    firstName: 'Jennifer', lastName: 'Kubein', projectAddress: 'Plymouth Project',
    city: 'Sacramento', state: 'CA', clientId: 'KUBE-001'
  },
  'mcleod-joffe-2436-59th-street': {
    firstName: 'Thomas', lastName: 'McLeod-Joffe', projectAddress: '2436 59th Street',
    city: 'Sacramento', state: 'CA', clientId: 'MCLE-001'
  },
  'piner-piner-haus-garage': {
    firstName: 'Richard', lastName: 'Piner', projectAddress: 'Piner Haus Garage',
    city: 'Sacramento', state: 'CA', clientId: 'PINE-001'
  },
  'rathbun-usfs-cabin': {
    firstName: 'Barbara', lastName: 'Rathbun', projectAddress: 'USFS Cabin',
    city: 'Sacramento', state: 'CA', clientId: 'RATH-001'
  },
  'vasquez-gutierrez-2508-55th-street': {
    firstName: 'Carlos', lastName: 'Vasquez-Gutierrez', projectAddress: '2508 55th Street',
    city: 'Sacramento', state: 'CA', clientId: 'VASQ-001'
  },
  'wilcox-1808-u-street': {
    firstName: 'Nancy', lastName: 'Wilcox', projectAddress: '1808 U Street',
    city: 'Sacramento', state: 'CA', clientId: 'WILC-001'
  },
  'donaldson-2717-58th-street': {
    firstName: 'Celine', lastName: 'Donaldson', projectAddress: '2717 58th Street',
    city: 'Sacramento', state: 'CA', clientId: 'DONA-001'
  }
};

interface ProjectHeaderProps {
  projectName: string;
}

const ProjectHeader = ({ projectName }: ProjectHeaderProps) => {
  const { projectId } = useParams();
  
  // Get client data based on current project ID
  const getClientData = () => {
    if (projectId && projectClientData[projectId]) {
      return projectClientData[projectId];
    }
    // Default fallback
    return {
      firstName: 'John', lastName: 'Doe', projectAddress: 'Unknown Address',
      city: 'Sacramento', state: 'CA', clientId: 'UNKN-001'
    };
  };

  // Generate project display name in "LastName - Address" format
  const getProjectDisplayName = () => {
    const clientData = getClientData();
    return `${clientData.lastName} - ${clientData.projectAddress}`;
  };

  return (
    <div className="border-b border-border px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base">{getProjectDisplayName()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className="text-xs">Agents</span>
            <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-medium">2</span>
          </div>
          <button className="text-xs text-blue-600 hover:text-blue-700">Ask AI</button>
          <button className="text-xs text-gray-600 hover:text-gray-700">Share</button>
          <button className="text-xs text-gray-600 hover:text-gray-700">Chat</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
