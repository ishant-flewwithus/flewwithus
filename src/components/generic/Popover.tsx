import React, { ReactElement, ReactNode, useState } from "react";
import { ArrowContainer, Popover as ReactPopover } from "react-tiny-popover";

interface PopoverProps {
  trigger: ReactElement;
  render: ReactElement;
}

const Popover: React.FC<PopoverProps> = ({ trigger, render }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  return (
    <ReactPopover
      isOpen={isPopoverOpen}
      positions={["top", "right", "bottom", "left"]}
      onClickOutside={() => setIsPopoverOpen(false)}
      containerClassName="z-[200]"
      content={({ position, childRect, popoverRect }) => (
        // <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
        //   position={position}
        //   childRect={childRect}
        //   popoverRect={popoverRect}
        //   arrowColor={"white"}
        //   arrowSize={10}
        //   arrowStyle={{ opacity: 0.7 }}
        //   className="popover-arrow-container"
        //   arrowClassName="popover-arrow"
        // >
        <div
          className="rounded-lg bg-onprimary px-4 py-2 shadow-xl"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          {render}
        </div>
        // </ArrowContainer>
      )}
    >
      <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>{trigger}</div>
    </ReactPopover>
  );
};

export default Popover;
