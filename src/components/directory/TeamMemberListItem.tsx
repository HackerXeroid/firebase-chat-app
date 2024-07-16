import React from "react";
import UserAvatar from "../common/UserAvatar";
import { TeamMemberListItemProps } from "../../types";

const TeamMemberListItem: React.FC<TeamMemberListItemProps> = ({
  member,
  addToChatPartnersAndSetActive,
}) => {
  const { name, role, avatarUrl } = member;

  return (
    <li>
      <button
        onClick={() => addToChatPartnersAndSetActive(member)}
        className="flex w-full items-center hover:bg-gray-100"
      >
        <UserAvatar src={avatarUrl} alt="" size="md" />
        <div className="ml-3 flex flex-col items-start">
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </button>
    </li>
  );
};

export default TeamMemberListItem;
