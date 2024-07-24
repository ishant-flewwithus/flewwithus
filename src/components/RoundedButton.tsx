import Image from "next/image";
import PlaneSvg from "@/assets/plane.svg";
import { ReactNode, SVGProps } from "react";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface RoundedButtonProps {
  isSelected: boolean;
  icon: string | StaticImport;
  title: string;
  navigateUrl: string;
}

export default function RoundedButton({
  isSelected,
  icon,
  title,
  navigateUrl,
}: RoundedButtonProps) {
  return (
    <Link href={navigateUrl}>
      <div
        className={`w-30 flex items-center justify-between gap-3 ${isSelected ? "border-onprimary bg-primary-500/70 text-onprimary hover:bg-primary-500" : "border-onprimary bg-onprimary text-primary-500 hover:bg-onprimary/80"} cursor-pointer rounded-full border px-6 py-2 font-normal`}
      >
        <Image src={icon} width={20} height={20} alt="d" />
        <span>{title}</span>
      </div>
    </Link>
  );
}
