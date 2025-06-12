
import React from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TimesheetTableProps {
  selectedWeek: Date;
  refreshTrigger: number;
}

const TimesheetTable = ({ selectedWeek, refreshTrigger }: TimesheetTableProps) => {
  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Mock time entries data
  const timeEntries = [
    {
      id: 1,
      project: 'Ogden • Thew • 2709 T Street',
      task: 'Schematic Design Review',
      monday: 2.5,
      tuesday: 0,
      wednesday: 3.0,
      thursday: 2.0,
      friday: 1.5,
      saturday: 0,
      sunday: 0,
      billable: true
    },
    {
      id: 2,
      project: 'Acme Corp Headquarters',
      task: 'Site Analysis',
      monday: 4.0,
      tuesday: 4.0,
      wednesday: 3.5,
      thursday: 4.0,
      friday: 4.0,
      saturday: 0,
      sunday: 0,
      billable: true
    },
    {
      id: 3,
      project: 'Internal - Training',
      task: 'Software Training',
      monday: 1.0,
      tuesday: 0,
      wednesday: 0,
      thursday: 1.0,
      friday: 0,
      saturday: 0,
      sunday: 0,
      billable: false
    }
  ];

  const getDayValue = (entry: typeof timeEntries[0], dayIndex: number) => {
    const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    return entry[dayKeys[dayIndex] as keyof typeof entry] as number;
  };

  const getTotalForEntry = (entry: typeof timeEntries[0]) => {
    return entry.monday + entry.tuesday + entry.wednesday + entry.thursday + entry.friday + entry.saturday + entry.sunday;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Project</TableHead>
              <TableHead className="w-[180px]">Task</TableHead>
              {weekDays.map((day, index) => (
                <TableHead key={index} className="text-center w-[80px]">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      {format(day, 'EEE')}
                    </span>
                    <span className="text-xs">
                      {format(day, 'M/d')}
                    </span>
                  </div>
                </TableHead>
              ))}
              <TableHead className="text-center w-[80px]">Total</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timeEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${entry.billable ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="text-sm truncate">{entry.project}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{entry.task}</span>
                </TableCell>
                {weekDays.map((_, dayIndex) => (
                  <TableCell key={dayIndex} className="text-center">
                    <span className="text-sm">
                      {getDayValue(entry, dayIndex) > 0 ? `${getDayValue(entry, dayIndex)}h` : '-'}
                    </span>
                  </TableCell>
                ))}
                <TableCell className="text-center font-medium">
                  {getTotalForEntry(entry)}h
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Play className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TimesheetTable;
