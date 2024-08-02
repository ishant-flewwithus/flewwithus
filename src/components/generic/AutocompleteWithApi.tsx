import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { Popover } from "react-tiny-popover";
import useSWR from "swr";
import { useDebounce } from "react-use";

interface AutocompleteWithApiPopoverProps<T,> {
  trigger: (selectedItem: T | null) => React.ReactNode;
  renderContent: (item: T) => React.ReactNode;
  label: string;
  caption: string;
  value: T;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  data: T[];
}

const AutocompleteWithApiPopover = <T,>({
  trigger,
  isLoading,
  renderContent,
  value,
  setValue,
  label,
  caption,
  inputValue,
  setInputValue,
  data,
}: AutocompleteWithApiPopoverProps<T>) => {
  const [searchStr, setSearchStr] = useState("");

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const handleItemClick = (item: T) => {
    setValue(item);
    setIsPopoverOpen(false);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom"]}
      align="start"
      containerClassName="z-[200]"
      content={
        <div className="rounded-lg bg-onprimary shadow-lg">
          <div className="flex items-center gap-2 rounded-b-3xl p-3 shadow-md">
            <div>
              <LuSearch size={20} />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder={label}
                className="w-full border-none outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </div>
          <div className="p-2">
            <div className="mt-2 text-base text-gray-600">{caption}</div>
            <div className="mt-2 max-h-60 overflow-y-auto scrollbar-thin">
              <div>
                {isLoading ? (
                  <div className="h-full w-full">Loading</div>
                ) : (
                  <>
                    {data && data?.length > 0 ? (
                      data?.map((item, index) => (
                        <div
                          key={index}
                          className="cursor-pointer p-2"
                          onClick={() => handleItemClick(item)}
                        >
                          {renderContent(item)}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: "5px" }}>No results</div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      }
      onClickOutside={() => setIsPopoverOpen(false)}
    >
      <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
        {trigger(value)}
      </div>
    </Popover>
  );
};

export default AutocompleteWithApiPopover;
