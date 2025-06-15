
import React, { useState, useRef, useEffect, useCallback } from 'react';
import TeamsSearchBar from './TeamsSearchBar';
import TeamMembersTable from './TeamMembersTable';
import TeamMembersSummary from './TeamMembersSummary';
import { TEAM_USERS, TeamMember } from '@/utils/teamUsers';
import { ArchitectureRole } from '@/types/roles';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParams } from 'react-router-dom';
import { useSupabaseAdmins } from '@/hooks/useSupabaseAdmins';

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

const MEMBERS_BATCH = 10;

const TeamsContent = ({ tab, selectedUserId }: TeamsContentProps) => {
  const { projectId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(TEAM_USERS);
  const isMobile = useIsMobile();

  // Supabase admins
  const { admins: supabaseAdmins, loading: loadingAdmins } = useSupabaseAdmins();

  // Memo: Build merged admins only for tab === 'admin'
  let allTeamMembers: TeamMember[] = [];
  if (tab === "admin") {
    // Convert Supabase admins to TeamMember type, avoid duplicates (email)
    const adminLookup = new Map<string, boolean>();
    TEAM_USERS.filter(u => u.crmRole === "Admin").forEach(u =>
      adminLookup.set((u.email ?? "").toLowerCase(), true)
    );

    // Map Supabase admins to TeamMember type, add only new ones
    const supabaseAdminMembers: TeamMember[] = supabaseAdmins
      .filter(a => !!a.email && !adminLookup.has(a.email.toLowerCase()))
      .map(a => ({
        id: a.id,
        name: (a.full_name?.split(" ")?.map(s => s[0])?.join("")?.toUpperCase() || "SU"),
        fullName: a.full_name || a.email || "Unknown User",
        crmRole: "Admin",
        titleRole: "Admin" as ArchitectureRole,
        lastActive: "—",
        status: "Active",
        email: a.email || "",
        role: "Admin" as ArchitectureRole,
        avatar: (a.full_name?.split(" ")?.map(s => s[0])?.join("")?.toUpperCase() || "SU"),
        avatarColor: "bg-blue-700"
      }));

    // Merge static + Supabase admins
    allTeamMembers = [
      ...TEAM_USERS.filter(u => u.crmRole === "Admin"),
      ...supabaseAdminMembers
    ];
  } else {
    allTeamMembers = TEAM_USERS.filter(m => getCrmRoleForTab(tab).includes(m.crmRole));
  }

  // For infinite scrolling
  const [visibleCount, setVisibleCount] = useState(MEMBERS_BATCH);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset visibleCount if teamMembers/filters change
  useEffect(() => {
    setVisibleCount(MEMBERS_BATCH);
  }, [tab, searchTerm, selectedUserId, teamMembers.length, supabaseAdmins.length]);

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
  let filteredMembers: TeamMember[] = allTeamMembers.filter(
    m => getCrmRoleForTab(tab).includes(m.crmRole)
  );

  let displayedMembers = filteredMembers.filter(member =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedUserId) {
    displayedMembers = displayedMembers.filter(m => m.id === selectedUserId);
  }

  // Infinite scroll handler (desktop, all tabs)
  const handleScroll = useCallback(() => {
    if (
      scrollContainerRef.current &&
      !isMobile &&
      visibleCount < displayedMembers.length
    ) {
      const { scrollTop, clientHeight, scrollHeight } = scrollContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 60) {
        setVisibleCount(count => Math.min(count + MEMBERS_BATCH, displayedMembers.length));
      }
    }
  }, [isMobile, visibleCount, displayedMembers.length]);

  useEffect(() => {
    if (!isMobile && scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
      return () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.removeEventListener('scroll', handleScroll);
        }
      }
    }
  }, [isMobile, handleScroll]);

  return (
    <div className={`flex-1 overflow-y-auto ${isMobile ? "px-2 py-3" : "p-6"}`}>
      <TeamsSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isMobile={isMobile}
      />
      {(!isMobile) ? (
        <ScrollArea className="h-96 w-full" type="always">
          <div ref={scrollContainerRef} style={{ maxHeight: 384, overflowY: 'auto' }}>
            <TeamMembersTable
              members={displayedMembers.slice(0, visibleCount)}
              roles={roles}
              onRoleChange={handleRoleChange}
              isMobile={false}
              visibleCount={visibleCount}
              totalCount={displayedMembers.length}
              projectId={projectId || "default-project"}
            />
            {visibleCount < displayedMembers.length && (
              <div className="w-full py-2 flex justify-center text-xs text-muted-foreground">
                Loading more...
              </div>
            )}
            {tab === "admin" && loadingAdmins && (
              <div className="w-full py-2 flex justify-center text-xs text-muted-foreground">
                Loading real admins...
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
          projectId={projectId || "default-project"}
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
