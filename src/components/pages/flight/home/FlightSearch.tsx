"use client";
import Image from "next/image";
import PlaneSvg from "@/assets/plane.svg";
import { ReactNode, SVGProps } from "react";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Stack from "@/components/generic/Stack";
import FlightIcon from "@/assets/plane.svg";
import CabIcon from "@/assets/cabs.svg";
import HotelIcon from "@/assets/hotels.svg";
import RoundedButton from "@/components/generic/RoundedButton";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SwitchButton from "@/assets/switch_button.svg";
import StudentIcon from "@/assets/student_15399518 1.svg";
import SeniorCitizenIcon from "@/assets/grandfather_522280 1.svg";
import ArmedForcesIcon from "@/assets/user-pilot-tie_9585967 1.svg";
import DoctorIcon from "@/assets/user-md_9856850 1.svg";
import { DEFAULT_CONTENT_GAP } from "@/other/style.constant";
import Box from "@/components/generic/Box";
import { LuSearch } from "react-icons/lu";
import { MdFlightTakeoff } from "react-icons/md";
import { Airport } from "@/models/Flight";
import AirportPicker from "../common/AirportPicker";
import DatePicker, { Calendar } from "@/components/generic/DatePicker";
import { addDays, format, getDate } from "date-fns";

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

const flightModes = [
  {
    title: "Round trip",
    value: "roundtrip",
  },
  {
    title: "One way",
    value: "oneway",
  },
];
const offerOptions = [
  {
    title: "Student",
    description: "Extra discounts / baggage",
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

export default function FlightSearch() {
  const pathname = usePathname();

  const [flightMode, setFlightMode] = useState("roundtrip");

  const [fromAirport, setFromAirport] = useState<Airport>();
  const [toAirport, setToAirport] = useState<Airport>();

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(addDays(new Date(), 7));

  const swapAirports = () => {
    let temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
  };

  return (
    <Box>
      <Stack direction="vertical" gap={DEFAULT_CONTENT_GAP}>
        {/* FLIGHTS, HOTELS, CABS BUTTONS */}
        <div className="flex items-center justify-center gap-4 lg:justify-start">
          {navLinks?.map((item, index) => (
            <RoundedButton
              key={index}
              title={item.title}
              isSelected={pathname === item.navigateUrl}
              icon={item.icon}
              navigateUrl={item.navigateUrl}
              transparentMode={false}
              hideLabelOnSmallScreen={true}
            />
          ))}
        </div>

        {/* DESKTOP HEADING */}
        <div className="hidden text-2xl font-bold lg:block">
          Millions of cheap flights. One simple search.
        </div>

        {/* MOBILE HEADING */}
        <div className="mx-auto block w-full rounded-full bg-green-600 p-2 text-center text-xs font-medium text-white sm:text-sm md:w-1/2 md:text-base lg:hidden">
          NO CONVINIENCE FEE, NO PRICE HIKE
        </div>

        {/* FLIGHT TYPE RADIO BUTTONS */}
        <div className="flex items-center gap-4">
          {flightModes.map((type, index) => (
            <div className="flex items-center" key={index}>
              <input
                id={type.value}
                type="radio"
                value={type.value}
                checked={type.value === flightMode}
                name="flight_mode"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 accent-primary-500"
                onChange={(e) => setFlightMode(e.target.value)}
              />
              <label htmlFor={type.value} className="ms-2 text-sm font-medium">
                {type.title}
              </label>
            </div>
          ))}
        </div>

        {/* FLIGHT CHOOSER */}
        <div className="flex flex-wrap items-center gap-4">
          {/* FROM AND TO */}
          <div className="flex w-full items-center justify-between self-stretch lg:w-[33%]">
            {flightMode === "roundtrip" && (
              <>
                <AirportPicker
                  airport={fromAirport}
                  setAirport={setFromAirport}
                  label="From"
                />
                <div
                  className="m-2 flex h-10 w-10 items-center justify-center"
                  onClick={() => swapAirports()}
                >
                  <Image
                    src={SwitchButton}
                    width={30}
                    height={30}
                    alt="Switch flights"
                    className="mx-4 cursor-pointer"
                  />
                </div>
              </>
            )}

            <AirportPicker
              airport={toAirport}
              setAirport={setToAirport}
              label="To"
            />
          </div>

          {/* DEPART AND RETURN */}

          <div className="flex w-full items-center justify-between self-stretch lg:w-[33%]">
            <DatePicker
              containerClassname="w-full cursor-pointer self-stretch rounded-xl border border-gray-300 p-4"
              appearContent={
                <div>
                  <div className="text-sm font-medium">Depart</div>
                  <div className="mt-2 line-clamp-1 text-lg font-bold">
                    {getDate(fromDate)}
                  </div>
                  <div className="text-xs font-light text-textbody">
                    {format(fromDate, "MMM yyyy, EE")}
                  </div>
                </div>
              }
              date={fromDate}
              setDate={setFromDate}
            />

            <div className="m-2 flex h-10 w-14 items-center justify-center lg:w-0"></div>

            {flightMode === "roundtrip" && (
              <DatePicker
                containerClassname="w-full cursor-pointer self-stretch rounded-xl border border-gray-300 p-4"
                appearContent={
                  <div>
                    <div className="text-sm font-medium">Return</div>
                    <div className="mt-2 line-clamp-1 text-lg font-bold">
                      {getDate(toDate)}
                    </div>
                    <div className="text-xs font-light text-textbody">
                      {format(toDate, "MMM yyyy, EE")}
                    </div>
                  </div>
                }
                date={toDate}
                setDate={setToDate}
              />
            )}
          </div>

          {/* TRAVELLER AND CABIN CLASS */}
          <div className="w-full cursor-pointer self-stretch rounded-xl border border-gray-300 p-4 lg:w-[17%]">
            <div className="text-sm font-medium">Travelers & Cabin Class</div>
            <div className="mt-2 line-clamp-1 text-lg font-bold"></div>
            <div className="text-xs font-light text-textbody">
              1 Adult, Economy
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <Link
            href="/flights/search"
            className="flex w-full cursor-pointer items-center justify-center self-stretch rounded-full border border-primary-500 bg-primary-500 p-4 text-onprimary hover:bg-primary-600 lg:w-[10%] lg:rounded-xl"
          >
            Search
          </Link>
        </div>

        {/* FLIGHT FARE CHOOSER */}
        <div className="hidden items-center gap-4 lg:flex">
          <div>
            <div className="font-bold">Select a special fare</div>
            <div className="text-sm text-textbody">Extra Savings</div>
          </div>
          <div className="flex items-center gap-4">
            {offerOptions.map((item, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-300 p-4"
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
                  <div className="text-xs">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Stack>
    </Box>
  );
}
