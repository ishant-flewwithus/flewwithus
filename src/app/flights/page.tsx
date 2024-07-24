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
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineInfo } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdChecklist } from "react-icons/md";
import { TbArticle } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { useState } from "react";

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

const navLinksMobile = [
  {
    title: "About us",
    navigateUrl: "/",
    icon: <GiHamburgerMenu />,
  },
  {
    title: "Help",
    navigateUrl: "/",
    icon: <IoIosHelpCircleOutline />,
  },
  {
    title: "Privacy policy",
    navigateUrl: "/",
    icon: <MdOutlinePrivacyTip />,
  },
  {
    title: "Terms of service",
    navigateUrl: "/",
    icon: <MdChecklist />,
  },
  {
    title: "Blog",
    navigateUrl: "/",
    icon: <TbArticle />,
  },
  {
    title: "Privacy Settings",
    navigateUrl: "/",
    icon: <MdOutlineSettings />,
  },
];

export default function FlightHome() {
  const [showMobileNavMenu, setShowMobileNavMenu] = useState(false);

  const pathname = usePathname();
  return (
    <Section fullHeight={true} backgroundImageUrl="/flight_home_image.png">
      {/* NAV BAR */}
      <div className="flex items-center justify-between p-4">
        {/* LOGO */}
        <div className="relative h-[45px] w-[150px] lg:h-[55px] lg:w-[186px]">
          <Image
            src="logo_white_icon_text.svg"
            alt="Flew With Us Logo"
            layout="fill"
          />
        </div>

        {/* LINKS */}
        <div className="hidden items-center justify-between gap-4 lg:flex">
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

        {/* SETTINGS BUTTON */}
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex">
            <RoundedButtonBase>
              <Image
                src="/emojione-v1_flag-for-india.png"
                width={20}
                height={20}
                alt="India"
              />
              <span className="text-xs lg:text-sm">IND | ENG | INR</span>
              <span className="text-xs text-textbody lg:text-sm">|</span>
              <span className="text-xs font-bold lg:text-sm">LOGIN</span>
            </RoundedButtonBase>
          </div>

          <div className="relative lg:hidden">
            <div
              onClick={() => setShowMobileNavMenu(true)}
              className="cursor-pointer text-2xl text-onprimary hover:text-onprimary/90"
            >
              <GiHamburgerMenu />
            </div>
            {showMobileNavMenu && (
              <div className="absolute right-0 w-[60vw] rounded-b-xl rounded-l-xl bg-primary-500 p-4 shadow-xl sm:w-[45vw] md:w-[30vw]">
                {navLinksMobile.map((item, index) => (
                  <div
                    key={index}
                    className="flex cursor-pointer items-center gap-3 px-1 py-2 text-onprimary"
                    onClick={() => setShowMobileNavMenu(false)}
                  >
                    <div>{item.icon}</div>
                    {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
