import { renderMessageLimit, replyLimit } from "@/config";
import { usePathname } from "next/navigation";
import React, { FC, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loader from "../ui/Loader";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

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
  const pathname = usePathname();
  const [focused, setFocused] = useState<boolean>(false)

  return (
    <div
      className={`sticky bottom-0 left-0 flex flex-col p-3 justify-center bg-[rgba(8,9,13,1)] w-full`}
    >
      <form className={`w-full items-center flex outline-1 pr-1 border-[1px] ${focused && "border-white" || "border-slate-400"} rounded-[100px]`} action="submit">
        <input
            placeholder="Ask a question"
            className="flex-1 rounded-2xl text-white py-2 mr-2 outline-black outline-0 text-sm px-4 bg-[rgba(0,0,0,0.2)]"
            type="text"
            value={message}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) =>
              setMessage((prev) => {
                if (prev.length < renderMessageLimit || e.target.value.length <= renderMessageLimit) {
                  return e.target.value;
                }
                return prev;
              })
            }
          />
        <div className="text-white text-xs mr-2">
          <span className={message.length > renderMessageLimit && "text-rose-600 font-semibold" || ""}>{message.length}</span> / {renderMessageLimit}
        </div>
        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            await sendMessage();
          }}
          className="text-sm flex justify-center text-center text-white"
        >
          {sending ? (
            <Loader height="30" width="30" />
          ) : (
            <BsFillArrowUpCircleFill color="rgb(100,116,139)" size={28} />
          )}
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
