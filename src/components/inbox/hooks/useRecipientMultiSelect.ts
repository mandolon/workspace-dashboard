
import { useRef, useState, useMemo } from "react";
import { TEAM_USERS, TeamMember } from "@/utils/teamUsers";

export interface Recipient {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  avatarColor?: string;
  isCustom?: boolean;
}

export function useRecipientMultiSelect(value: Recipient[], onChange: (recipients: Recipient[]) => void) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

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

  const handleAddTeamUser = (user: TeamMember) => {
    onChange([
      ...value,
      {
        id: user.id,
        name: user.fullName,
        email: user.email,
        avatarColor: user.avatarColor,
        avatar: user.initials,
        // No "initials" property here
      },
    ]);
    setSearch("");
    setPopoverOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

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

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === "," || e.key === "Tab") && inputValue) {
      e.preventDefault();
      tryAddCustom();
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      handleChipRemove(value[value.length - 1].id);
    }
  };

  return {
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
  };
}
