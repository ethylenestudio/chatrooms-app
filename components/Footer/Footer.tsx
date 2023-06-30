/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import ethylene from "@/public/assets/ethyleneLogo.png";
import orbis from "@/public/assets/orbisLogo.svg";
import doingud from "@/public/assets/doingudLogo.svg";
import chatrooms from "@/public/assets/chatroomsLogo.svg";
import Link from "next/link";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <div className="pb-[env(safe-area-inset-bottom)] w-full bg-[rgba(0,0,0,1)] text-white flex items-center justify-between px-4 lg:px-12 sm:px-8 col-span-2 row-start-3 fixed bottom-0 h-14">
      <div>
        <div className="flex flex-col items-start justify-center space-y-1 py-1">
          <p className="text-[8px] sm:text-[10px]">Created by</p>
          <div className="flex justify-center space-x-2 sm:space-x-3 items-center">
            <Link href={"https://useorbis.com"} target="_blank">
              <Image src={orbis.src} width={20} height={20} alt="orbis" />
            </Link>
            <Link href={"https://ethylene.io"} target="_blank">
              <Image src={ethylene.src} width={24} height={24} alt="ethylene" />
            </Link>
            <Link href={"https://doingud.com"} target="_blank">
              <Image src={doingud.src} width={24} height={24} alt="doingud" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Image src={chatrooms.src} width={134} height={24} alt="chatrooms" />
      </div>
    </div>
  );
};

export default Footer;
