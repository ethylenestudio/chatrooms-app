import React, { FC, useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  return { open, close, isOpen };
};

export default useModal;
