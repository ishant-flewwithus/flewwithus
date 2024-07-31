import { InputHTMLAttributes } from "react";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function CheckBox({ ...props }: CheckBoxProps) {
  return (
    <input type="checkbox" className="h-5 w-5 accent-primary-500" {...props} />
  );
}
