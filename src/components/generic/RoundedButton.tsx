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
  transparentMode?: boolean;
  hideLabelOnSmallScreen?: boolean;
}

export default function RoundedButton({
  isSelected,
  icon,
  title,
  navigateUrl,
  transparentMode = true,
  hideLabelOnSmallScreen = false,
}: RoundedButtonProps) {
  return (
    <Link href={navigateUrl}>
      <div
        className={`w-30 flex items-center justify-between gap-3 ${!isSelected ? "border-primary-200 bg-onprimary text-primary-500 hover:bg-onprimary/80" : transparentMode ? "border-onprimary bg-primary-500/70 text-onprimary hover:bg-primary-500" : "border-onprimary bg-primary-500 text-onprimary hover:bg-primary-600"} cursor-pointer rounded-full border px-6 py-2 font-normal`}
      >
        <Image src={icon} width={20} height={20} alt="d" />
        <span
          className={`${hideLabelOnSmallScreen ? "hidden lg:block" : "block"}`}
        >
          {title}
        </span>
      </div>
    </Link>
  );
}
