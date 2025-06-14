import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  getClientData, 
  updateClientData, 
  addClientToProject, 
  setPrimaryClient,
  Client 
} from '@/data/projectClientData';
import { useToast } from '@/hooks/use-toast';
import { generateClientId } from '@/utils/clientHelpers';
import InformationSection from './InformationSection';
import { Button } from '@/components/ui/button';

interface ClientTabFormProps {
  onSave: () => void;
}

const emptyClient = (): Client => ({
  clientId: "",
  firstName: "",
  lastName: "",
  email: "",
  isPrimary: false,
});

const ClientTabForm = ({ onSave }: ClientTabFormProps) => {
  const { projectId } = useParams();
  const { toast } = useToast();

  const [clients, setClients] = useState<Client[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newClient, setNewClient] = useState<Client>(emptyClient());

  useEffect(() => {
    const project = getClientData(projectId);
    setClients([...project.clients]);
  }, [projectId]);

  // Add new client handler (uses unique ID generator)
  const handleAddClient = () => {
    if (!newClient.firstName || !newClient.lastName) {
      toast({ title: "Missing info", description: "First & last name required" });
      return;
    }
    // Generate unique Cxxxx ID
    const id = generateClientId();
    const client: Client = { ...newClient, clientId: id, isPrimary: false };
    const updated = [...clients, client];

    setClients(updated);
    addClientToProject(projectId!, client);
    setShowAdd(false);
    setNewClient(emptyClient());
    toast({ title: "Client added", description: "New client added to project." });
    onSave();
  };

  // Make a client primary
  const handleSetPrimary = (id: string) => {
    setPrimaryClient(projectId!, id);
    setClients(clients.map(c => ({ ...c, isPrimary: c.clientId === id })));
    toast({ title: "Primary Contact Changed" });
    onSave();
  };

  // Remove client
  const handleRemove = (id: string) => {
    if (clients.length === 1) return;
    const updated = clients.filter(c => c.clientId !== id);
    setClients(updated);
    updateClientData(projectId!, updated);
    toast({ title: "Client Removed" });
    onSave();
  };

  // UI to edit/add a new client
  const addForm = (
    <div className="mb-4 p-3 border rounded bg-muted/30">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="First name"
          value={newClient.firstName}
          onChange={e => setNewClient(c => ({ ...c, firstName: e.target.value }))}
          className="border px-2 py-1 rounded text-xs w-32"
        />
        <input
          type="text"
          placeholder="Last name"
          value={newClient.lastName}
          onChange={e => setNewClient(c => ({ ...c, lastName: e.target.value }))}
          className="border px-2 py-1 rounded text-xs w-32"
        />
        <input
          type="email"
          placeholder="Email"
          value={newClient.email}
          onChange={e => setNewClient(c => ({ ...c, email: e.target.value }))}
          className="border px-2 py-1 rounded text-xs w-48"
        />
        <Button size="sm" onClick={handleAddClient}>Add</Button>
        <Button size="sm" variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
      </div>
    </div>
  );

  // Client list (show clients, with their unique clientId, and option to add more)
  const clientList = (
    <>
      <div className="mb-2 text-sm font-semibold">Project Contacts</div>
      <div className="space-y-2 mb-4">
        {clients.map(client => (
          <div key={client.clientId} className={`border rounded px-3 py-2 flex items-center gap-3 ${client.isPrimary ? 'bg-green-50 border-green-300' : 'bg-background'}`}>
            <div className="flex-1">
              <div className="font-medium">
                {client.firstName} {client.lastName}
                <span className="ml-2 text-[10px] text-muted-foreground">(ID: {client.clientId})</span>
                <span className="ml-2 text-xs text-muted-foreground">({client.email})</span>
              </div>
              <div className="text-xs text-muted-foreground">{client.isPrimary ? "Primary Contact" : "Secondary Contact"}</div>
            </div>
            {!client.isPrimary && (
              <Button size="sm" variant="ghost" onClick={() => handleSetPrimary(client.clientId)}>Make Primary</Button>
            )}
            {clients.length > 1 && (
              <Button size="sm" variant="destructive" onClick={() => handleRemove(client.clientId)}>Remove</Button>
            )}
          </div>
        ))}
      </div>
      <Button size="sm" variant="outline" onClick={() => setShowAdd(true)}>
        Add Another Client
      </Button>
      {showAdd && addForm}
    </>
  );

  return {
    clients,
    sections: (
      <div>
        {clientList}
      </div>
    ),
    formData: {
      projectAddress: getClientData(projectId).projectAddress,
      startDate: "5/8/23",
      duration: "5 weeks",
      status: "",
    },
    handleSave: () => {},
    handleInputChange: () => {},
    clientInformationFields: [],
    projectAddressFields: [],
    billingAddressFields: [],
  };
};

export default ClientTabForm;
