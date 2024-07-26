import React, { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import MessagesSidebar from "../components/messages/MessagesSidebar";
import DirectorySidebar from "../components/directory/DirectorySidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";
import { User, Message, TeamMember, ChatPartner } from "../types";
import Loader from "@/components/loader";
import { generateAvatarUrl } from "@/components/utils";

const logOutHandler = async () => {
  try {
  } catch (error: unknown) {}
};

const ChatPage: React.FC = () => {
  const [currentUser] = useState<User | null>({
    id: "1",
    name: "John Doe",
    avatarUrl: `https://api.multiavatar.com/John Doe-1.png`,
    isOnline: true,
  });

  const [isLoading] = useState(false);

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: "2",
      name: "Kathleen Lang",
      role: "Software Engineer",
      avatarUrl: `https://api.multiavatar.com/Kathleen Lang-2.png`,
      isOnline: false,
    },
    {
      id: "3",
      name: "Sara Smith",
      role: "Product Manager",
      avatarUrl: `https://api.multiavatar.com/Sara Smith-3.png`,
      isOnline: true,
    },
    {
      id: "4",
      name: "John Doe",
      role: "Designer",
      avatarUrl: `https://api.multiavatar.com/John Doe-4.png`,
      isOnline: true,
    },
    {
      id: "5",
      name: "Jane Doe",
      role: "Software Engineer",
      avatarUrl: `https://api.multiavatar.com/Jane Doe-5.png`,
      isOnline: false,
    },
    {
      id: "6",
      name: "Alice Smith",
      role: "Software Engineer",
      avatarUrl: `https://api.multiavatar.com/Alice Smith-6.png`,
      isOnline: true,
    },
    {
      id: "7",
      name: "Bob Smith",
      role: "Software Engineer",
      avatarUrl: `https://api.multiavatar.com/Bob Smith-7.png`,
      isOnline: true,
    },
  ]);

  const [chatPartners, setChatPartners] = useState<ChatPartner[]>([
    {
      id: "2",
      name: "Kathleen Lang",
      isOnline: false,
      avatarUrl: `https://api.multiavatar.com/Kathleen Lang-2.png`,
      conversation: [
        {
          id: "1",
          sender: {
            id: "2",
            name: "Kathleen Lang",
            avatarUrl: generateAvatarUrl("2"),
            isOnline: false,
          },
          content: "Hello!",
          timestamp: "2021-09-01T12:00:00Z",
          isSent: true,
        },
      ],
    },
    {
      id: "3",
      name: "Sara Smith",
      isOnline: true,
      avatarUrl: `https://api.multiavatar.com/Sara Smith-3.png`,
      conversation: [
        {
          id: "1",
          sender: {
            id: "3",
            name: "Sara Smith",
            avatarUrl: generateAvatarUrl("3"),
            isOnline: true,
          },
          content: "Hey there!",
          timestamp: "2021-09-01T12:00:00Z",
          isSent: true,
        },
      ],
    },
  ]);

  const [activeChatPartner, setActiveChatPartner] =
    useState<ChatPartner | null>(null);

  const currentConversation = activeChatPartner?.conversation || [];

  const handleSendMessage = (content: string) => {
    if (!activeChatPartner) {
      return;
    }

    const newMessage: Message = {
      id: String(currentConversation.length + 1),
      sender: currentUser,
      content,
      timestamp: new Date().toISOString(),
      isSent: true,
    };

    const updatedChatPartners = chatPartners.map((chatPartner) => {
      if (chatPartner.id === activeChatPartner.id) {
        return {
          ...chatPartner,
          conversation: [...chatPartner.conversation, newMessage],
        };
      }

      return chatPartner;
    });

    setChatPartners(updatedChatPartners);
    setActiveChatPartner((prev) => {
      if (!prev) {
        return null;
      }

      return {
        ...prev,
        conversation: [...prev.conversation, newMessage],
      };
    });
  };

  const addToChatPartnersAndSetActive = (teamMember: TeamMember) => {
    let newChatPartner: ChatPartner = {
      id: teamMember.id,
      name: teamMember.name,
      isOnline: teamMember.isOnline,
      avatarUrl: teamMember.avatarUrl,
      conversation: [],
    };

    const existingChatPartner = chatPartners.find(
      (chatPartner) => chatPartner.id === teamMember.id
    );

    if (existingChatPartner) {
      newChatPartner = existingChatPartner;
    }

    setChatPartners((prev) => {
      let ans = prev.filter(
        (chatPartner) => chatPartner.id !== newChatPartner.id
      );
      ans = [newChatPartner, ...ans];
      return ans;
    });
    setActiveChatPartner(newChatPartner);
  };

  return (
    <>
      {isLoading && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!isLoading && (
        <AppLayout>
          <MessagesSidebar
            logOutHandler={logOutHandler}
            chatPartners={chatPartners}
            currentUser={currentUser}
            activeChatPartner={activeChatPartner}
            selectChatPartner={setActiveChatPartner}
          />
          <main className="w-1/2 bg-white border-r flex flex-col h-full">
            {!activeChatPartner && currentConversation.length === 0 && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-400 text-2xl">
                  Select a chat partner to start messaging
                </p>
              </div>
            )}
            {activeChatPartner && (
              <>
                <ChatHeader activeChatPartner={activeChatPartner} />
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentConversation.map((message) => (
                    <ChatMessage
                      currentUser={currentUser}
                      key={message.id}
                      message={message}
                    />
                  ))}
                </div>
                <ChatInput onSend={handleSendMessage} />
              </>
            )}
          </main>
          <DirectorySidebar
            teamMembers={teamMembers}
            addToChatPartnersAndSetActive={addToChatPartnersAndSetActive}
          />
        </AppLayout>
      )}
    </>
  );
};

export default ChatPage;
