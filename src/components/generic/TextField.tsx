import { HTMLInputTypeAttribute } from "react";

interface TextFieldProps {
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
}

export default function TextField({
  label,
  type,
  placeholder,
}: TextFieldProps) {
  return (
    <div>
      <label className="text-xl font-bold text-primary-500">{label}</label>
      <div className="mt-2">
        <input
          type={type}
          placeholder={placeholder || "Enter " + label}
          className="w-full rounded-full border border-gray-300 px-6 py-3 outline-none"
        />
      </div>
    </div>
  );
}
