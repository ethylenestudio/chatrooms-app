"use client";
import React, { FC } from "react";
import { ColorRing } from "react-loader-spinner";

const Loader: FC<{ width: string; height: string; visible?: boolean }> = ({
  width,
  height,
  visible,
}) => {
  return (
    <ColorRing
      visible={visible ? visible : true}
      height={height}
      width={width}
      ariaLabel="blocks-loading"
      colors={["rgb(100,116,139)", "#CBA1A4", "rgb(100,116,139)", "#CBA1A4", "rgb(100,116,139)"]}
    />
  );
};

export default Loader;
