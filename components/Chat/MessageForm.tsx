import { renderMessageLimit } from "@/config";
import React, { FC, Fragment, useEffect } from "react";
import Loader from "../ui/Loader";
import { useState } from "react"

type MessageForm = { 
    label: string,
    placeholder: string,
    message: string,
    sending: boolean,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onSend?: React.MouseEventHandler<HTMLButtonElement>,
    onSubmit?: React.FormEventHandler<HTMLFormElement>
}

const MessageForm: FC<MessageForm> = ({ label, placeholder, message, sending, onChange, onSend, onSubmit }) => {
  const [focused, setFocused] = useState<boolean>(false)

  return (
    <form className={`w-full items-center flex outline-1 pr-1 border-[1px] ${focused && "border-white" || "border-slate-400"} rounded-[100px]`} action="submit" onSubmit={onSubmit}>
        <input
            placeholder={placeholder}
            className="flex-1 w-full rounded-2xl text-white py-2 mr-2 outline-black outline-0 text-sm px-4 bg-[rgba(0,0,0,0.2)]"
            type="text"
            value={message}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={onChange}
        />
        <div className="text-white text-xs mr-2">
        <span className={message.length > renderMessageLimit && "text-rose-600 font-semibold" || ""}>{message.length}</span> / {renderMessageLimit}
        </div>
        <button
            type="submit"
            disabled={message.replace(/\s{1,}/g, "").length === 0}
            onClick={onSend}
            className="text-[12px] flex self-stretch items-center text-center text-white my-1"
        >
        {sending ? (
            <Loader height="30" width="30" />
        ) : (
            <div className={`${message.replace(/\s{1,}/g, "").length === 0 && "bg-[rgb(100,116,139)] cursor-not-allowed" || "hover:bg-[#CBA1A4] bg-[#ab8386] hover:cursor-pointer"} rounded-[50px] px-3 text-white h-full flex items-center`}>
                {label}
            </div>
        )}
        </button>
    </form>    
  );
};

export default MessageForm