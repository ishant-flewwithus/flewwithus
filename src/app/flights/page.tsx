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
import StudentIcon from "@/assets/student_15399518 1.svg";
import SeniorCitizenIcon from "@/assets/grandfather_522280 1.svg";
import ArmedForcesIcon from "@/assets/user-pilot-tie_9585967 1.svg";
import DoctorIcon from "@/assets/user-md_9856850 1.svg";

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

const flightTypes = [
  {
    title: "One way",
    value: "oneway",
  },
  {
    title: "Round trip",
    value: "roundtrip",
  },
];
const offerOptions = [
  {
    title: "Student",
    description: "Extra discounts/baggage",
    value: "student",
    icon: StudentIcon,
  },
  {
    title: "Senior Citizens",
    description: "up to ₹600 off",
    value: "seniorcitizen",
    icon: SeniorCitizenIcon,
  },
  {
    title: "Armed Forces",
    description: "up to ₹600 off",
    value: "armedforces",
    icon: ArmedForcesIcon,
  },
  {
    title: "Doctor & Nurses",
    description: "up to ₹600 off",
    value: "medical",
    icon: DoctorIcon,
  },
];

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
                    id={type.value + index}
                    type="radio"
                    value={type.value}
                    name="default-radio"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600"
                  />
                  <label
                    htmlFor={type.value + index}
                    className="ms-2 text-sm font-medium"
                  >
                    {type.title}
                  </label>
                </div>
              ))}
            </div>

            {/* FLIGHT CHOOSER */}
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
              <div className="flex w-[10%] cursor-pointer items-center justify-center self-stretch rounded-xl border border-primary-500 bg-primary-500 p-4 text-onprimary hover:bg-primary-600 lg:w-[6%]">
                Search
              </div>
            </div>

            {/* FLIGHT FARE CHOOSER */}
            <div className="flex items-center gap-4">
              <div>
                <div className="font-bold">Select a special fare</div>
                <div className="text-sm text-textbody">Extra Savings</div>
              </div>
              <div className="flex items-center gap-4">
                {offerOptions.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl border border-gray-300 p-4 cursor-pointer"
                  >
                    <input
                      id={item.value + index}
                      type="radio"
                      value={item.value}
                      name="default-radio"
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600"
                    />
                    <Image
                      width={24}
                      height={24}
                      src={item.icon}
                      alt={item.title}
                    />
                    <div>
                      <div className="text-lg font-bold">{item.title}</div>
                      <div className="text-xs">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Stack>
        </Box>
      </Stack>
    </Section>
  );
}
