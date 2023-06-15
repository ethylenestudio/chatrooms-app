import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="h-[50px] pb-[env(safe-area-inset-bottom)] fixed bottom-0 left-0 w-full bg-[rgba(0,0,0,1)] text-white flex items-center justify-center">
      <p className="text-sm font-extralight tracking-wide">Powered by Ethylene - Orbis - DoinGud</p>
    </div>
  );
};

export default Footer;
