
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from '@/components/ui/calendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const monthYear = currentMonth.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-1">
        <CardTitle className="text-lg font-semibold">Calendar</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-3">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth('prev')}
            className="h-6 w-6"
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <h3 className="text-sm font-medium">{monthYear}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth('next')}
            className="h-6 w-6"
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>

        {/* Calendar Component */}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          className="w-full p-0"
          classNames={{
            months: "flex flex-col space-y-2",
            month: "space-y-2",
            caption: "hidden",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-muted-foreground rounded-md w-6 font-normal text-xs",
            row: "flex w-full mt-1",
            cell: "h-6 w-6 text-center text-xs p-0 relative",
            day: "h-6 w-6 p-0 font-normal text-xs hover:bg-accent hover:text-accent-foreground",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50",
          }}
        />
      </CardContent>
    </Card>
  );
};

export default CalendarSection;
