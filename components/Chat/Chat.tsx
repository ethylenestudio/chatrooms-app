import React, { FC } from "react";
import Message from "./Message";

type DummyType = {
  messages: MessageType[];
};

type MessageType = {
  content: string;
  sender: string;
  upvotes: number;
  upvoted: boolean;
};

const Chat: FC<DummyType> = ({ messages }) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-[#090A10]">
        <p className="text-[#CBA1A4] text-xs pt-2 text-center">Most Upvotes</p>
        {messages.slice(0, 1).map((message, i) => {
          return (
            <>
              <Message
                content={message.content}
                sender={message.sender}
                upvoted={message.upvoted}
                upvotes={message.upvotes}
                key={i}
              />
            </>
          );
        })}
      </div>
      <div className="overflow-y-auto z-10">
        {messages.slice(1).map((message, i) => {
          return (
            <>
              <Message
                content={message.content}
                sender={message.sender}
                upvoted={message.upvoted}
                upvotes={message.upvotes}
                key={i}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Chat;
