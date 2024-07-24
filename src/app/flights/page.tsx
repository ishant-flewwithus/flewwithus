"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import FlightIcon from "@/assets/plane.svg";
import CabIcon from "@/assets/cabs.svg";
import HotelIcon from "@/assets/hotels.svg";
import RoundedButton from "@/components/RoundedButton";
import Container from "@/components/Container";
import Section from "@/components/Section";
import RoundedButtonBase from "@/components/RoundedButtonBase";

const navLinks = [
  {
    title: "Flights",
    navigateUrl: "/flights",
    icon: FlightIcon,
  },
  {
    title: "Hotels",
    navigateUrl: "/hotels",
    icon: HotelIcon,
  },
  {
    title: "Cabs",
    navigateUrl: "/cabs",
    icon: CabIcon,
  },
];

export default function FlightHome() {
  const pathname = usePathname();
  return (
    <Section fullHeight={true} backgroundImageUrl="/flight_home_image.png">
      <div className="flex items-center justify-between p-4">
        <div className="relative h-[55px] w-[186px]">
          <Image
            src="logo_white_icon_text.svg"
            alt="Flew With Us Logo"
            layout="fill"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          {navLinks?.map((item, index) => (
            <RoundedButton
              key={index}
              title={item.title}
              isSelected={pathname === item.navigateUrl}
              icon={item.icon}
              navigateUrl={item.navigateUrl}
            />
          ))}
        </div>
        <div>
          <RoundedButtonBase>
            <Image
              src="/emojione-v1_flag-for-india.png"
              width={20}
              height={20}
              alt="India"
            />
            <span className="text-sm">IND | ENG | INR</span>
            <span className="text-textbody">|</span>
            <span className="text-sm font-bold">LOGIN</span>
          </RoundedButtonBase>
        </div>
      </div>
    </Section>
  );
}
