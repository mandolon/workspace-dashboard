
import React, { useRef, useState, useMemo } from "react";
import { TEAM_USERS, TeamMember } from "@/utils/teamUsers";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Recipient {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  avatarColor?: string;
  isCustom?: boolean; // true if user entered a custom email
}

// Helper to validate email format (simple version)
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface RecipientMultiSelectProps {
  value: Recipient[];
  onChange: (recipients: Recipient[]) => void;
}

const RecipientChip = ({
  recipient,
  onRemove,
}: {
  recipient: Recipient;
  onRemove: (id: string) => void;
}) => (
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

const RecipientMultiSelect: React.FC<RecipientMultiSelectProps> = ({
  value,
  onChange,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtered team users not already selected
  const filteredTeam = useMemo(() => {
    return TEAM_USERS.filter(
      (user) =>
        !value.some((r) => r.id === user.id) &&
        (user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.fullName.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, value]);

  const handleChipRemove = (id: string) => {
    onChange(value.filter((r) => r.id !== id));
  };

  // Add from "TEAM_USERS"
  const handleAddTeamUser = (user: TeamMember) => {
    onChange([...value, {
      id: user.id,
      name: user.fullName,
      email: user.email,
      avatar: user.avatar,
      avatarColor: user.avatarColor,
    }]);
    setSearch("");
    setPopoverOpen(true); // keep open after select so user can keep adding
    inputRef.current?.focus();
  };

  // Add from input (custom)
  const tryAddCustom = () => {
    const email = inputValue.trim();
    if (isValidEmail(email) && !value.some(r => r.email === email)) {
      onChange([...value, {
        id: email,
        name: email,
        email,
        isCustom: true,
      }]);
      setInputValue("");
    }
  };

  // Enter key adds as custom if valid
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === "," || e.key === "Tab") && inputValue) {
      e.preventDefault();
      tryAddCustom();
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      // Backspace removes last
      handleChipRemove(value[value.length - 1].id);
    }
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <div
          tabIndex={0}
          className={cn(
            "min-h-10 flex items-start flex-wrap gap-y-1 gap-x-1 p-2 border rounded-md bg-white focus:ring-2 focus:ring-primary/40 cursor-text",
            "hover:border-primary border-gray-300"
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {value.map((recipient) => (
            <RecipientChip key={recipient.id} recipient={recipient} onRemove={handleChipRemove} />
          ))}
          <input
            ref={inputRef}
            type="text"
            className="border-none outline-none flex-1 min-w-24 bg-transparent text-sm"
            placeholder={value.length > 0 ? "" : "Add recipient…"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            onFocus={() => setPopoverOpen(true)}
            aria-label="Add recipient"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-80" align="start">
        <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
          {/* Search bar */}
          <div className="p-2">
            <Input
              type="text"
              placeholder="Search people…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          {/* Team user list */}
          <div className="p-1 max-h-48 overflow-y-auto">
            {filteredTeam.length === 0 && (
              <div className="text-sm px-2 text-gray-500">No results</div>
            )}
            {filteredTeam.map((user) => (
              <button
                key={user.id}
                type="button"
                // prevent losing focus (which closes popover instantly)
                onMouseDown={e => e.preventDefault()}
                onClick={() => handleAddTeamUser(user)}
                className="flex items-center gap-2 w-full px-2 py-1.5 rounded hover:bg-gray-100 transition-colors"
              >
                <Avatar className="h-7 w-7">
                  <AvatarFallback className={user.avatarColor}>
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.fullName}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
                <span className="ml-auto text-xs py-0.5 px-1 bg-gray-200 rounded">{user.crmRole}</span>
              </button>
            ))}
          </div>
          {/* Custom email add */}
          {inputValue && !isValidEmail(inputValue) && (
            <div className="text-xs text-red-500 px-2 py-1">Please enter a valid email</div>
          )}
          {inputValue && isValidEmail(inputValue) && !value.some(r => r.email === inputValue.trim()) && (
            <button
              className="w-full text-left px-2 py-2 text-primary hover:bg-primary/10 transition-colors text-sm"
              type="button"
              onMouseDown={e => e.preventDefault()}
              onClick={() => { tryAddCustom(); inputRef.current?.focus(); }}
            >
              Add "{inputValue.trim()}" as recipient
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RecipientMultiSelect;
