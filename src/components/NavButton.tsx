import Image from "next/image";
import PlaneSvg from "@/assets/plane.svg";
import { ReactNode, SVGProps } from "react";
import Link from "next/link";

interface NavButtonProps {
  isSelected: boolean;
  iconPath: ReactNode;
  title: string;
  navigateUrl: string;
}

export default function NavButton({
  isSelected,
  iconPath,
  title,
  navigateUrl,
}: NavButtonProps) {
  return (
    <Link href={navigateUrl}>
      <div
        className={`flex items-center justify-between w-30 gap-3 ${isSelected ? "text-onprimary border-onprimary bg-primary-500/70 hover:bg-primary-500" : "text-primary-500 border-onprimary bg-onprimary hover:bg-onprimary/80"} border px-6 py-2 rounded-full font-normal cursor-pointer`}
      >
        <svg
          className={`w-5 h-5 fill-current ${isSelected ? "text-white" : "text-primary-500"}`}
          viewBox="0 0 21 21"
          xmlns="http://www.w3.org/2000/svg"
        >
          {iconPath}
        </svg>
        <span>{title}</span>
      </div>
    </Link>
  );
}
