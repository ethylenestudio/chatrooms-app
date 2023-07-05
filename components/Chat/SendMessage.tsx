import { renderMessageLimit, replyLimit } from "@/config";
import React, { FC, useEffect, useState } from "react";
import { ORBIS } from "@/config";
import MessageForm from "./MessageForm";

const SendMessage: FC<{
  replyTo: {
    content: string;
    postId: string;
  };
  setReplyTo: React.Dispatch<
    React.SetStateAction<{
      content: string;
      postId: string;
    }>
  >;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => Promise<void>;
  sending: boolean;
  message: string;
}> = ({ replyTo, setReplyTo, message, setMessage, sendMessage, sending }) => {
  const orbisSession = (ORBIS.session && ORBIS.session.hasSession) || false

  const onChange: React.ChangeEventHandler<HTMLInputElement> = e =>
    setMessage((prev) => {
      if (prev.length < renderMessageLimit || e.target.value.length <= renderMessageLimit) {
        return e.target.value;
      }
      return prev;
    })

  const onSend: React.MouseEventHandler<HTMLButtonElement> = async (e) => { e.preventDefault(); await sendMessage(); }

  return (
    <div
      className={`sticky bottom-0 left-0 flex flex-col p-3 justify-center bg-[rgba(8,9,13,1)] w-full`}
    >
      {
        orbisSession &&
        <MessageForm label="Ask" placeholder="Ask a question" onChange={onChange} onSend={onSend} message={message} sending={sending} /> 
      }
    </div>
  );
};

export default SendMessage;
