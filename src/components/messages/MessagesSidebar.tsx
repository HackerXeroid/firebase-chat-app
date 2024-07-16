import React from "react";
import SearchBar from "./SearchBar";
import MessageListItem from "./MessageListItem";
import { MessagesSidebarProps } from "../../types";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MessagesSidebar: React.FC<MessagesSidebarProps> = ({
  logOutHandler,
  currentUser,
  chatPartners,
  activeChatPartner,
  selectChatPartner,
}) => {
  return (
    <aside
      className="w-1/4 bg-white border-r flex flex-col h-full"
      aria-label="Messages"
    >
      <header className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold h-10 flex-1 items-center">
          Messages
        </h2>
      </header>
      <div className="p-4 flex-1">
        <SearchBar />
        <ul className="space-y-4 mt-4">
          {chatPartners.map((chatPartner) => (
            <MessageListItem
              key={chatPartner.id}
              chatPartner={chatPartner}
              activeChatPartner={activeChatPartner}
              selectChatPartner={selectChatPartner}
            />
          ))}
        </ul>
      </div>
      <div className="flex items-center p-4 border-t">
        <Avatar className="mr-2">
          <AvatarImage src={currentUser?.avatarUrl} />
          <AvatarFallback>{currentUser?.name}</AvatarFallback>
        </Avatar>
        <p className="text-xs mr-2 uppercase font-extrabold">
          {currentUser?.name.split(" ")[0]}
        </p>

        <Button className="ml-auto" onClick={logOutHandler} variant="default">
          Log out
        </Button>
      </div>
    </aside>
  );
};

export default MessagesSidebar;
