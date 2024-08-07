import FormInputCheckbox from "@/components/generic/FormInputCheckbox";
import Slider from "@/components/generic/Slider";
import Stack from "@/components/generic/Stack";
import Image from "next/image";
import { useState } from "react";
import MorningEnabledIcon from "@/assets/morning_enabled.svg";
import MorningDisabledIcon from "@/assets/morning_disabled.svg";
import NoonEnabledIcon from "@/assets/noon_enabled.svg";
import NoonDisabledIcon from "@/assets/noon_disabled.svg";
import EveningEnabledIcon from "@/assets/evening_enabled.svg";
import EveningDisabledIcon from "@/assets/evening_disabled.svg";
import NightEnabledIcon from "@/assets/night_enabled.svg";
import NightDisabledIcon from "@/assets/night_disabled.svg";
import { IoClose } from "react-icons/io5";

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
  flightTimeRange: string;
  setFlightTimeRange: React.Dispatch<React.SetStateAction<string>>;
}

const FlightTimeFilterButton = ({
  label,
  enabledIcon,
  disabledIcon,
  value,
  iconWidth,
  iconHeight,
  flightTimeRange,
  setFlightTimeRange,
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

interface FilterProps {
  showFiltersOnMobile: boolean;
  setShowFiltersOnMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Filters({
  showFiltersOnMobile,
  setShowFiltersOnMobile,
}: FilterProps) {
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

  return (
    <div
      className={`${showFiltersOnMobile ? "fixed" : "hidden"} bottom-0 left-0 right-0 top-0 z-[200] col-span-12 w-screen overflow-y-auto bg-onprimary p-4 xl:col-span-3 xl:block xl:w-auto`}
    >
      <Stack direction="vertical" gap={20}>
        <div className="flex items-center justify-between px-2">
          <div className="text-3xl font-semibold">Filters</div>
          <div
            className="cursor-pointer"
            onClick={() => setShowFiltersOnMobile(false)}
          >
            <IoClose size={25} />
          </div>
        </div>

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
              flightTimeRange={flightTimeRange}
              setFlightTimeRange={setFlightTimeRange}
            />
            <FlightTimeFilterButton
              label="12am - 6pm"
              enabledIcon={NoonEnabledIcon}
              disabledIcon={NoonDisabledIcon}
              iconWidth={40}
              iconHeight={40}
              value="noon"
              flightTimeRange={flightTimeRange}
              setFlightTimeRange={setFlightTimeRange}
            />
            <FlightTimeFilterButton
              label="6pm - 12am"
              enabledIcon={EveningEnabledIcon}
              disabledIcon={EveningDisabledIcon}
              iconWidth={95}
              iconHeight={95}
              value="evening"
              flightTimeRange={flightTimeRange}
              setFlightTimeRange={setFlightTimeRange}
            />
            <FlightTimeFilterButton
              label="12am - 6pm"
              enabledIcon={NightEnabledIcon}
              disabledIcon={NightDisabledIcon}
              iconWidth={35}
              iconHeight={35}
              value="night"
              flightTimeRange={flightTimeRange}
              setFlightTimeRange={setFlightTimeRange}
            />
          </div>
        </FormBox>

        {/* FLIGHT FILTERS */}
        <FormBox title="Airlines">
          {flightFilterOptions?.map((item, index) => (
            <FormInputCheckbox key={index} label={item.title} />
          ))}
        </FormBox>

        <div>
          <div
            className="cursor-pointer rounded-full bg-primary-500 px-4 py-2 text-center text-onprimary xl:hidden"
            onClick={() => setShowFiltersOnMobile(false)}
          >
            Apply
          </div>
        </div>
      </Stack>
    </div>
  );
}
