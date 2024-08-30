import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {}

interface TextFieldProps {
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  labelSize?: string; // TODO: Add enum
  labelColor?: string;
  variant?: string;
}

export default function TextField({
  label,
  type,
  placeholder,
  labelSize = "large",
  labelColor = "primary",
  variant = "outlined",
  ...props
}: TextFieldProps & InputBoxProps) {
  return (
    <div>
      <label
        className={`mb-2 block ${labelSize === "large" ? "text-xl" : "text-sm"} ${labelColor === "primary" ? "text-primary-500" : ""}`}
      >
        {label}
      </label>
      <div>
        <input
          type={type}
          placeholder={placeholder || "Enter " + label}
          className={`${variant === "outlined" ? "w-full rounded-full border border-gray-300 px-6 py-3 outline-none" : "w-full bg-background rounded-full border border-background px-6 py-[15px] outline-none"}`}
          {...props}
        />
      </div>
    </div>
  );
}
