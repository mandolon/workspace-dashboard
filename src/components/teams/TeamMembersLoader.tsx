
import React from 'react';

interface Props {
  visibleCount: number;
  totalCount: number;
  loadingAdmins: boolean;
  loadingMembers: boolean;
  tab: "admin" | "team" | "client";
}

const TeamMembersLoader: React.FC<Props> = ({ visibleCount, totalCount, loadingAdmins, loadingMembers, tab }) => (
  <>
    {visibleCount < totalCount && (
      <div className="w-full py-2 flex justify-center text-xs text-muted-foreground">
        Loading more...
      </div>
    )}
    {(tab === "admin" && loadingAdmins) ||
    ((tab === "team" || tab === "client") && loadingMembers) ? (
      <div className="w-full py-2 flex justify-center text-xs text-muted-foreground">
        Loading real {tab === "admin" ? "admins" : (tab === "team" ? "team members" : "client members")}...
      </div>
    ) : null}
  </>
);

export default TeamMembersLoader;
