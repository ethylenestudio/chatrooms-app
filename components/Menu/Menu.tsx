import React, { FC } from "react";
import Conversation from "./Conversation";

type DummyType = {
  conversations: ConversationType[];
};

type ConversationType = {
  name: string;
  lastMessage: string;
  read: boolean;
};

const Menu: FC<DummyType> = ({ conversations }) => {
  return (
    <div>
      {conversations.map((conversation, i) => {
        return (
          <>
            <Conversation
              lastMessage={conversation.lastMessage}
              name={conversation.name}
              read={conversation.read}
              key={i}
            />
          </>
        );
      })}
    </div>
  );
};

export default Menu;
