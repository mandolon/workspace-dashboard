import React, { useState, useRef, useEffect, useCallback } from 'react';
import TeamsSearchBar from './TeamsSearchBar';
import TeamMembersTable from './TeamMembersTable';
import TeamMembersSummary from './TeamMembersSummary';
import { ADMIN_USERS, TEAM_USERS, CLIENT_USERS, ALL_USERS, TeamMember } from '@/utils/teamUsers';
import { ArchitectureRole } from '@/types/roles';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParams } from 'react-router-dom';
import { useSupabaseAdmins } from '@/hooks/useSupabaseAdmins';

// NEW: direct Supabase client fetch
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://xxarxbmmedbmpptjgtxe.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4YXJ4Ym1tZWRibXBwdGpndHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2ODY1NTYsImV4cCI6MjA2NTI2MjU1Nn0.Gn3SU4hK27MNtZvyL4V2gSCGy0ahqeMiIyg9bNW7Tmc";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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
  // Use correct initial data for editing titles
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(
    tab === "admin" ? ADMIN_USERS : (tab === "team" ? TEAM_USERS : CLIENT_USERS)
  );
  const [supabaseTeamMembers, setSupabaseTeamMembers] = useState<TeamMember[]>([]);
  const [supabaseClientMembers, setSupabaseClientMembers] = useState<TeamMember[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const isMobile = useIsMobile();

  // Supabase admins (existing)
  const { admins: supabaseAdmins, loading: loadingAdmins } = useSupabaseAdmins();

  // Fetch SUPABASE "team" users
  useEffect(() => {
    const fetchRoleMembers = async (role: "team" | "client") => {
      setLoadingMembers(true);
      // 1. Find users in user_roles with the expected role
      const { data: userRoles, error: userRolesError } = await supabase
        .from("user_roles")
        .select("user_id, role")
        .eq("role", role);
      if (userRolesError) {
        console.error(`Error fetching user_roles for role=${role}:`, userRolesError);
        setLoadingMembers(false);
        return;
      }
      if (!userRoles || userRoles.length === 0) {
        if (role === "team") setSupabaseTeamMembers([]);
        else setSupabaseClientMembers([]);
        setLoadingMembers(false);
        return;
      }
      // 2. Fetch profiles for those user_ids
      const userIds = userRoles.map((ur: any) => ur.user_id).filter(Boolean);
      if (userIds.length === 0) {
        if (role === "team") setSupabaseTeamMembers([]);
        else setSupabaseClientMembers([]);
        setLoadingMembers(false);
        return;
      }
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .in("id", userIds);
      if (profilesError) {
        console.error(`Error fetching profiles for role=${role}:`, profilesError);
        setLoadingMembers(false);
        return;
      }
      // 3. Map to TeamMember type - FIX: use explicit union value for crmRole and others
      const mappedMembers: TeamMember[] = profiles.map((p: any) => {
        const crmRole = role === "team" ? "Team" : "Client";
        const avatarColor = role === "team" ? "bg-blue-700" : "bg-pink-700";
        const nameInit = (p.full_name?.split(" ")?.map((s: string) => s[0])?.join("")?.toUpperCase() || "SU");
        return {
          id: p.id,
          name: nameInit,
          fullName: p.full_name || p.email || "Unknown User",
          crmRole: crmRole as "Team" | "Client",
          titleRole: crmRole as ArchitectureRole,
          lastActive: "—",
          status: "Active",
          email: p.email || "",
          role: crmRole as ArchitectureRole,
          avatar: nameInit,
          avatarColor,
        };
      });

      if (role === "team") setSupabaseTeamMembers(mappedMembers);
      else setSupabaseClientMembers(mappedMembers);
      setLoadingMembers(false);
    };

    if (tab === "team") {
      fetchRoleMembers("team");
    } else if (tab === "client") {
      fetchRoleMembers("client");
    }
    // No need for admin here (handled in useSupabaseAdmins)
    // eslint-disable-next-line
  }, [tab, supabaseAdmins.length]);

  // Memo: Build merged admins only for tab === 'admin'
  let allTeamMembers: TeamMember[] = [];
  if (tab === "admin") {
    // Convert Supabase admins to TeamMember type, avoid duplicates (email)
    const adminLookup = new Map<string, boolean>();
    ADMIN_USERS.forEach(u =>
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
      ...ADMIN_USERS,
      ...supabaseAdminMembers
    ];
  } else if (tab === "team") {
    // Static + Supabase team
    // Avoid duplicates based on email
    const userLookup = new Map<string, boolean>();
    TEAM_USERS.forEach(u => userLookup.set((u.email ?? "").toLowerCase(), true));
    const nonDupeSupabaseTeams = supabaseTeamMembers.filter(tm =>
      !!tm.email && !userLookup.has(tm.email.toLowerCase())
    );
    allTeamMembers = [
      ...TEAM_USERS,
      ...nonDupeSupabaseTeams
    ];
  } else if (tab === "client") {
    // Static + Supabase clients
    const userLookup = new Map<string, boolean>();
    CLIENT_USERS.forEach(u => userLookup.set((u.email ?? "").toLowerCase(), true));
    const nonDupeSupabaseClients = supabaseClientMembers.filter(cm =>
      !!cm.email && !userLookup.has(cm.email.toLowerCase())
    );
    allTeamMembers = [
      ...CLIENT_USERS,
      ...nonDupeSupabaseClients
    ];
  } else {
    allTeamMembers = [];
  }

  // For infinite scrolling
  const [visibleCount, setVisibleCount] = useState(MEMBERS_BATCH);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset visibleCount if teamMembers/filters change
  useEffect(() => {
    setVisibleCount(MEMBERS_BATCH);
  }, [tab, searchTerm, selectedUserId, teamMembers.length, supabaseAdmins.length, supabaseTeamMembers.length, supabaseClientMembers.length]);

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
            {(tab === "admin" && loadingAdmins) || ((tab === "team" || tab === "client") && loadingMembers) ? (
              <div className="w-full py-2 flex justify-center text-xs text-muted-foreground">
                Loading real {tab === "admin" ? "admins" : (tab === "team" ? "team members" : "client members")}...
              </div>
            ) : null}
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
