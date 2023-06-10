"use client";
import React, { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AiOutlineSend } from "react-icons/ai";
import { ORBIS } from "@/config";
const Header: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState("");

  async function updateUsername() {
    if (username) {
      const res = await ORBIS.updateProfile({ username });
    }
    setUsername("");
  }

  return (
    <div className="text-white sticky top-0 left-0 right-0 z-50 bg-black h-[100px] w-full flex justify-center items-center flex-col">
      {pathname == "/chat" ? (
        <p className="absolute top-0 left-0 mt-4 ml-2">
          <IoArrowBackCircleSharp onClick={() => router.push("/app")} size={30} />
        </p>
      ) : null}
      <h1 className="font-bold">ETH Barcelona Community</h1>
      <p className="text-sm">July 4 - July 9</p>
      {pathname == "/chat" || pathname == "/app" ? (
        <div className="self-end flex justify-start items-center px-2 space-x-2">
          <input
            type="text"
            placeholder="nickname"
            className="rounded-md bg-black text-xs px-2 py-1 w-20 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <AiOutlineSend onClick={updateUsername} size={12} />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
