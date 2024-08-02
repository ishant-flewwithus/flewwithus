import React, { ReactElement, ReactNode, useState } from "react";
import { ArrowContainer, Popover as ReactPopover } from "react-tiny-popover";

interface PopoverProps {
  trigger: ReactElement;
  render: ReactElement;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popover: React.FC<PopoverProps> = ({ trigger, render }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  return (
    <ReactPopover
      isOpen={isPopoverOpen}
      positions={["bottom"]}
      align="end"
      onClickOutside={() => setIsPopoverOpen(false)}
      containerClassName="z-[200]"
      content={({ position, childRect, popoverRect }) => (
        <div
          className="rounded-lg bg-onprimary px-4 py-2 shadow-xl"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          {render}
        </div>
      )}
    >
      <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>{trigger}</div>
    </ReactPopover>
  );
};

export default Popover;
