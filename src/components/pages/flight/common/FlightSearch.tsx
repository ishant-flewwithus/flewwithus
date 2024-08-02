"use client";
import Image from "next/image";
import PlaneSvg from "@/assets/plane.svg";
import { ReactNode, SVGProps, useRef } from "react";
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
import { DEFAULT_CONTENT_GAP } from "@/constants/style.constant";
import Box from "@/components/generic/Box";
import { LuSearch } from "react-icons/lu";
import { MdFlightTakeoff } from "react-icons/md";
import { Airport } from "@/models/Flight";
import AirportPicker from "../common/AirportPicker";
import DatePicker from "@/components/generic/DatePicker";
import { addDays, format, getDate } from "date-fns";
import { GrAdd, GrSubtract } from "react-icons/gr";
import Popover from "@/components/generic/Popover";
import Autocomplete from "@/components/generic/Autocomplete";
import useSWR from "swr";
import * as AirportApi from "@/network/flights/airport";

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

const flightClassOptions = ["Economy", "Premium Economy", "Business"];

interface FlightConfigCounterProps {
  title: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const FlightConfigCounter = ({
  title,
  count,
  setCount,
}: FlightConfigCounterProps) => {
  return (
    <div className="col-span-4 select-none rounded-md border border-gray-300 px-6 py-2">
      <div className="text-center text-lg font-semibold">{title}</div>
      <div className="border-b-2 pb-2 text-center text-xs font-semibold">
        On the day of travel
      </div>
      <div className="mt-2 flex items-center justify-around">
        <div
          className="cursor-pointer p-2"
          onClick={() => {
            if (count > 0) {
              setCount(count - 1);
            }
          }}
        >
          <GrSubtract size={13} />
        </div>
        <div className="text-2xl font-medium">{count}</div>
        <div
          className="cursor-pointer p-2"
          onClick={() => {
            if (count < 9) {
              setCount(count + 1);
            }
          }}
        >
          <GrAdd size={13} />
        </div>
      </div>
    </div>
  );
};

export default function FlightSearch() {
  const pathname = usePathname();

  const [flightMode, setFlightMode] = useState("roundtrip");

  const [fromAirport, setFromAirport] = useState<Airport>();
  const [toAirport, setToAirport] = useState<Airport>();

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(addDays(new Date(), 7));

  const [showFlightConfigDialog, setShowFlightConfigDialog] = useState(false);

  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  const [flightClass, setFlightClass] = useState("Premium Economy");

  const swapAirports = () => {
    let temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
  };

  const {
    data: airports,
    isLoading,
    error,
    mutate,
  } = useSWR("airports", AirportApi.getAirports);

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
            {/* <AirportPicker
              airport={fromAirport}
              setAirport={setFromAirport}
              label="From"
            /> */}

            <div className="w-full cursor-pointer self-stretch">
              {/* FROM AIRPORT */}
              <Autocomplete
                label="From"
                caption="POPULAR CITIES"
                trigger={(selectedItem) => (
                  <div className="relative">
                    <div>
                      <div className="rounded-xl border border-gray-300 p-4">
                        <div className="text-sm font-medium">From</div>
                        <div className="mt-2 line-clamp-1 text-lg font-bold">
                          {selectedItem?.CITYNAME || "Select"}
                        </div>

                        <div className="line-clamp-2 h-[2rem] text-xs font-light text-textbody">
                          {selectedItem
                            ? selectedItem.AIRPORTNAME +
                              " , " +
                              selectedItem.CITYNAME +
                              " , " +
                              selectedItem.COUNTRYNAME
                            : "Airport"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                data={airports || []}
                renderContent={(airport) => (
                  <div className="mt-2 flex cursor-pointer items-center justify-between rounded-md px-2 py-1 hover:bg-gray-100">
                    <div className="flex gap-3">
                      <div>
                        <MdFlightTakeoff size={20} />
                      </div>
                      <div>
                        <div className="font-bold">{airport?.CITYNAME}</div>
                        <div>{airport?.AIRPORTNAME}</div>
                      </div>
                    </div>
                    <div>{airport?.AIRPORTCODE}</div>
                  </div>
                )}
                value={fromAirport}
                setValue={setFromAirport}
              />
            </div>

            {/* AiRPORT SWAP BUTTON */}
            <div
              className="m-2 flex items-center justify-center"
              onClick={() => swapAirports()}
            >
              <Image
                src={SwitchButton}
                width={30}
                height={30}
                alt="Switch flights"
                className="mx-4 scale-[0.7] transform cursor-pointer lg:scale-[1]"
              />
            </div>

            <div className="w-full cursor-pointer self-stretch">
              {/* TO AIRPORT */}
              <Autocomplete
                label="To"
                caption="POPULAR CITIES"
                trigger={(selectedItem) => (
                  <div className="relative">
                    <div>
                      <div className="rounded-xl border border-gray-300 p-4">
                        <div className="text-sm font-medium">To</div>
                        <div className="mt-2 line-clamp-1 text-lg font-bold">
                          {selectedItem?.CITYNAME || "Select"}
                        </div>

                        <div className="line-clamp-2 h-[2rem] text-xs font-light text-textbody">
                          {selectedItem
                            ? selectedItem.AIRPORTNAME +
                              " , " +
                              selectedItem.CITYNAME +
                              " , " +
                              selectedItem.COUNTRYNAME
                            : "Airport"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                data={airports || []}
                renderContent={(airport) => (
                  <div className="mt-2 flex cursor-pointer items-center justify-between rounded-md px-2 py-1 hover:bg-gray-100">
                    <div className="flex gap-3">
                      <div>
                        <MdFlightTakeoff size={20} />
                      </div>
                      <div>
                        <div className="font-bold">{airport?.CITYNAME}</div>
                        <div>{airport?.AIRPORTNAME}</div>
                      </div>
                    </div>
                    <div>{airport?.AIRPORTCODE}</div>
                  </div>
                )}
                value={toAirport}
                setValue={setToAirport}
              />
            </div>
          </div>

          {/* DEPART AND RETURN */}

          <div className="flex w-full items-center justify-between self-stretch lg:w-[33%]">
            <div className="w-full cursor-pointer self-stretch rounded-xl border border-gray-300 p-4">
              <DatePicker
                value={fromDate}
                setValue={setFromDate}
                trigger={(item) => (
                  <div>
                    <div className="text-sm font-medium">Depart</div>
                    <div className="mt-2 line-clamp-1 text-lg font-bold">
                      {getDate(item!)}
                    </div>
                    <div className="text-xs font-light text-textbody">
                      {format(item!, "MMM yyyy, EE")}
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="m-2 flex h-10 w-14 items-center justify-center lg:w-0"></div>

            <div className="w-full cursor-pointer self-stretch rounded-xl border border-gray-300 p-4">
              <DatePicker
                value={toDate}
                setValue={setToDate}
                trigger={(item) => (
                  <div>
                    <div className="text-sm font-medium">Return</div>
                    <div className="mt-2 line-clamp-1 text-lg font-bold">
                      {getDate(item!)}
                    </div>
                    <div className="text-xs font-light text-textbody">
                      {format(item!, "MMM yyyy, EE")}
                    </div>
                  </div>
                )}
              />
            </div>
          </div>

          {/* TRAVELLER AND CABIN CLASS */}
          {/* <Popover
            containerClassname="w-full cursor-pointer self-stretch rounded-xl border border-gray-300 p-4 lg:w-[17%]"
            appearContent={
              <div className="">
                <div className="text-sm font-medium">
                  Travelers & Cabin Class
                </div>
                <div className="mt-2 line-clamp-1 text-lg font-bold"></div>
                <div className="text-xs font-light text-textbody">
                  1 Adult, Economy
                </div>
              </div>
            }
            open={showFlightConfigDialog}
            setOpen={setShowFlightConfigDialog}
          >
            <div className="w-[760px] p-6">
              <div className="grid grid-cols-12 gap-4">
                <FlightConfigCounter
                  title="ADULTS (12y+)"
                  count={adultCount}
                  setCount={setAdultCount}
                />
                <FlightConfigCounter
                  title="CHILDREN (2-12y)"
                  count={childrenCount}
                  setCount={setChildrenCount}
                />
                <FlightConfigCounter
                  title="INFANTS (0-2y)"
                  count={infantCount}
                  setCount={setInfantCount}
                />
              </div>
              <div>
                <div className="mt-4 text-lg font-semibold">
                  CHOOSE TRAVEL CLASS
                </div>
                <div>
                  <div className="mt-2 inline-flex rounded-full bg-gray-200">
                    {flightClassOptions?.map((item, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer rounded-full p-3 text-xs ${flightClass === item ? "bg-primary-500 text-onprimary hover:bg-primary-500" : "hover:bg-gray-300"}`}
                        onClick={() => setFlightClass(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Popover> */}

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