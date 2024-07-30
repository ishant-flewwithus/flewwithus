import { HTMLInputTypeAttribute } from "react";

interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="cursor-pointer rounded-full bg-primary-500 p-2 text-center text-onprimary hover:bg-primary-600">
      {children}
    </button>
  );
}
