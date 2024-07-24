import Image from "next/image";
import PlaneSvg from "@/assets/plane.svg";
import { ReactNode, SVGProps } from "react";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Container from "./Container";

interface SectionProps {
  children: React.ReactNode;
  fullHeight?: boolean;
  backgroundImageUrl?: string;
}

export default function Section({
  children,
  fullHeight,
  backgroundImageUrl,
}: SectionProps) {
  return (
    <div className={`relative ${fullHeight ? "h-screen" : "h-auto"}`}>
      <div className="absolute left-0 right-0 top-0 z-[-1] w-full">
        {backgroundImageUrl && (
          <img src={backgroundImageUrl} className="h-screen w-full" />
        )}
      </div>
      <Container>{children}</Container>
    </div>
  );
}
