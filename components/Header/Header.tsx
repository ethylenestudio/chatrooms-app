"use client";
import React, { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { ORBIS, userNameLimit } from "@/config";
import { AiOutlineClose } from "react-icons/ai";
import useHydrated from "@/hooks/useHydrated";
import { BiLogOut } from "react-icons/bi";
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
    <>
      <div className="text-white col-span-2 mimic-bg h-[100px] w-full flex justify-center items-center flex-col">
        {pathname == "/chat" ? (
          <p className="absolute top-0 left-0 mt-4 ml-2 hover:cursor-pointer">
            <IoIosArrowBack
              color="rgb(148,163,184)"
              onClick={() => router.push("/app")}
              size={26}
            />
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
          </div>
        ) : null}
      </div>
      {isOpen && (
        <form
          action="submit"
          onClick={(e) => {
            setIsOpen(false);
          }}
          className="fixed z-50 bottom-[20px] top-0 left-0 right-0 flex flex-col justify-center items-center w-full bg-[rgba(10,15,22,0.6)]"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="px-6 border-[1px] w-[90%] border-[#292F3F] rounded-3xl lg:w-[30%] bg-[rgb(10,15,22)] py-4 flex flex-col items-center justify-center space-y-6"
          >
            <div className="flex justify-between w-[100%] items-center mb-2">
              <p className="self-start ml-2 text-lg text-white">Settings</p>
              <AiOutlineClose
                onClick={() => setIsOpen(false)}
                className="hover:cursor-pointer"
                color="#7E90AF"
                size={24}
              />
            </div>
            <div className="relative flex items-center w-[90%]">
              <input
                type="text"
                placeholder="Username"
                className="rounded-3xl pr-2 outline-1 outline-[#292F3F] text-white w-[100%] bg-[rgba(77,77,77,0.2)] px-4 py-2 opacity-100"
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
                className="text-[#7E90AF] absolute right-0 text-sm mr-3 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  updateUsername();
                }}
                disabled={!Boolean(username)}
              >
                Save
              </button>
            </div>

            <button
              className="text-[#CBA1A4] mt-2 px-1 py-1 flex items-center space-x-2 justify-center"
              type="button"
              onClick={async (e) => {
                e.preventDefault();
                await ORBIS.logout();
                router.push("/");
              }}
            >
              <BiLogOut className="mr-1" color="#CBA1A4" />
              Disconnect
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Header;
