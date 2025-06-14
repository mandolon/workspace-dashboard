
import React from 'react';
import { TeamMember } from '@/utils/teamUsers';
import TeamMemberRowDesktop from './TeamMemberRowDesktop';
import TeamMemberRowMobile from './TeamMemberRowMobile';

interface TeamMemberRowProps {
  member: TeamMember;
  roles: string[];
  onRoleChange: (memberId: string, newTitleRole: string) => void;
  isMobile?: boolean;
}

// This is now just a delegator.
const TeamMemberRow: React.FC<TeamMemberRowProps> = (props) => {
  if (props.isMobile) {
    return (
      <TeamMemberRowMobile
        member={props.member}
        roles={props.roles}
        onRoleChange={props.onRoleChange}
      />
    );
  }
  return (
    <TeamMemberRowDesktop
      member={props.member}
      roles={props.roles}
      onRoleChange={props.onRoleChange}
    />
  );
};

export default TeamMemberRow;
