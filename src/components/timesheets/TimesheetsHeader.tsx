
import React from 'react';
import { Plus, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from 'date-fns';

interface TimesheetsHeaderProps {
  selectedWeek: Date;
  onWeekChange: (date: Date) => void;
  onAddTimeEntry: () => void;
}

const TimesheetsHeader = ({ selectedWeek, onWeekChange, onAddTimeEntry }: TimesheetsHeaderProps) => {
  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedWeek, { weekStartsOn: 1 });

  return (
    <div className="border-b border-border bg-background">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Timesheets</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onWeekChange(subWeeks(selectedWeek, 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onWeekChange(addWeeks(selectedWeek, 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onWeekChange(new Date())}
              >
                Today
              </Button>
            </div>
          </div>
          
          <Button onClick={onAddTimeEntry}>
            <Plus className="w-4 h-4 mr-2" />
            Add Time Entry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimesheetsHeader;
