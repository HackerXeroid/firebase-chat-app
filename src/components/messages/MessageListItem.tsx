import React from "react";
import UserAvatar from "../common/UserAvatar";
import { MessageListItemProps } from "../../types";
import { formatDistanceStrict } from "date-fns";

const MessageListItem: React.FC<MessageListItemProps> = ({
  chatPartner,
  activeChatPartner,
  selectChatPartner,
}) => {
  const { conversation, avatarUrl, name } = chatPartner;
  const isActive = activeChatPartner?.id === chatPartner.id;
  const lastMessage =
    conversation.length > 0 ? conversation[conversation.length - 1] : null;
  return (
    <li>
      <button
        onClick={() => selectChatPartner(chatPartner)}
        className={`flex items-center w-full text-left p-2 hover:bg-gray-100 ${
          isActive && "bg-gray-100"
        }`}
      >
        <UserAvatar src={avatarUrl} alt="" size="md" />
        <div className="flex-grow ml-3">
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-500">
            {!lastMessage && "No conversations yet"}
            {lastMessage && lastMessage.content}
          </p>
        </div>
        <span className="text-sm text-gray-400">
          {lastMessage &&
            formatDistanceStrict(new Date(lastMessage.timestamp), new Date())}
        </span>
      </button>
    </li>
  );
};

export default MessageListItem;
