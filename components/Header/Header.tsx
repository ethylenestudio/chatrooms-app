"use client";
import React, { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import useHydrated from "@/hooks/useHydrated";
import ProfileModal from "./ProfileModal";
import useOrbisUser from "@/hooks/store/useOrbisUser";

const Header: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const hasHydrated = useHydrated();
  const userDid = useOrbisUser((state) => state.userDid)

  if (!hasHydrated) return null;

  return (
    <>
      <div className="text-white col-span-2 mimic-bg h-[100px] w-full flex justify-center items-center">
        <div className="w-[50px]">
          {pathname == "/chat" ? (
            <div onClick={() => router.push("/app")} className="hover:cursor-pointer pl-3">
              <IoIosArrowBack
                color="rgb(148,163,184)"
                size={26}
              />
            </div>
          ) : null}
        </div>
        <div className="flex-1 text-center">
          <h1 className="font-bold">ETH Barcelona Community</h1>
          <p className="text-sm">July 4 - July 9</p>
        </div>
        <div className="w-[50px]">
          {pathname == "/chat" || pathname == "/app" ? (
            <div onClick={() => setIsOpen(true)} className="hover:cursor-pointer pr-3">
              <img className="ml-auto h-[30px] w-[30px] border-[2px] border-white rounded-[50%]" src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${userDid}`} />
            </div>
          ) : null}
        </div>
        
      </div>
      {isOpen && <ProfileModal close={() => setIsOpen(false)} />}
    </>
  );
};

export default Header;
