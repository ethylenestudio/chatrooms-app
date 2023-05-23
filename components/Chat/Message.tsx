import React, { FC } from "react";
import { BiUpvote } from "react-icons/bi";
type MessageType = {
  content: string;
  sender: string;
  upvotes: number;
  upvoted: boolean;
};

const Message: FC<MessageType> = ({ content, sender, upvoted, upvotes }) => {
  return (
    <div className="flex items-center px-4 border-b-[1px] py-2 space-x-2">
      <div className="w-[85%] flex flex-col justify-center">
        <p className="font-extralight text-xs">{sender.slice(0, 4) + "..." + sender.slice(39)}</p>
        <p className="text-sm">{content}</p>
      </div>
      <div
        className={`w-[15%] rounded-md flex items-center justify-center space-x-1 py-1 ${
          upvoted ? "bg-slate-400" : "bg-slate-200"
        }`}
      >
        <BiUpvote color={upvoted ? "rgb(250 204 21)" : "rgb(75 85 99)"} />
        <p className={`${upvoted ? "text-yellow-400" : "text-gray-600"} text-sm`}>{upvotes}</p>
      </div>
    </div>
  );
};

export default Message;
