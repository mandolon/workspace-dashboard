
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RecipientChipProps {
  recipient: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    avatarColor?: string;
    isCustom?: boolean;
  };
  onRemove: (id: string) => void;
}

const RecipientChip: React.FC<RecipientChipProps> = ({ recipient, onRemove }) => (
  <span
    className={cn(
      "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs mr-1 mb-1 select-none",
      recipient.isCustom ? "bg-gray-200 text-gray-700" : recipient.avatarColor || "bg-gray-300"
    )}
  >
    {!recipient.isCustom && (
      <Avatar className="h-5 w-5">
        <AvatarFallback className={cn("text-xs", recipient.avatarColor)}>{recipient.avatar || recipient.name}</AvatarFallback>
      </Avatar>
    )}
    <span className="pl-1 pr-1">{recipient.name}</span>
    <button
      className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
      type="button"
      onClick={() => onRemove(recipient.id)}
      tabIndex={-1}
    >
      <X className="w-3 h-3" />
    </button>
  </span>
);

export default RecipientChip;
