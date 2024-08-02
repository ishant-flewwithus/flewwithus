import React, { ReactElement, ReactNode, useState } from "react";
import { ArrowContainer, Popover as ReactPopover } from "react-tiny-popover";

interface PopoverProps {
  trigger: ReactElement;
  render: ReactElement;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popover: React.FC<PopoverProps> = ({
  trigger,
  render,
  open,
  setOpen,
}) => {
  return (
    <ReactPopover
      isOpen={open}
      positions={["bottom"]}
      align="end"
      onClickOutside={() => setOpen(false)}
      containerClassName="z-[200]"
      content={({ position, childRect, popoverRect }) => (
        <div
          className="rounded-lg bg-onprimary px-4 py-2 shadow-xl"
          //onClick={() => setOpen(!open)}
        >
          {render}
        </div>
      )}
    >
      <div onClick={() => setOpen(!open)}>{trigger}</div>
    </ReactPopover>
  );
};

export default Popover;
