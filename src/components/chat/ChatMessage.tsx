import React from "react";
import { ChatMessageProps } from "../../types";

const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentUser }) => {
  console.log(message, "message");
  const isSentByCurrentUser = message.sender.id === currentUser?.id;
  const alignment = isSentByCurrentUser ? "items-end" : "items-start";
  const bgColor = isSentByCurrentUser
    ? "bg-blue-500 text-white"
    : "bg-gray-200";

  return (
    <div className={`flex flex-col ${alignment}`}>
      <div className={`rounded-lg p-2 max-w-xs ${bgColor}`}>
        <p>{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
