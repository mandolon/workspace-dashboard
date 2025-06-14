
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import React from "react";

export function useTaskToasts() {
  const { toast } = useToast();

  function showTaskCompletedToast(title: string, onUndo: () => void) {
    toast({
      title: "Task completed",
      description: `"${title}" has been marked as completed.`,
      action: (
        <Button 
          variant="outline" 
          size="sm"
          onClick={onUndo}
        >
          Undo
        </Button>
      ),
      duration: 5000,
    });
  }

  return {
    showTaskCompletedToast,
  };
}
