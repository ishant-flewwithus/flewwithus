import React from "react";
import ReactSelect, { SingleValue } from "react-select";

export interface SelectOption {
  label: string | null;
  value: string | null;
}

export interface SelectProps {
  options: SelectOption[];
  value: SelectOption | undefined;
  onChange: (val: SelectOption | undefined) => void;
  label?: string;
}

export default function Select({
  options,
  value,
  onChange,
  label,
}: SelectProps) {
  return (
    <div>
      {label && <label className="mb-2 block text-sm">{label}</label>}
      <div>
        <ReactSelect
          value={value}
          onChange={(val) => {
            onChange(val as SelectOption);
          }}
          options={options}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#EEF2F8",
              border: "none",
              outline: "none",
              borderRadius: "50px",
              padding: "10px",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              zIndex: 250
            }),
          }}
        />
      </div>
    </div>
  );
}
