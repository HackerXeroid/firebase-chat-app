import React from "react";
import { OnlineStatusProps } from "../../types";

const OnlineStatus: React.FC<OnlineStatusProps> = ({ isOnline }) => {
  return (
    <span
      className={`ml-2 mt-1 inline-block ${
        isOnline ? "text-green-500" : "text-red-500"
      } uppercase text-sm font-bold`}
      aria-label={isOnline ? "Online" : "Offline"}
    >
      • {isOnline ? "Online" : "Offline"}
    </span>
  );
};

export default OnlineStatus;
