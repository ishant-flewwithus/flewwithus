import { InputHTMLAttributes } from "react";
import CheckBox from "./CheckBox";

export interface CheckgroupItem {
  label: string;
  caption?: string;
  isSelected: boolean;
}

export interface CheckgroupProps {
  items: CheckgroupItem[];
  setItems: React.Dispatch<React.SetStateAction<CheckgroupItem[]>>;
  multiSelect?: boolean;
}

export default function Checkgroup({
  items,
  setItems,
  multiSelect,
}: CheckgroupProps) {
  return (
    <div className="grid grid-cols-12">
      {items?.map((item, index) => (
        <div className="col-span-4 flex items-center gap-4" key={index}>
          <div>
            <CheckBox
              checked={item.isSelected}
              onChange={(e) => {
                if (multiSelect) {
                  let newItem = { ...item };
                  newItem.isSelected = e.target.checked;
                  let newItems = [...items];
                  newItems[index] = newItem;
                  setItems(newItems);
                } else {
                  let newItem = { ...item };
                  newItem.isSelected = e.target.checked;
                  let newItems = [...items];
                  newItems = newItems.map((i) => {
                    return {
                      ...i,
                      isSelected: false,
                    };
                  });
                  newItems[index] = newItem;
                  setItems(newItems);
                }
              }}
            />
          </div>
          <div>
            <div className="flex flex-1 items-center text-base font-semibold">
              {item.label}
            </div>

            <div className="flex flex-1 items-center text-sm font-medium">
              {item.caption || ""}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
