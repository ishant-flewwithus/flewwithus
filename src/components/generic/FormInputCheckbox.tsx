import { InputHTMLAttributes } from "react";
import CheckBox from "./CheckBox";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {}
interface FormInputCheckboxProps {
  label: string;
}

export default function FormInputCheckbox({
  label,
  ...props
}: CheckBoxProps & FormInputCheckboxProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center bg-green-300">
        <CheckBox {...props} />
      </div>
      <div className="flex flex-1 items-center text-base font-medium">
        {label}
      </div>
    </div>
  );
}
