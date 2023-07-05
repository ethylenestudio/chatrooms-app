import { renderMessageLimit } from "@/config";
import useSelectRoom from "@/hooks/store/useSelectRoom";
import useSendMessage from "@/hooks/useSendMessage";
import React, { FC, Fragment, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ReplyMessage from "./ReplyMesage";
import Loader from "../ui/Loader";
import useGetMessages from "@/hooks/useGetMessages";
import MessageForm from "./MessageForm";

import { ORBIS } from "@/config";

const ReplyModal: FC<{
  master: MessageType;
  close: () => void;
}> = ({ master, close }) => {
  const selectedChat = useSelectRoom((state) => state.selectedRoom);
  const { setMessage, message, setReplyTo, sending, sendMessage } = useSendMessage(selectedChat);
  useEffect(() => {
    setReplyTo({ content: master.content, postId: master.postId });
  }, [master, setReplyTo]);
  const { loading, orbisMessages, fetchMessages } = useGetMessages(selectedChat, master.postId);
  const [orbisSession, setOrbisSession] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      setOrbisSession(((await ORBIS.isConnected()) || {}).status === 200)
    })()
  }, [])

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setMessage((prev) => {
      if (prev.length < renderMessageLimit || e.target.value.length <= renderMessageLimit) {
        return e.target.value;
      }
      return prev;
    });

  const onSend: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    await sendMessage();
  };

  return (
    <div
      onClick={(e) => {
        close();
      }}
      className="fixed top-0 max-h-[100vh] z-[55] left-0 w-full h-full bg-[rgba(10,15,22,0.4)] backdrop-blur-md"
      style={{ margin: "0" }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="px-4 md:px-10 border-[1px] border-[#292F3F] bg-[rgb(10,15,22)] py-4 flex flex-col space-y-2 fixed right-0 w-[950px] max-w-[100%] h-full"
      >
        <div className="flex justify-between w-[100%] items-center">
          <p>{loading && <Loader width="20" height="20" />}</p>
          <AiOutlineClose
            onClick={() => close()}
            className="hover:cursor-pointer"
            color="#7E90AF"
            size={24}
          />
        </div>
        <div>
          <ReplyMessage
            content={master.content}
            postId={master.postId}
            sender={master.sender}
            setThisAsReply={master.setThisAsReply}
            upvotes={master.upvotes}
            username={master.username}
            refetchAllMessages={master.refetchAllMessages}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {orbisMessages?.map((message, i) => {
            return (
              <Fragment key={i}>
                <ReplyMessage
                  content={message.content.body}
                  postId={message.stream_id}
                  sender={message.creator}
                  setThisAsReply={master.setThisAsReply}
                  upvotes={undefined}
                  username={
                    message.creator_details.profile ? message.creator_details.profile.username : ""
                  }
                  refetchAllMessages={fetchMessages}
                />
              </Fragment>
            );
          })}
        </div>

        {
          orbisSession &&
          <MessageForm
            label="Reply"
            placeholder="Reply in this thread"
            onChange={onChange}
            onSend={onSend}
            message={message}
            sending={sending}
          />
        }

      </div>
    </div>
  );
};

export default ReplyModal;
type MessageType = {
  content: string;
  sender: string;
  upvotes: number;
  postId: string;
  master: string | null;
  refetchAllMessages?: () => Promise<void>;
  setThisAsReply: React.Dispatch<
    React.SetStateAction<{
      content: string;
      postId: string;
    }>
  >;
  username: string;
};
