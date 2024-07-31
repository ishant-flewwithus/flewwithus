"use client";
import Page from "@/components/app/Page";
import Box from "@/components/generic/Box";
import FormInputCheckbox from "@/components/generic/FormInputCheckbox";
import Slider from "@/components/generic/Slider";
import Stack from "@/components/generic/Stack";
import FlightSearch from "@/components/pages/flight/home/FlightSearch";
import { useState } from "react";
import MorningEnabledIcon from "@/assets/morning_enabled.svg";
import MorningDisabledIcon from "@/assets/morning_disabled.svg";
import NoonEnabledIcon from "@/assets/noon_enabled.svg";
import NoonDisabledIcon from "@/assets/noon_disabled.svg";
import EveningEnabledIcon from "@/assets/evening_enabled.svg";
import EveningDisabledIcon from "@/assets/evening_disabled.svg";
import NightEnabledIcon from "@/assets/night_enabled.svg";
import NightDisabledIcon from "@/assets/night_disabled.svg";
import Image from "next/image";

export default function FlightSearchPage() {
  const baggageFilterOptions = [
    {
      title: "Flights with Check-in Baggage",
      value: "filter-baggage",
    },
  ];

  const popularFilterOptions = [
    {
      title: "Non-Stop",
      value: "filter-nonstop",
    },
    {
      title: "IndiGo",
      value: "filter-indigo",
    },
    {
      title: "Morning Departures",
      value: "filter-morning-departure",
    },
    {
      title: "Late Departures",
      value: "filter-late-departure",
    },
    {
      title: "Late Departures",
      value: "filter-late-departure",
    },
  ];

  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(0);
  const [flightTimeRange, setFlightTimeRange] = useState("morning");

  const flightFilterOptions = [
    {
      title: "IndiGo",
      value: "flight-indigo",
    },
    {
      title: "Air India",
      value: "flight-airindia",
    },
    {
      title: "Vistara",
      value: "flight-vistara",
    },
    {
      title: "SpiceJet",
      value: "flight-spicejet",
    },
  ];

  interface FormBoxProps {
    title: String;
    children: React.ReactNode;
  }

  const FormBox = ({ children, title }: FormBoxProps) => {
    return (
      <div className="shadow-[0_4px_4px_0px_rgba(202, 212, 215, 0.25)] rounded-xl bg-white p-4">
        <Stack direction="vertical" gap={20}>
          <div className="text-xl font-semibold">{title}</div>
          {children}
        </Stack>
      </div>
    );
  };

  interface FlightTimeFilterButtonProps {
    enabledIcon: string;
    disabledIcon: string;
    iconWidth: number;
    iconHeight: number;
    label: string;
    value: string;
  }

  const FlightTimeFilterButton = ({
    label,
    enabledIcon,
    disabledIcon,
    value,
    iconWidth,
    iconHeight,
  }: FlightTimeFilterButtonProps) => {
    return (
      <div className="cursor-pointer" onClick={() => setFlightTimeRange(value)}>
        <div className="mb-2 flex h-12 items-end justify-center">
          <Image
            src={flightTimeRange === value ? enabledIcon : disabledIcon}
            alt="morning filter"
            width={iconWidth}
            height={iconHeight}
          />
        </div>
        <div className="text-center text-xs font-semibold">{label}</div>
      </div>
    );
  };

  const flightsDummyData = [
    {
      title: "IndiGo",
      code: "6E 477",
      startTime: "21:30",
      endTime: "12:30",
      duration: "02h 30m",
      nonStop: true,
      from: "New Delhi, India",
      to: "Karachi, Pakistan",
      price: "₹ 16,040",
    },
    {
      title: "IndiGo",
      code: "6E 477",
      startTime: "21:30",
      endTime: "12:30",
      duration: "02h 30m",
      nonStop: true,
      from: "New Delhi, India",
      to: "Karachi, Pakistan",
      price: "₹ 16,040",
    },
    {
      title: "IndiGo",
      code: "6E 477",
      startTime: "21:30",
      endTime: "12:30",
      duration: "02h 30m",
      nonStop: true,
      from: "New Delhi, India",
      to: "Karachi, Pakistan",
      price: "₹ 16,040",
    },
    {
      title: "IndiGo",
      code: "6E 477",
      startTime: "21:30",
      endTime: "12:30",
      duration: "02h 30m",
      nonStop: true,
      from: "New Delhi, India",
      to: "Karachi, Pakistan",
      price: "₹ 16,040",
    },
    {
      title: "IndiGo",
      code: "6E 477",
      startTime: "21:30",
      endTime: "12:30",
      duration: "02h 30m",
      nonStop: true,
      from: "New Delhi, India",
      to: "Karachi, Pakistan",
      price: "₹ 16,040",
    },
  ];

  return (
    <Page headerChild={<FlightSearch />} overlapChildrenOverHeader={false}>
      <div className="grid grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="col-span-3">
          <Stack direction="vertical" gap={20}>
            {/* BAGGAGE FILTERS */}
            <FormBox title="Check-in Baggage Filter">
              {baggageFilterOptions?.map((item, index) => (
                <FormInputCheckbox key={index} label={item.title} />
              ))}
            </FormBox>

            {/* POPULAR FILTERS */}
            <FormBox title="Popular Filters">
              {popularFilterOptions?.map((item, index) => (
                <FormInputCheckbox key={index} label={item.title} />
              ))}
            </FormBox>

            {/* PRICE FILTERS */}
            <FormBox title="One Way Price">
              <div>
                <Slider defaultValue={[33]} max={100} step={1} />
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm">₹ 1000</div>
                  <div className="text-sm">₹ 5000</div>
                </div>
              </div>
            </FormBox>

            {/* DEPARTURE FILTER */}
            <FormBox title="Departure Time">
              <div className="flex items-center gap-4">
                <FlightTimeFilterButton
                  label="6am - 12pm"
                  enabledIcon={MorningEnabledIcon}
                  disabledIcon={MorningDisabledIcon}
                  iconWidth={80}
                  iconHeight={80}
                  value="morning"
                />
                <FlightTimeFilterButton
                  label="12am - 6pm"
                  enabledIcon={NoonEnabledIcon}
                  disabledIcon={NoonDisabledIcon}
                  iconWidth={40}
                  iconHeight={40}
                  value="noon"
                />
                <FlightTimeFilterButton
                  label="6pm - 12am"
                  enabledIcon={EveningEnabledIcon}
                  disabledIcon={EveningDisabledIcon}
                  iconWidth={95}
                  iconHeight={95}
                  value="evening"
                />
                <FlightTimeFilterButton
                  label="12am - 6pm"
                  enabledIcon={NightEnabledIcon}
                  disabledIcon={NightDisabledIcon}
                  iconWidth={35}
                  iconHeight={35}
                  value="night"
                />
              </div>
            </FormBox>

            {/* FLIGHT FILTERS */}
            <FormBox title="Airlines">
              {flightFilterOptions?.map((item, index) => (
                <FormInputCheckbox key={index} label={item.title} />
              ))}
            </FormBox>
          </Stack>
        </div>
        {/* RIGHT COLUMN */}
        <div className="col-span-9">
          <div className="text-2xl">
            Flights from New Delhi to Bengaluru{" "}
            <span className="font-semibold">( 20+ Flight )</span>
          </div>
          <div>
            {flightsDummyData?.map((item, index) => (
              <div
                className="mt-4 flex items-center justify-between rounded-md bg-onprimary p-6 shadow-sm"
                key={index}
              >
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <Image
                      src="/indigo_logo.png"
                      width={50}
                      height={50}
                      alt="indigo"
                    />
                  </div>
                  <div>
                    <div className="text-xl font-semibold">{item?.title}</div>
                    <div>{item?.code}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xl font-semibold">{item?.startTime}</div>
                  <div>{item?.from}</div>
                </div>

                <div>
                  <div className="text-xl font-semibold">{item?.endTime}</div>
                  <div>{item?.to}</div>
                </div>

                <div>
                  <div className="text-xs border-b-2 border-b-primary-500 pb-2">
                    {item?.duration}
                  </div>
                  <div className="text-xs pt-2">
                    Non-Stop
                  </div>
                </div>

                <div>
                  <div className="text-xl font-semibold">{item?.price}</div>
                  <div>per adult</div>
                </div>

                <div>
                  <div className="cursor-pointer rounded-full bg-primary-500 px-6 py-1 text-onprimary hover:bg-primary-600">
                    View Prices
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}
