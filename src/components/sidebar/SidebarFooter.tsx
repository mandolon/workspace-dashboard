
import React from 'react';
import { HelpCircle } from 'lucide-react';
import InviteDialog from './InviteDialog';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

const SidebarFooter = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  // Helper to determine correct help page path for current user
  const getHelpPagePath = () => {
    if (currentUser.role === 'Admin') return '/help/admin';
    if (
      currentUser.role === 'Team Lead' ||
      currentUser.role === 'Project Manager' ||
      currentUser.role === 'Engineer' ||
      currentUser.role === 'Designer' ||
      currentUser.role === 'Operations' ||
      currentUser.role === 'QA Tester' ||
      currentUser.role === 'Consultant' ||
      currentUser.role === 'CAD Tech' ||
      currentUser.role === 'Jr Designer' ||
      currentUser.role === 'Developer' ||
      currentUser.role === 'Marketing Manager' ||
      currentUser.role === 'Customer Support' ||
      currentUser.role === 'Interior Designer' ||
      currentUser.role === 'Contractor'
    ) {
      return '/help/team';
    }
    if (currentUser.role === 'Client') return '/help/client';
    return '/help/client';
  };

  const handleNavigateHelp = () => {
    navigate(getHelpPagePath());
  };

  return (
    <div className="border-t border-sidebar-border p-4">
      <div className="flex items-center justify-between">
        <InviteDialog triggerButtonClassName="flex items-center gap-2 text-sm text-sidebar-foreground hover:text-foreground" />
        <button
          className="flex items-center gap-2 text-sm text-sidebar-foreground hover:text-foreground"
          onClick={handleNavigateHelp}
          type="button"
        >
          <HelpCircle className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Help</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarFooter;

