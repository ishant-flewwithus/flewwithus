import { ReactNode, useEffect, useRef, useState } from "react";

interface PopoverProps {
  appearContent: ReactNode;
  children: ReactNode;
  containerClassname: string;
}

const Popover = ({
  appearContent,
  children,
  containerClassname,
}: PopoverProps) => {
  const [show, setShow] = useState(false);

  const togglePopover = () => {
    setShow(!show);
  };

  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <div className={containerClassname}>
      <div className="relative z-[10]">
        <div onClick={togglePopover}>{appearContent}</div>
        {show && (
          <div
            ref={popupRef}
            className="absolute mt-10 top-0 left-0 rounded-lg bg-white shadow-[0_4px_4px_4px_rgba(0,0,0,0.11)]"
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popover;
