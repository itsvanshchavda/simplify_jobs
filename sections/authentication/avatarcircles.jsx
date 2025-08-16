/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";

export const AvatarCircles = () => {
  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59228569",
      profileUrl: "https://github.com/safethecode",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59442788",
      profileUrl: "https://github.com/sanjay-mali",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/89768406",
      profileUrl: "https://github.com/itsarghyadas",
    },
  ];

  // Show only first 4 avatars
  const visibleAvatars = avatars.slice(0, 4);
  const remaining = avatars.length - visibleAvatars.length;

  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse")}>
      {visibleAvatars.map((avatar, index) => (
        <a
          key={index}
          href={avatar.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-9 w-9 rounded-full border-2 border-white dark:border-gray-800"
            src={avatar.imageUrl}
            width={40}
            height={40}
            alt={`Avatar ${index + 1}`}
          />
        </a>
      ))}


    </div>
  );
};
