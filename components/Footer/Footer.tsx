import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="pb-[env(safe-area-inset-bottom)] w-full bg-[rgba(0,0,0,1)] text-white flex items-center justify-center col-span-2 row-start-3 fixed bottom-0 h-14">
      <p className="text-sm font-extralight tracking-wide">
        Powered by Ethylene - Orbis - DoinGud
      </p>
    </div>
  );
};

export default Footer;
