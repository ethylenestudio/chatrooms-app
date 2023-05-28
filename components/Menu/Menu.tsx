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
        if (i == 0) {
          return (
            <div key={i} className="bg-black sticky top-0 ">
              <p className="text-[#CBA1A4] text-xs pt-2 text-center">Rooms</p>

              <Conversation
                lastMessage={conversation.lastMessage}
                name={conversation.name}
                key={i}
                chosen={conversation.chosen}
              />
            </div>
          );
        }
      })}
      {conversations.map((conversation, i) => {
        if (i != 0) {
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
        }
      })}
    </div>
  );
};

export default Menu;
