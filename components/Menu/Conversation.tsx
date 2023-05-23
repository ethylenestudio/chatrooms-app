import { lastMessageLimit } from "@/config";
import React, { FC } from "react";
import { GrAggregate } from "react-icons/gr";
type ConversationType = {
  name: string;
  lastMessage: string;
  read: boolean;
};

const Conversation: FC<ConversationType> = ({ lastMessage, name, read }) => {
  return (
    <div
      className={`flex justify-center items-center px-8 py-6 border-b-[1px] ${
        !read && "bg-slate-300"
      }`}
    >
      <div className="w-[15%]">
        <GrAggregate size={32} />
      </div>
      <div className="w-[85%] pl-2 flex flex-col items-start justify-center">
        <p className="font-bold text-sm">{name}</p>
        <p className="text-xs">
          {lastMessage.length > lastMessageLimit
            ? lastMessage.slice(0, lastMessageLimit) + "..."
            : lastMessage}
        </p>
      </div>
    </div>
  );
};

export default Conversation;
