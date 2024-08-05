import { useState } from "react";
import { Popover } from "react-tiny-popover";

import { DayPicker as ReactDayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface DatePickerProps {
  value: Date;
  setValue: React.Dispatch<React.SetStateAction<Date>>;
  trigger: (selectedItem: Date | null) => React.ReactNode;
}

export default function DatePicker({
  value,
  setValue,
  trigger,
}: DatePickerProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const handleItemClick = (item: Date | undefined) => {
    if (item) {
      setValue(item);
      setIsPopoverOpen(false);
    }
  };
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom"]}
      align="start"
      containerClassName="z-[200]"
      content={
        <div className="rounded-lg bg-onprimary shadow-lg">
          <ReactDayPicker
            mode="single"
            selected={value}
            onSelect={(date) => handleItemClick(date)}
            className="p-1 sm:p-6"
            classNames={{
              selected: `bg-primary-500 text-onprimary rounded-full`, // Highlight the selected day
              today: `border-amber-500`,
            }}
          />
        </div>
      }
      onClickOutside={() => setIsPopoverOpen(false)}
    >
      <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
        {trigger(value)}
      </div>
    </Popover>
  );
}
