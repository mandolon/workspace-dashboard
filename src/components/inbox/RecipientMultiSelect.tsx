
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import RecipientChip from "./RecipientChip";
import { useRecipientMultiSelect, Recipient } from "./hooks/useRecipientMultiSelect";

interface RecipientMultiSelectProps {
  value: Recipient[];
  onChange: (recipients: Recipient[]) => void;
}

const RecipientMultiSelect: React.FC<RecipientMultiSelectProps> = ({ value, onChange }) => {
  const {
    popoverOpen, setPopoverOpen,
    search, setSearch,
    inputValue, setInputValue,
    inputRef,
    filteredTeam,
    handleChipRemove,
    handleAddTeamUser,
    tryAddCustom,
    handleInputKeyDown,
    isValidEmail
  } = useRecipientMultiSelect(value, onChange);

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
          <div className="p-2">
            <Input
              type="text"
              placeholder="Search people…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="p-1 max-h-48 overflow-y-auto">
            {filteredTeam.length === 0 && (
              <div className="text-sm px-2 text-gray-500">No results</div>
            )}
            {filteredTeam.map((user) => (
              <button
                key={user.id}
                type="button"
                onMouseDown={e => e.preventDefault()}
                onClick={() => handleAddTeamUser(user)}
                className="flex items-center gap-2 w-full px-2 py-1.5 rounded hover:bg-gray-100 transition-colors"
                tabIndex={-1}
              >
                <span className="h-7 w-7 flex items-center justify-center rounded-full bg-gray-200 mr-2">
                  {user.avatar}
                </span>
                <span className="text-sm font-medium">{user.fullName}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
                <span className="ml-auto text-xs py-0.5 px-1 bg-gray-200 rounded">{user.crmRole}</span>
              </button>
            ))}
          </div>
          {inputValue && !isValidEmail(inputValue) && (
            <div className="text-xs text-red-500 px-2 py-1">
              Please enter a valid email
            </div>
          )}
          {inputValue &&
            isValidEmail(inputValue) &&
            !value.some((r) => r.email === inputValue.trim()) && (
              <button
                className="w-full text-left px-2 py-2 text-primary hover:bg-primary/10 transition-colors text-sm"
                type="button"
                onMouseDown={e => e.preventDefault()}
                onClick={() => {
                  tryAddCustom();
                  setTimeout(() => {
                    inputRef.current?.focus();
                  }, 0);
                }}
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
