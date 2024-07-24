"use client";
import Section from "@/components/generic/Section";
import NavBar from "@/components/app/NavBar";
import Box from "@/components/generic/Box";
import Stack from "@/components/generic/Stack";
import {
  DEFAULT_CONTENT_GAP,
  DEFAULT_SECTION_GAP,
} from "@/other/style.constant";
import FlightIcon from "@/assets/plane.svg";
import CabIcon from "@/assets/cabs.svg";
import HotelIcon from "@/assets/hotels.svg";
import RoundedButton from "@/components/generic/RoundedButton";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SwitchButton from "@/assets/switch_button.svg";
import Image from "next/image";

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

const flightTypes = ["One way", "Round trip"];

export default function FlightHome() {
  const pathname = usePathname();

  const [flightType, setFlightType] = useState("oneway");

  return (
    <Section fullHeight={true} backgroundImageUrl="/flight_home_image.png">
      <Stack gap={DEFAULT_SECTION_GAP} direction="vertical">
        <NavBar />
        <Box>
          <Stack direction="vertical" gap={DEFAULT_CONTENT_GAP}>
            <div className="flex items-start gap-4">
              {navLinks?.map((item, index) => (
                <RoundedButton
                  key={index}
                  title={item.title}
                  isSelected={pathname === item.navigateUrl}
                  icon={item.icon}
                  navigateUrl={item.navigateUrl}
                  transparentMode={false}
                />
              ))}
            </div>
            <div className="text-2xl font-bold">
              Millions of cheap flights. One simple search.
            </div>

            {/* FLIGHT TYPE RADIO BUTTONS */}
            <div className="flex items-center gap-4">
              {flightTypes.map((type, index) => (
                <div className="flex items-center" key={index}>
                  <input
                    id={type + index}
                    type="radio"
                    value={type}
                    name="default-radio"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600"
                  />
                  <label
                    htmlFor={type + index}
                    className="ms-2 text-sm font-medium"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="w-[20%] cursor-pointer self-stretch rounded-xl border border-gray-300 p-4">
                <div className="text-sm font-medium">From</div>
                <div className="mt-2 line-clamp-1 text-lg font-bold">Delhi</div>
                <div className="text-xs font-light text-textbody">
                  DEL, Delhi Airport India
                </div>
              </div>
              <Image
                src={SwitchButton}
                width={30}
                height={30}
                alt="Switch flights"
                className="cursor-pointer"
              />
              <div className="w-[20%] cursor-pointer self-stretch rounded-xl border border-gray-300 p-4">
                <div className="text-sm font-medium">To</div>
                <div className="mt-2 line-clamp-1 text-lg font-bold">
                  Bangalore, KA
                </div>
                <div className="text-xs font-light text-textbody">
                  Indira Gandhi International...
                </div>
              </div>
              <div className="w-[20%] cursor-pointer self-stretch rounded-xl border border-gray-300 p-4">
                <div className="text-sm font-medium">Depart</div>
                <div className="mt-2 line-clamp-1 text-lg font-bold">05</div>
                <div className="text-xs font-light text-textbody">
                  Jul&apos;24 Friday
                </div>
              </div>
              <div className="w-[15%] cursor-pointer self-stretch rounded-xl border border-gray-300 p-4">
                <div className="text-sm font-medium">Return</div>
                <div className="mt-2 line-clamp-1 text-lg font-bold"></div>
                <div className="text-xs font-light text-textbody">
                  Tap to add a return date for bigger discounts
                </div>
              </div>
              <div className="w-[15%] cursor-pointer self-stretch rounded-xl border border-gray-300 p-4">
                <div className="text-sm font-medium">
                  Travelers & Cabin Class
                </div>
                <div className="mt-2 line-clamp-1 text-lg font-bold"></div>
                <div className="text-xs font-light text-textbody">
                  1 Adult, Economy
                </div>
              </div>
              <div className="w-[10%] lg:w-[6%] cursor-pointer self-stretch rounded-xl border border-primary-500 bg-primary-500 p-4 text-onprimary flex items-center justify-center hover:bg-primary-600">
                Search
              </div>
            </div>
          </Stack>
        </Box>
      </Stack>
    </Section>
  );
}
