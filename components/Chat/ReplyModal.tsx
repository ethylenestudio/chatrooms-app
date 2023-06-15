import { renderMessageLimit } from "@/config";
import useSelectRoom from "@/hooks/store/useSelectRoom";
import useSendMessage from "@/hooks/useSendMessage";
import React, { FC, Fragment, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ReplyMessage from "./ReplyMesage";
import Loader from "../ui/Loader";
import useGetMessages from "@/hooks/useGetMessages";

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

  return (
    <form
      action="submit"
      onClick={(e) => {
        close();
      }}
      className="fixed z-50 bottom-[20px] top-0 left-0 right-0 flex flex-col justify-center items-center w-full bg-[rgba(10,15,22,0.4)]"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="px-10 h-[80%] border-[1px] border-[#292F3F] rounded-3xl w-[90%] bg-[rgb(10,15,22)] py-4 flex flex-col space-y-2"
      >
        <div className="flex z-20 justify-between w-[100%] items-center">
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
        <div className="h-[80%] overflow-y-auto">
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

        <div className="space-y-1">
          <input
            type="text"
            placeholder="Reply to this message"
            className="rounded-xl outline-1 outline-[#292F3F] text-white w-[100%] bg-[rgba(77,77,77,0.2)] px-4 py-2 opacity-100"
            value={message}
            onChange={(e) =>
              setMessage((prev) => {
                if (e.target.value.length <= renderMessageLimit) {
                  return e.target.value;
                } else {
                  return prev;
                }
              })
            }
          />
          <button
            type="submit"
            className="text-white flex justify-center text-center bg-[#CBA1A4] rounded-3xl w-[100%] px-2 py-2"
            onClick={async (e) => {
              e.preventDefault();
              await sendMessage();
            }}
          >
            {sending ? <Loader height="26" width="26" /> : "Reply"}
          </button>
        </div>
      </div>
    </form>
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
