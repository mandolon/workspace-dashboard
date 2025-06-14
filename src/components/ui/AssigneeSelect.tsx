
import React from "react";
import { User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AssigneeSelectProps {
  value: string;
  onValueChange: (val: string) => void;
  className?: string;
  placeholder?: string;
}

const people = [
  { value: "MH", label: "MH" },
  { value: "AL", label: "AL" },
  { value: "MP", label: "MP" },
];

const AssigneeSelect: React.FC<AssigneeSelectProps> = ({
  value,
  onValueChange,
  className,
  placeholder = "Assignee"
}) => (
  <Select value={value} onValueChange={onValueChange}>
    <SelectTrigger className={`w-28 h-7 text-xs ${className || ""}`}>
      <User className="w-3 h-3 mr-1" />
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {people.map((person) => (
        <SelectItem key={person.value} value={person.value}>
          {person.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default AssigneeSelect;
