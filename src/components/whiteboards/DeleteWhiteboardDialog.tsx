
import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteWhiteboardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  whiteboardTitle?: string;
}

const DeleteWhiteboardDialog: React.FC<DeleteWhiteboardDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  whiteboardTitle,
}) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Delete "{whiteboardTitle}"?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this whiteboard? This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={onConfirm}>
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default DeleteWhiteboardDialog;
