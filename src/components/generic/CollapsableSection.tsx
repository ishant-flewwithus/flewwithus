import { useState } from "react";
import Box from "./Box";
import { BsChevronDown } from "react-icons/bs";

interface SectionProps {
  title: String;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export default function CollapsableSection({
  title,
  children,
  actions,
}: SectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box>
      <div className="flex items-center justify-between">
        <div className="z-[2] text-2xl font-medium md:text-3xl">{title}</div>
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className={`transform cursor-pointer text-xl transition-all ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <BsChevronDown />
        </div>
      </div>
      <div
        className={`transform overflow-hidden transition-all ${isOpen ? "mt-4 max-h-fit" : "max-h-0"}`}
      >
        {children}
      </div>
    </Box>
  );
}
