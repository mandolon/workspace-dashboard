
import React, { useRef, useEffect } from "react";
import { ScrollArea } from '@/components/ui/scroll-area';
import TeamMembersTable from "./TeamMembersTable";
import TeamMembersLoader from "./TeamMembersLoader";

interface TeamMembersScrollContainerProps {
  members: any[];
  roles: string[];
  onRoleChange: (memberId: string, newTitleRole: string) => void;
  visibleCount: number;
  totalCount: number;
  projectId: string;
  isMobile: boolean;
  loadingAdmins: boolean;
  loadingMembers: boolean;
  tab: "admin" | "team" | "client";
  handleScroll: () => void;
}

const TeamMembersScrollContainer: React.FC<TeamMembersScrollContainerProps> = ({
  members,
  roles,
  onRoleChange,
  visibleCount,
  totalCount,
  projectId,
  isMobile,
  loadingAdmins,
  loadingMembers,
  tab,
  handleScroll
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile && scrollContainerRef.current) {
      const node = scrollContainerRef.current;
      node.addEventListener("scroll", handleScroll);
      return () => node.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile, handleScroll]);

  return (
    <ScrollArea className="h-96 w-full" type="always">
      <div
        ref={scrollContainerRef}
        style={{ maxHeight: 384, overflowY: 'auto' }}
        data-scrollarea-scrollable
      >
        <TeamMembersTable
          members={members.slice(0, visibleCount)}
          roles={roles}
          onRoleChange={onRoleChange}
          isMobile={false}
          visibleCount={visibleCount}
          totalCount={totalCount}
          projectId={projectId}
        />
        <TeamMembersLoader
          visibleCount={visibleCount}
          totalCount={totalCount}
          loadingAdmins={loadingAdmins}
          loadingMembers={loadingMembers}
          tab={tab}
        />
      </div>
    </ScrollArea>
  );
};

export default TeamMembersScrollContainer;
