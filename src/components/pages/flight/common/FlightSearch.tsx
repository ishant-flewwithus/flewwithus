"use client";
import Image from "next/image";
import Stack from "@/components/generic/Stack";
import FlightIcon from "@/assets/plane.svg";
import CabIcon from "@/assets/cabs.svg";
import HotelIcon from "@/assets/hotels.svg";
import RoundedButton from "@/components/generic/RoundedButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SwitchButton from "@/assets/switch_button.svg";
import StudentIcon from "@/assets/student_15399518 1.svg";
import SeniorCitizenIcon from "@/assets/grandfather_522280 1.svg";
import ArmedForcesIcon from "@/assets/user-pilot-tie_9585967 1.svg";
import DoctorIcon from "@/assets/user-md_9856850 1.svg";
import { DEFAULT_CONTENT_GAP } from "@/constants/style.constant";
import Box from "@/components/generic/Box";
import { MdFlightTakeoff } from "react-icons/md";
import { AirportDBItem } from "@/models/Flight";
import DatePicker from "@/components/generic/DatePicker";
import { addDays, format, getDate, isValid, parseISO } from "date-fns";
import { GrAdd, GrSubtract } from "react-icons/gr";
import Popover from "@/components/generic/Popover";
import AutocompleteWithApi from "@/components/generic/AutocompleteWithApi";
import { toast } from "react-toastify";
import {
  isAirportDBItem,
  validateFlightSearchParams,
} from "@/util/validation/validateFlight";
import CircularProgressBar from "@/components/generic/CircularProgress";
import { isValidJSON } from "@/util/validation/validateString";

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
    title: "One way",
    value: "1",
  },
  {
    title: "Round trip",
    value: "2",
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

const flightClassOptions = [
  {
    title: "Economy",
    value: 1,
  },
  {
    title: "Premium Economy",
    value: 2,
  },
  {
    title: "Business",
    value: 3,
  },
];

export default function FlightSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [flightMode, setFlightMode] = useState("1");

  const [fromAirport, setFromAirport] = useState<AirportDBItem>();
  const [toAirport, setToAirport] = useState<AirportDBItem>();

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(addDays(new Date(), 7));

  const [showFlightConfigDialog, setShowFlightConfigDialog] = useState(false);

  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  const [flightClass, setFlightClass] = useState(flightClassOptions[0]);

  const [searching, setSearching] = useState(false);

  const [selectedFlightOffer, setSelectedFlightOffer] = useState<
    string | undefined
  >();

  const swapAirports = () => {
    let temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
  };

  const handleFlightSearch = async () => {
    try {
      setSearching(true);
      validateFlightSearchParams({
        AdultCount: adultCount.toString(),
        ChildCount: childrenCount.toString(),
        InfantCount: infantCount.toString(),
        JourneyType: flightMode.toString(),
        Origin: fromAirport?.AIRPORTCODE || "",
        Destination: toAirport?.AIRPORTCODE || "",
        DepartureDate: fromDate.toISOString(),
        ArrivalDate: toDate.toISOString(),
        FlightCabinClass: flightClass.value.toString(),
        FromCity: fromAirport?.CITYNAME || "",
        ToCity: toAirport?.CITYNAME || "",
      });

      // In TBO API, fromDate = departureDate and arrivalDate; and toDate = returnDepartureDate and returnArrivalDate
      if (flightMode === "1") {
        // One way trip
        router.push(
          `/flights/search?AdultCount=${adultCount}&ChildCount=${childrenCount}&InfantCount=${infantCount}&JourneyType=${flightMode}&Origin=${fromAirport?.AIRPORTCODE}&Destination=${toAirport?.AIRPORTCODE}&FlightCabinClass=${flightClass.value}&DepartureDate=${format(fromDate, "yyyy-MM-dd")}&ArrivalDate=${format(fromDate, "yyyy-MM-dd")}&FromCity=${fromAirport?.CITYNAME}&ToCity=${toAirport?.CITYNAME}&FromAirport=${JSON.stringify(fromAirport)}&ToAirport=${JSON.stringify(toAirport)}`,
        );
      } else if (flightMode === "2") {
        // Return trip
        router.push(
          `/flights/search?AdultCount=${adultCount}&ChildCount=${childrenCount}&InfantCount=${infantCount}&JourneyType=${flightMode}&Origin=${fromAirport?.AIRPORTCODE}&Destination=${toAirport?.AIRPORTCODE}&FlightCabinClass=${flightClass.value}&DepartureDate=${format(fromDate, "yyyy-MM-dd")}&ArrivalDate=${format(fromDate, "yyyy-MM-dd")}&FromCity=${fromAirport?.CITYNAME}&ToCity=${toAirport?.CITYNAME}&ReturnArrivalDate=${toDate}&ReturnDepartureDate=${toDate}&ReturnFlightCabinClass=${flightClass.value}&FromAirport=${JSON.stringify(fromAirport)}&ToAirport=${JSON.stringify(toAirport)}`,
        );
      } else {
        throw new Error("Invalid journey type");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setSearching(false);
    }
  };

  const setupDefaultFaluesFromSearchParams = () => {
    const params = {
      AdultCount: searchParams.get("AdultCount") || "0",
      ChildCount: searchParams.get("ChildCount") || "0",
      InfantCount: searchParams.get("InfantCount") || "0",
      JourneyType: searchParams.get("JourneyType") || "0",
      Origin: searchParams.get("Origin") || "",
      Destination: searchParams.get("Destination") || "",
      DepartureDate: searchParams.get("DepartureDate") || "",
      ArrivalDate: searchParams.get("ArrivalDate") || "",
      FromCity: searchParams.get("FromCity") || "",
      ToCity: searchParams.get("ToCity") || "",
      FlightCabinClass: searchParams.get("FlightCabinClass") || "1",
      ReturnDepartureDate: searchParams.get("ReturnDepartureDate") || "1",
      ReturnArrivalDate: searchParams.get("ReturnArrivalDate") || "1",
      FromAirport: searchParams.get("FromAirport") || "{}",
      ToAirport: searchParams.get("ToAirport") || "{}",
    };
    setAdultCount(parseInt(params.AdultCount) || 1);
    setChildrenCount(parseInt(params.ChildCount) || 0);
    setInfantCount(parseInt(params.InfantCount) || 0);
    setFlightMode(params.JourneyType || "1");

    let _fromAirport = params.FromAirport;
    let _isFromAirportAValidJSON = isValidJSON(_fromAirport);
    let _isFromAirportAAirportDBItem = isAirportDBItem(
      _isFromAirportAValidJSON,
    );

    setFromAirport(
      _isFromAirportAAirportDBItem ? JSON.parse(params.FromAirport) : undefined,
    );

    let _toAirport = params.ToAirport;
    let _isToAirportAValidJSON = isValidJSON(_toAirport);
    let _isToAirportAAirportDBItem = isAirportDBItem(_isToAirportAValidJSON);

    setToAirport(
      _isToAirportAAirportDBItem ? JSON.parse(params.ToAirport) : undefined,
    );

    setFromDate(
      isValid(parseISO(params.ArrivalDate))
        ? parseISO(params.ArrivalDate)
        : new Date(),
    );
    setToDate(
      isValid(parseISO(params.ReturnArrivalDate))
        ? parseISO(params.ReturnArrivalDate)
        : addDays(new Date(), 7),
    );
    setFlightClass(
      flightClassOptions.find((f) => String(f.value) === params.JourneyType) ||
        flightClassOptions[0],
    );
  };

  useEffect(() => {
    setupDefaultFaluesFromSearchParams();
  }, [searchParams]);

  return (
    <Box>
      <Stack direction="vertical" gap={DEFAULT_CONTENT_GAP}>
        {/* FLIGHTS, HOTELS, CABS BUTTONS */}
        <div className="flex items-center justify-center gap-4 lg:justify-start">
          {navLinks?.map((item, index) => (
            <RoundedButton
              key={index}
              title={item.title}
              isSelected={
                "/" +
                  String(pathname)
                    .replace(/^\/|\/$/g, "")
                    .split("/")[0] ===
                item.navigateUrl
              } // /flight/search === /flight
              icon={item.icon}
              navigateUrl={item.navigateUrl}
              transparentMode={false}
              hideLabelOnSmallScreen={true}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="hidden text-2xl font-bold lg:block">
            Gateway To Hassle-Free Booking
          </div>
          <div className="mx-auto inline-block rounded-full bg-green-600 px-8 py-2 text-center text-xs font-medium text-white md:text-sm lg:mx-0">
            NO CONVINIENCE FEE, NO PRICE HIKE
          </div>
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
                readOnly={true}
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
            <div className="w-full cursor-pointer self-stretch">
              {/* FROM AIRPORT */}
              <AutocompleteWithApi<AirportDBItem>
                fetchUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/home/airportbycode/?code=`}
                onSelect={(airport) => {
                  setFromAirport(airport);
                }}
                placeholder="Search for airports"
                trigger={(selectedItem) => (
                  <div className="relative">
                    <div>
                      <div className="rounded-xl border border-gray-300 p-4">
                        <div className="text-sm font-medium">From</div>
                        <div className="mt-2 line-clamp-1 text-lg font-bold">
                          {fromAirport?.CITYNAME || "Select"}
                        </div>

                        <div className="line-clamp-2 h-[2rem] text-xs font-light text-textbody">
                          {fromAirport
                            ? fromAirport?.AIRPORTNAME +
                              " , " +
                              fromAirport?.CITYNAME +
                              " , " +
                              fromAirport?.COUNTRYNAME
                            : "Airport"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                    <div className="ml-5">{airport?.AIRPORTCODE}</div>
                  </div>
                )}
                label1="From"
                label2="POPULAR CITIES"
              />
            </div>

            {/* AiRPORT SWAP BUTTON */}
            <div
              className="flex w-20 items-center justify-center"
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
              <AutocompleteWithApi<AirportDBItem>
                fetchUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/home/airportbycode/?code=`}
                onSelect={(airport) => {
                  setToAirport(airport);
                }}
                placeholder="Search for airports"
                trigger={(selectedItem) => (
                  <div className="relative">
                    <div>
                      <div className="rounded-xl border border-gray-300 p-4">
                        <div className="text-sm font-medium">To</div>
                        <div className="mt-2 line-clamp-1 text-lg font-bold">
                          {toAirport?.CITYNAME || "Select"}
                        </div>

                        <div className="line-clamp-2 h-[2rem] text-xs font-light text-textbody">
                          {toAirport
                            ? toAirport?.AIRPORTNAME +
                              " , " +
                              toAirport?.CITYNAME +
                              " , " +
                              toAirport?.COUNTRYNAME
                            : "Airport"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                    <div className="ml-5">{airport?.AIRPORTCODE}</div>
                  </div>
                )}
                label1="To"
                label2="POPULAR CITIES"
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

            {flightMode === "2" && (
              <div className="flex h-10 w-20 items-center justify-center p-0 md:p-2 lg:w-0"></div>
            )}

            {flightMode === "2" && (
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
            )}
          </div>

          {/* TRAVELLER AND CABIN CLASS */}
          <div className="w-full cursor-pointer self-stretch rounded-xl border border-gray-300 p-4 lg:w-[17%]">
            <Popover
              trigger={
                <div className="">
                  <div className="text-sm font-medium">
                    Travelers & Cabin Class
                  </div>
                  <div className="mt-2 line-clamp-1 text-lg font-bold"></div>
                  <div className="text-xs font-light text-textbody">
                    {`${adultCount} Adults, ${childrenCount} Children, ${infantCount} Infants, ${flightClass.title}`}
                  </div>
                </div>
              }
              render={
                <div className="p-6">
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

                    <div className="col-span-12 md:col-span-6">
                      <div className="mt-6 text-lg font-semibold">
                        CHOOSE TRAVEL CLASS
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="mt-3 grid grid-cols-12 gap-4 rounded-full bg-onprimary md:inline-flex md:gap-0 md:bg-gray-200">
                          {flightClassOptions?.map((item, index) => (
                            <div
                              key={index}
                              className={`${index == 2 ? "col-span-12" : "col-span-6"} flex cursor-pointer items-center justify-center rounded-full p-3 text-center text-xs ${flightClass.value === item.value ? "bg-primary-500 text-onprimary hover:bg-primary-500" : "bg-gray-200"} text-center`}
                              onClick={() => setFlightClass(item)}
                            >
                              {item.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-12 flex items-end justify-end md:col-span-6">
                      <div
                        onClick={() => setShowFlightConfigDialog(false)}
                        className="w-full cursor-pointer rounded-full bg-primary-500 px-6 py-3 text-center text-onprimary hover:bg-primary-600"
                      >
                        Apply
                      </div>
                    </div>
                  </div>
                </div>
              }
              open={showFlightConfigDialog}
              setOpen={setShowFlightConfigDialog}
            />
          </div>

          {/* SEARCH BUTTON */}
          <button
            onClick={() => handleFlightSearch()}
            className="flex w-full cursor-pointer items-center justify-center self-stretch rounded-full border border-primary-500 bg-primary-500 p-4 text-onprimary hover:bg-primary-600 lg:w-[10%] lg:rounded-xl"
            disabled={searching}
          >
            {searching ? (
              <CircularProgressBar width={2} height={2} />
            ) : (
              "Search"
            )}
          </button>
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
                className={`flex cursor-pointer items-center gap-4 rounded-xl border ${selectedFlightOffer === item.value ? "border-2 border-primary-600" : "border-gray-300"} p-4`}
                onClick={() => {
                  if (selectedFlightOffer === item.value) {
                    setSelectedFlightOffer(undefined);
                  } else {
                    setSelectedFlightOffer(item.value);
                  }
                }}
              >
                <input
                  id={item.value + index}
                  type="checkbox"
                  value={item.value}
                  name="default-radio"
                  className="h-4 w-4 accent-primary-500"
                  checked={selectedFlightOffer === item.value}
                  readOnly={true}
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
    <div className="col-span-12 select-none rounded-md border border-gray-300 px-6 py-2 md:col-span-4">
      <div className="my-1 text-center text-base font-semibold">{title}</div>
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
