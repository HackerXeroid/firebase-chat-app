import React from "react";
import { AvatarSize, UserAvatarProps } from "../../types";

const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt, size = "md" }) => {
  const sizeClasses: Record<AvatarSize, string> = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <img src={src} alt={alt} className={`rounded-full ${sizeClasses[size]}`} />
  );
};

export default UserAvatar;
