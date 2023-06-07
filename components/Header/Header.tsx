"use client";
import React, { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoArrowBackCircleSharp } from "react-icons/io5";
const Header: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="text-white h-[10vh] flex justify-center items-center flex-col">
      {pathname == "/chat" ? (
        <p className="absolute top-0 left-0 mt-4 ml-2">
          <IoArrowBackCircleSharp onClick={() => router.push("/app")} size={30} />
        </p>
      ) : null}
      <h1 className="font-bold">ETH Barcelona Community</h1>
      <p className="text-sm">July 4 - July 9</p>
    </div>
  );
};

export default Header;
