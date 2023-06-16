"use client";
import React, { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import useHydrated from "@/hooks/useHydrated";
import ProfileModal from "./ProfileModal";

const Header: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const hasHydrated = useHydrated();

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
      {isOpen && <ProfileModal close={() => setIsOpen(false)} />}
    </>
  );
};

export default Header;
