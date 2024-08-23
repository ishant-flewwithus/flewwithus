import { HTMLInputTypeAttribute } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="cursor-pointer rounded-full bg-primary-500 p-2 text-center text-onprimary hover:bg-primary-600"
      {...props}
    >
      {children}
    </button>
  );
}
