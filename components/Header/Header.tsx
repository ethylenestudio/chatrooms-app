"use client";
import React, { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { ORBIS, userNameLimit } from "@/config";
const Header: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  async function updateUsername() {
    if (username) {
      const res = await ORBIS.updateProfile({ username });
    }
    setUsername("");
    setIsOpen(false);
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
        <div className="self-end flex justify-start items-center px-4">
          <IoSettingsOutline onClick={() => setIsOpen((prev) => !prev)} size={20} />
          {isOpen && (
            <div
              onClick={(e) => {
                setIsOpen(false);
              }}
              className="fixed z-50 bottom-[20px] top-0 left-0 right-0 flex flex-col justify-center items-center w-full bg-[rgba(0,0,0,0.92)]"
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="px-6 border-[1px] border-white rounded-sm bg-black py-4 flex flex-col items-center justify-center space-y-2"
              >
                <input
                  type="text"
                  placeholder="Nickname"
                  className="rounded-sm text-black px-2 opacity-100"
                  value={username}
                  onChange={(e) =>
                    setUsername((prev) => {
                      if (e.target.value.length <= userNameLimit) {
                        return e.target.value;
                      } else {
                        return prev;
                      }
                    })
                  }
                />
                <button className="text-white rounded-lg px-2 py-1" onClick={updateUsername}>
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Header;
