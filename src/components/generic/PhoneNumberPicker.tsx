import { COUNTRY_CODE_FLAG_OPTIONS } from "@/constants/country.constant";
import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import ReactSelect, { SingleValue } from "react-select";
import { SelectOption } from "./Select";

interface TextFieldProps {
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  labelSize?: string; // TODO: Add enum
  labelColor?: string;
  variant?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function PhoneNumberPicker({
  label,
  type,
  placeholder,
  labelSize = "large",
  labelColor = "primary",
  variant = "outlined",
  value,
  setValue,
  ...props
}: TextFieldProps) {
  const [number, setNumber] = useState("");
  const [code, setCode] = useState<SingleValue<SelectOption>>(
    COUNTRY_CODE_FLAG_OPTIONS[0],
  );

  useEffect(() => {
    setValue(code?.value + number);
  }, [number, code]);

  return (
    <div>
      <label
        className={`mb-2 block ${labelSize === "large" ? "text-xl" : "text-sm"} ${labelColor === "primary" ? "text-primary-500" : ""}`}
      >
        {label}
      </label>
      <div
        className={`flex items-center ${variant === "outlined" ? "w-full rounded-full border border-gray-300 px-6 py-3 outline-none" : "w-full rounded-full border border-background bg-background px-6 py-[15px] outline-none"}`}
      >
        <div
          style={{
            fontFamily:
              "'Twemoji Country Flags', 'Helvetica', 'Comic Sans', serif",
          }}
        >
          <ReactSelect
            value={code}
            onChange={(val) => {
              setCode(val);
            }}
            options={COUNTRY_CODE_FLAG_OPTIONS}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "Twemoji Country Flags",
                width: "100px",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                zIndex: 250,
                width: "200px",
              }),
            }}
          />
        </div>
        <input
          type="number"
          placeholder={placeholder || "Enter " + label}
          className="flex-1 border-none pl-2 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          {...props}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
    </div>
  );
}
