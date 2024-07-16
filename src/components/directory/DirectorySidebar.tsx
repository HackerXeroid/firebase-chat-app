import React from "react";
import TeamMemberCount from "./TeamMemberCount";
import TeamMemberListItem from "./TeamMemberListItem";
import { DirectorySidebarProps } from "../../types";

const DirectorySidebar: React.FC<DirectorySidebarProps> = ({
  teamMembers,
  addToChatPartnersAndSetActive,
}) => {
  return (
    <aside
      className="w-1/4 bg-white flex flex-col h-full"
      aria-label="Directory"
    >
      <header className="p-4 border-b">
        <h2 className="text-xl font-semibold h-10 flex items-center">
          Directory
        </h2>
      </header>
      <div className="p-4">
        <TeamMemberCount count={teamMembers.length} />
        <ul className="space-y-4 mt-4">
          {teamMembers.map((member) => (
            <TeamMemberListItem
              key={member.id}
              member={member}
              addToChatPartnersAndSetActive={addToChatPartnersAndSetActive}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default DirectorySidebar;
