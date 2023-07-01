/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import ethyleneBig from "@/public/assets/ethyleneBig.png";
import orbisBig from "@/public/assets/orbisBig.png";
import doingudBig from "@/public/assets/doingudBig.png";
import Link from "next/link";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <div className="pb-[env(safe-area-inset-bottom)] w-full bg-[rgba(0,0,0,1)] text-white flex items-center justify-between px-4 lg:px-12 sm:px-8 col-span-2 row-start-3 fixed bottom-0 h-14">
      <div>
        <div className="flex flex-col items-start justify-center">
          <div className="flex justify-center space-x-1 items-center">
            <p className="text-[8px] sm:text-[10px] text-[#7E90AF]">Created by</p>
            <Link href={"https://ethylene.io"} target="_blank">
              <Image
                src={ethyleneBig.src}
                width={90}
                height={60}
                alt="ethylene"
                style={{ transform: "translateY(1px)" }}
              />
            </Link>
            <Link href={"https://doingud.com"} target="_blank">
              <Image
                src={doingudBig.src}
                width={64}
                style={{ marginLeft: 3 }}
                height={40}
                alt="doingud"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-1">
        <p className="text-[8px] sm:text-[10px] text-[#7E90AF]">Powered by</p>
        <Link href={"https://useorbis.com"} target="_blank">
          <Image src={orbisBig.src} width={60} height={50} alt="chatrooms" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
