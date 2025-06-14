
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
import { useIsMobile } from '@/hooks/use-mobile';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

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

const CLIENTS_PER_PAGE = 10;

const ClientTabForm = ({ onSave }: ClientTabFormProps) => {
  const { projectId } = useParams();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const [clients, setClients] = useState<Client[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newClient, setNewClient] = useState<Client>(emptyClient());
  const [page, setPage] = useState(1);

  useEffect(() => {
    const project = getClientData(projectId);
    setClients([...project.clients]);
    setPage(1); // Reset page if project changes
  }, [projectId]);

  const numPages = Math.ceil(clients.length / CLIENTS_PER_PAGE);

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
    // Go to last page if new client overflow
    if (Math.ceil(updated.length / CLIENTS_PER_PAGE) > numPages) {
      setPage(page + 1);
    }
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
    // Stay on valid page if last removed
    if ((page - 1) * CLIENTS_PER_PAGE >= updated.length && page > 1) {
      setPage(page - 1);
    }
  };

  // UI to edit/add a new client
  const addForm = (
    <div className="mb-4 p-3 border rounded bg-muted/30">
      <div className="flex gap-2 flex-wrap">
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

  // Pagination controls for desktop
  const showPagination = !isMobile && clients.length > CLIENTS_PER_PAGE;

  // Paginated/scrollable client list UI
  let renderedClients;
  if (isMobile) {
    // Scroll-area for mobile, all clients, easy scroll
    renderedClients = (
      <div className="flex flex-col gap-2 mb-4 max-h-96 overflow-y-auto">
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
    );
  } else {
    // Paginated desktop view
    const start = (page - 1) * CLIENTS_PER_PAGE;
    const end = start + CLIENTS_PER_PAGE;
    renderedClients = (
      <>
        <div className="space-y-2 mb-2 min-h-16">
          {clients.slice(start, end).map(client => (
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
        {showPagination && (
          <Pagination className="mt-2 mb-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setPage(page > 1 ? page - 1 : 1)} 
                  aria-disabled={page === 1}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  href="#"
                />
              </PaginationItem>
              {Array.from({length: numPages}).map((_, idx) => (
                <PaginationItem key={idx}>
                  <a
                    className={`px-3 py-1 rounded border ${page === idx + 1 ? "border-primary text-primary font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                    onClick={e => {e.preventDefault(); setPage(idx+1);}}
                    href="#"
                  >
                    {idx + 1}
                  </a>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setPage(page < numPages ? page + 1 : numPages)} 
                  aria-disabled={page === numPages}
                  className={page === numPages ? "pointer-events-none opacity-50" : ""}
                  href="#"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </>
    );
  }

  // Client list (show clients, with their unique clientId, and option to add more)
  const clientList = (
    <>
      <div className="mb-2 text-sm font-semibold">Project Contacts</div>
      {renderedClients}
      <Button size="sm" variant="outline" onClick={() => setShowAdd(true)} className="mb-2">
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

