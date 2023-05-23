import React, { FC } from "react";

const Header: FC = () => {
  return (
    <div className="bg-slate-900 text-white h-[10vh] flex justify-center items-center flex-col">
      <h1 className="font-bold">ETH Barcelona Community</h1>
      <p className="text-sm">July 4 - July 9</p>
    </div>
  );
};

export default Header;
