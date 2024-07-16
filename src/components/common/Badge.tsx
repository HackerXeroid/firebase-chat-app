import React from "react";
import { BadgeProps } from "../../types";

const Badge: React.FC<BadgeProps> = ({ count }) => {
  return (
    <span
      className="bg-gray-200 rounded-full px-2 py-1 text-sm"
      aria-label={`${count} team members`}
    >
      {count}
    </span>
  );
};

export default Badge;
