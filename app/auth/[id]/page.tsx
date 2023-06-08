"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Auth = () => {
  const pathname = usePathname();
  const key = pathname.slice(6);
  console.log(key);
  return <div className="h-[80vh] flex justify-center items-center text-white">page</div>;
};

export default Auth;
