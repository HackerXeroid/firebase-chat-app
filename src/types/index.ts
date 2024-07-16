import { ReactNode } from "react";

export interface BadgeProps {
  count: number;
}

export interface OnlineStatusProps {
  isOnline: boolean;
}

export type AvatarSize = "sm" | "md" | "lg";
export interface UserAvatarProps {
  src: string;
  alt: string;
  size?: AvatarSize;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  isOnline: boolean;
  avatarUrl: string;
}

export interface TeamMemberListItemProps {
  member: TeamMember;
  addToChatPartnersAndSetActive: (teamMember: TeamMember) => void;
}

export interface TeamMemberCountProps {
  count: number;
}

export interface DirectorySidebarProps {
  teamMembers: TeamMember[];
  addToChatPartnersAndSetActive: (teamMember: TeamMember) => void;
}

export interface ChatInputProps {
  onSend: (message: string) => void;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  isOnline: boolean;
}

export interface ChatHeaderProps {
  activeChatPartner: ChatPartner | null;
}

export interface AppLayoutProps {
  children: ReactNode;
}

export interface Message {
  id: string;
  sender: User | null;
  content: string;
  timestamp: string;
  isSent: boolean;
}

export interface ChatPartner {
  id: string;
  name: string;
  avatarUrl: string;
  isOnline: boolean;
  conversation: Message[];
}

export interface MessagesSidebarProps {
  logOutHandler: () => void;
  currentUser: User | null;
  chatPartners: ChatPartner[];
  activeChatPartner: ChatPartner | null;
  selectChatPartner: (chatPartner: ChatPartner) => void;
}

export interface MessageListItemProps {
  chatPartner: ChatPartner;
  activeChatPartner: ChatPartner | null;
  selectChatPartner: (chatPartner: ChatPartner) => void;
}

export interface ChatMessageProps {
  message: Message;
  currentUser: User | null;
}

export interface ToastProps {
  variant: "destructive" | "default" | null;
}
