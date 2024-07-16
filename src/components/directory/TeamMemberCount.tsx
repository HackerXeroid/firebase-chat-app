import React from "react";
import Badge from "../common/Badge";
import { TeamMemberCountProps } from "../../types";

const TeamMemberCount: React.FC<TeamMemberCountProps> = ({ count }) => {
  return (
    <div className="mb-4 flex items-center">
      <h3 className="font-semibold text-gray-500 mr-2">Team Members</h3>
      <Badge count={count} />
    </div>
  );
};

export default TeamMemberCount;
