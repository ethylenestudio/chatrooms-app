"use client";
import React, { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { ORBIS, userNameLimit } from "@/config";
import { AiOutlineClose } from "react-icons/ai";
import useHydrated from "@/hooks/useHydrated";
const Header: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const hasHydrated = useHydrated();
  async function updateUsername() {
    if (username) {
      const res = await ORBIS.updateProfile({ username });
    }
    setUsername("");
    setIsOpen(false);
  }
  if (!hasHydrated) return null;
  return (
    <div className="text-white col-span-2 mimic-bg h-full w-full flex justify-center items-center flex-col">
      {pathname == "/chat" ? (
        <p className="absolute top-0 left-0 mt-4 ml-2">
          <IoIosArrowBack color="rgb(148,163,184)" onClick={() => router.push("/app")} size={26} />
        </p>
      ) : null}
      <h1 className="font-bold">ETH Barcelona Community</h1>
      <p className="text-sm">July 4 - July 9</p>
      {pathname == "/chat" || pathname == "/app" ? (
        <div className="self-end flex justify-start items-center px-4">
          <IoSettingsOutline
            color="rgb(148,163,184)"
            onClick={() => setIsOpen((prev) => !prev)}
            size={20}
            className="hover:cursor-pointer"
          />
          {isOpen && (
            <form
              action="submit"
              onClick={(e) => {
                setIsOpen(false);
              }}
              className="fixed z-50 bottom-[20px] top-0 left-0 right-0 flex flex-col justify-center items-center w-full bg-[rgba(10,15,22,0.4)]"
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="px-10 border-[1px] border-[#292F3F] rounded-3xl lg:w-[30%] bg-[rgb(10,15,22)] py-4 flex flex-col items-center justify-center space-y-4"
              >
                <div className="flex justify-between w-[100%] items-center">
                  <p className="self-start ml-2">Username</p>
                  <AiOutlineClose
                    onClick={() => setIsOpen(false)}
                    className="hover:cursor-pointer"
                    color="#7E90AF"
                    size={24}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Nickname"
                  className="rounded-xl outline-1 outline-[#292F3F] text-white w-[100%] bg-[rgba(77,77,77,0.2)] px-4 py-2 opacity-100"
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
                <button
                  type="submit"
                  className="text-white bg-[#CBA1A4] rounded-3xl w-[100%] px-2 py-4"
                  onClick={(e) => {
                    e.preventDefault();
                    updateUsername();
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Header;
