import { fetcher } from "@/util/fetcher";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { Popover } from "react-tiny-popover";
import { LuSearch } from "react-icons/lu";
import { useDebounce } from "react-use";
interface AutocompleteProps<T> {
  fetchUrl: string;
  renderContent: (item: T) => React.ReactNode;
  placeholder?: string;
  debounceTime?: number;
  onSelect: (item: T) => void; // Callback when an item is selected
  trigger: (selectedItem: T) => React.ReactNode;
  label1: string;
  label2: string;
}

function AutocompleteWithApi<T>({
  fetchUrl,
  placeholder = "Search...",
  debounceTime = 300,
  onSelect,
  trigger,
  renderContent,
  label1,
  label2,
}: AutocompleteProps<T>) {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<T>();

  const handleItemClick = (item: T) => {
    onSelect(item);
    setSelectedItem(item);
    setIsPopoverOpen(false);
  };

  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedInput, setDebouncedInput] = useState<string>(inputValue);

  const { data, error, isValidating, isLoading } = useSWR<T[]>(
    debouncedInput ? `${fetchUrl}${debouncedInput}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Adjust caching time if needed
    },
  );

  // Handle input value change with debounce
  useDebounce(
    () => {
      if (inputValue?.length > 2) {
        setDebouncedInput(inputValue);
      }
    },
    500,
    [inputValue],
  );

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
                placeholder={label1}
                className="w-full border-none outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </div>
          <div className="p-2">
            <div className="mt-2 text-base text-gray-600">{label2}</div>
            <div className="mt-2 max-h-60 overflow-y-auto scrollbar-thin">
              <div>
                {isLoading ? (
                  <div className="flex h-full min-h-20 w-full items-center justify-center">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="h-8 w-8 animate-spin fill-primary-500 text-gray-200"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
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
        {trigger(selectedItem!)}
      </div>
    </Popover>
  );
}

export default AutocompleteWithApi;
