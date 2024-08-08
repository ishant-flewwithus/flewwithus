import FormInputCheckbox from "@/components/generic/FormInputCheckbox";
import Slider from "@/components/generic/Slider";
import Stack from "@/components/generic/Stack";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MorningEnabledIcon from "@/assets/MorningEnabledIcon.svg";
import MorningDisabledIcon from "@/assets/MorningDisabledIcon.svg";
import NoonEnabledIcon from "@/assets/NoonEnabledIcon.svg";
import NoonDisabledIcon from "@/assets/NoonDisabledIcon.svg";
import EveningEnabledIcon from "@/assets/EveningEnabledIcon.svg";
import EveningDisabledIcon from "@/assets/EveningDisabledIcon.svg";
import NightEnabledIcon from "@/assets/NightEnabledIcon.svg";
import NightDisabledIcon from "@/assets/NightDisabledIcon.svg";
import { IoClose } from "react-icons/io5";
import {
  AirlineFilter,
  FlightFilter,
  FlightSearchResult,
} from "@/models/Flight";
import { roundUpToNearest500 } from "@/util/math";

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
  flightTimeRange: string | undefined;
  setFlightTimeRange: React.Dispatch<React.SetStateAction<string | undefined>>;
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
    <div
      className="cursor-pointer"
      onClick={() => {
        if (flightTimeRange === value) {
          setFlightTimeRange(undefined);
        } else {
          setFlightTimeRange(value);
        }
      }}
    >
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
  flights: FlightSearchResult[];
  filters: FlightFilter[];
  setFilters: React.Dispatch<React.SetStateAction<FlightFilter[]>>;
  priceFilter: number;
  setPriceFilter: React.Dispatch<React.SetStateAction<number>>;
  maxPriceFilter: number;
  setMaxPriceFilter: React.Dispatch<React.SetStateAction<number>>;
  minPriceFilter: number;
  setMinPriceFilter: React.Dispatch<React.SetStateAction<number>>;
  airlineFilters: AirlineFilter[];
  setAirlineFilters: React.Dispatch<React.SetStateAction<AirlineFilter[]>>;
  flightTimeRange: string | undefined;
  setFlightTimeRange: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function Filters({
  showFiltersOnMobile,
  setShowFiltersOnMobile,
  flights,
  filters,
  setFilters,
  priceFilter,
  setPriceFilter,
  maxPriceFilter,
  setMaxPriceFilter,
  minPriceFilter,
  setMinPriceFilter,
  airlineFilters,
  setAirlineFilters,
  flightTimeRange,
  setFlightTimeRange,
}: FilterProps) {
  return (
    <div
      className={`${showFiltersOnMobile ? "fixed" : "hidden"} bottom-0 left-0 right-0 top-0 z-[200] col-span-12 w-screen overflow-y-auto bg-onprimary p-4 xl:col-span-3 xl:block xl:w-auto`}
    >
      <Stack direction="vertical" gap={20}>
        <div className="flex items-center justify-between px-2">
          <div className="text-3xl font-semibold">Filters</div>
          <div
            className="cursor-pointer lg:hidden"
            onClick={() => setShowFiltersOnMobile(false)}
          >
            <IoClose size={25} />
          </div>
        </div>

        {/* BAGGAGE FILTERS */}

        {/* FILTERS */}
        <FormBox title="Filters">
          {filters?.map((item, index) => (
            <FormInputCheckbox
              key={index}
              label={item.title}
              checked={item.value}
              onChange={(e) =>
                setFilters(
                  filters.map((f) => {
                    if (f.id === item.id) {
                      let updated = { ...f };
                      updated.value = e.target.checked;
                      return updated;
                    } else {
                      let updated = { ...f }; // Uncheck other filters
                      updated.value = false;
                      return updated;
                    }
                  }),
                )
              }
            />
          ))}
        </FormBox>

        {/* PRICE FILTERS */}
        <FormBox title="One Way Price">
          <div>
            <Slider
              min={minPriceFilter}
              max={maxPriceFilter}
              step={500}
              defaultValue={[priceFilter]}
              value={[priceFilter]}
              onValueChange={(val) => setPriceFilter(val[0])}
            />
            <div className="mt-2 flex items-center justify-between">
              <div className="text-sm">₹ {priceFilter}</div>
              <div className="text-sm">₹ {maxPriceFilter}</div>
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
              iconWidth={100}
              iconHeight={100}
              value="morning"
              flightTimeRange={flightTimeRange}
              setFlightTimeRange={setFlightTimeRange}
            />
            <FlightTimeFilterButton
              label="12am - 6pm"
              enabledIcon={NoonEnabledIcon}
              disabledIcon={NoonDisabledIcon}
              iconWidth={100}
              iconHeight={100}
              value="noon"
              flightTimeRange={flightTimeRange}
              setFlightTimeRange={setFlightTimeRange}
            />
            <FlightTimeFilterButton
              label="6pm - 12am"
              enabledIcon={EveningEnabledIcon}
              disabledIcon={EveningDisabledIcon}
              iconWidth={100}
              iconHeight={100}
              value="evening"
              flightTimeRange={flightTimeRange}
              setFlightTimeRange={setFlightTimeRange}
            />
            <FlightTimeFilterButton
              label="12am - 6pm"
              enabledIcon={NightEnabledIcon}
              disabledIcon={NightDisabledIcon}
              iconWidth={100}
              iconHeight={100}
              value="night"
              flightTimeRange={flightTimeRange}
              setFlightTimeRange={setFlightTimeRange}
            />
          </div>
        </FormBox>

        {/* FLIGHT FILTERS */}
        {airlineFilters?.length > 0 && (
          <FormBox title="Airlines">
            {airlineFilters?.map((item, index) => (
              <FormInputCheckbox
                key={index}
                label={item.airline.AirlineName}
                checked={item.isSelected}
                onChange={(e) =>
                  setAirlineFilters(
                    airlineFilters.map((a) => {
                      if (item.airline.AirlineCode === a.airline.AirlineCode) {
                        return {
                          ...a,
                          isSelected: e.target.checked,
                        };
                      } else {
                        return a;
                      }
                    }),
                  )
                }
              />
            ))}
          </FormBox>
        )}

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
