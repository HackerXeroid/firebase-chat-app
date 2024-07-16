import React from "react";
import UserAvatar from "../common/UserAvatar";
import OnlineStatus from "../common/OnlineStatus";
import { ChatHeaderProps } from "../../types";

const ChatHeader: React.FC<ChatHeaderProps> = ({ activeChatPartner }) => {
  return (
    <header className="p-4 border-b flex items-center">
      <UserAvatar src={activeChatPartner?.avatarUrl || ""} alt="" size="md" />
      <h1 className="text-xl font-semibold ml-3">
        {activeChatPartner?.name || ""}
      </h1>
      <OnlineStatus isOnline={activeChatPartner?.isOnline || false} />
    </header>
  );
};

export default ChatHeader;
