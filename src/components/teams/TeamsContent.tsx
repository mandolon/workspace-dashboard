
import React, { useState, useRef, useEffect, useCallback } from 'react';
import TeamsSearchBar from './TeamsSearchBar';
import TeamMembersTable from './TeamMembersTable';
import TeamMembersSummary from './TeamMembersSummary';
import { TEAM_USERS, TeamMember } from '@/utils/teamUsers';
import { ArchitectureRole } from '@/types/roles';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TeamsContentProps {
  tab: "admin" | "team" | "client";
  selectedUserId?: string;
}

const getCrmRoleForTab = (tab: "admin" | "team" | "client") => {
  if (tab === "admin") return ["Admin"];
  if (tab === "team") return ["Team"];
  if (tab === "client") return ["Client"];
  return [];
};

const CLIENTS_BATCH = 10; // Show 10 clients per batch

const TeamsContent = ({ tab, selectedUserId }: TeamsContentProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(TEAM_USERS);
  const isMobile = useIsMobile();

  // For desktop infinite scrolling in client tab
  const [visibleCount, setVisibleCount] = useState(CLIENTS_BATCH);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset visibleCount if teamMembers/filters change
  useEffect(() => {
    setVisibleCount(CLIENTS_BATCH);
  }, [tab, searchTerm, selectedUserId, teamMembers.length]);

  const roles: ArchitectureRole[] = [
    'Architect', 'Engineer', 'CAD Tech', 'Designer', 'Interior Designer',
    'Consultant', 'Project Manager', 'Admin', 'Developer', 'QA Tester',
    'Team Lead', 'Marketing Manager', 'Customer Support', 'Operations',
    'Jr Designer', 'Contractor', 'Client'
  ];

  const handleRoleChange = (memberId: string, newTitleRole: ArchitectureRole) => {
    setTeamMembers(prev =>
      prev.map(m =>
        m.id === memberId ? { ...m, titleRole: newTitleRole } : m
      )
    );
  };

  // Filtering by tab and search
  let filteredMembers: TeamMember[] = teamMembers.filter(
    m => getCrmRoleForTab(tab).includes(m.crmRole)
  );

  let displayedMembers = filteredMembers.filter(member =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedUserId) {
    displayedMembers = displayedMembers.filter(m => m.id === selectedUserId);
  }

  // Infinite scroll handler (desktop, only for clients tab)
  const handleScroll = useCallback(() => {
    if (
      scrollContainerRef.current &&
      tab === "client" &&
      !isMobile &&
      visibleCount < displayedMembers.length
    ) {
      const { scrollTop, clientHeight, scrollHeight } = scrollContainerRef.current;
      // Within 60px of bottom, load more
      if (scrollTop + clientHeight >= scrollHeight - 60) {
        setVisibleCount(count => Math.min(count + CLIENTS_BATCH, displayedMembers.length));
      }
    }
  }, [tab, isMobile, visibleCount, displayedMembers.length]);

  useEffect(() => {
    if (tab === "client" && !isMobile && scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
      return () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.removeEventListener('scroll', handleScroll);
        }
      }
    }
  }, [tab, isMobile, handleScroll]);

  return (
    <div className={`flex-1 overflow-y-auto ${isMobile ? "px-2 py-3" : "p-6"}`}>
      <TeamsSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isMobile={isMobile}
      />
      {(tab === 'client' && !isMobile) ? (
        <ScrollArea className="h-96 w-full" type="always">
          <div ref={scrollContainerRef} style={{ maxHeight: 384, overflowY: 'auto' }}>
            <TeamMembersTable
              members={displayedMembers.slice(0, visibleCount)}
              roles={roles}
              onRoleChange={handleRoleChange}
              isMobile={false}
              visibleCount={visibleCount}
              totalCount={displayedMembers.length}
            />
            {visibleCount < displayedMembers.length && (
              <div className="w-full py-2 flex justify-center text-xs text-muted-foreground">
                Loading more clients...
              </div>
            )}
          </div>
        </ScrollArea>
      ) : (
        <TeamMembersTable
          members={displayedMembers}
          roles={roles}
          onRoleChange={handleRoleChange}
          isMobile={isMobile}
        />
      )}
      <TeamMembersSummary
        filteredMembers={displayedMembers}
        totalMembers={filteredMembers.length}
        isMobile={isMobile}
      />
    </div>
  );
};

export default TeamsContent;

