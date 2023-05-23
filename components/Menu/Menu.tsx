import React, { FC } from "react";
import Conversation from "./Conversation";

type DummyType = {
  conversations: ConversationType[];
};

type ConversationType = {
  name: string;
  lastMessage: string;
  chosen: boolean;
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
              key={i}
              chosen={conversation.chosen}
            />
          </>
        );
      })}
    </div>
  );
};

export default Menu;
