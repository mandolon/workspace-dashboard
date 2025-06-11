
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';

interface Note {
  id: number;
  name: string;
  dateCreated: string;
  headText: string;
}

const NotesTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      name: 'Note #1',
      dateCreated: '10.12.24',
      headText: 'Table Cell Text'
    },
    {
      id: 2,
      name: 'Note #2',
      dateCreated: '11.24.24',
      headText: 'Table Cell Text'
    }
  ]);

  const filteredNotes = notes.filter(note =>
    note.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.headText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNew = () => {
    const newNote: Note = {
      id: notes.length + 1,
      name: `Note #${notes.length + 1}`,
      dateCreated: new Date().toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: '2-digit' 
      }),
      headText: 'New note content'
    };
    setNotes([...notes, newNote]);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Notes Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Name</TableHead>
              <TableHead className="w-1/3">Date Created</TableHead>
              <TableHead className="w-1/3">Head Text</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                  No notes found
                </TableCell>
              </TableRow>
            ) : (
              filteredNotes.map((note) => (
                <TableRow key={note.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{note.name}</TableCell>
                  <TableCell>{note.dateCreated}</TableCell>
                  <TableCell>{note.headText}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create New Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleCreateNew}
          className="bg-foreground text-background hover:bg-foreground/90"
        >
          Create New
        </Button>
      </div>
    </div>
  );
};

export default NotesTab;
