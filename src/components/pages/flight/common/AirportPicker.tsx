"use client";
import Popover from "@/components/generic/Popover";
import { Airport } from "@/models/Flight";
import { LuSearch } from "react-icons/lu";
import { MdFlightTakeoff } from "react-icons/md";
import useSWR from "swr";
import * as AirportApi from "@/network/flights/airport";
import { useEffect, useRef, useState } from "react";

interface AirportPickerProps {
  airport?: Airport;
  setAirport: React.Dispatch<React.SetStateAction<Airport | undefined>>;
  label: string;
}

export default function AirportPicker({
  airport,
  setAirport,
  label,
}: AirportPickerProps) {
  const [show, setShow] = useState(false);

  const togglePopover = () => {
    setShow(!show);
  };

  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  const {
    data: airports,
    isLoading,
    error,
    mutate,
  } = useSWR("airports", AirportApi.getAirports);

  return (
    <div className="w-full cursor-pointer self-stretch">
      <div className="relative">
        <div onClick={togglePopover} className="">
          <div className="rounded-xl border border-gray-300 p-4">
            <div className="text-sm font-medium">{label}</div>
            <div className="mt-2 line-clamp-1 text-lg font-bold">
              {airport ? airport.CITYNAME : "Select"}
            </div>

            <div className="line-clamp-2 h-[2rem] text-xs font-light text-textbody">
              {airport
                ? airport.AIRPORTNAME +
                  " , " +
                  airport.CITYNAME +
                  " , " +
                  airport.COUNTRYNAME
                : "Airport"}
            </div>
          </div>
        </div>
        {show && (
          <div
            ref={popupRef}
            className="absolute left-0 top-0 z-20 mt-10 rounded-lg bg-white shadow-[0_4px_4px_4px_rgba(0,0,0,0.11)]"
          >
            <div className="w-[300px] md:w-[350px]">
              <div className="flex items-center gap-2 rounded-b-3xl p-3 shadow-md">
                <div>
                  <LuSearch size={20} />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={label}
                    className="w-full border-none outline-none"
                  />
                </div>
              </div>
              <div className="p-2">
                <div className="text-base text-gray-600">POPULAR CITIES</div>
                <div className="mt-2 h-[300px] overflow-y-auto scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-gray-300 scrollbar-track-rounded-full">
                  {airports?.map((item, index) => (
                    <div
                      className="mt-2 flex cursor-pointer items-center justify-between rounded-md px-2 py-1 hover:bg-gray-100"
                      key={index}
                      onClick={() => {
                        setAirport(item);
                        setShow(false);
                      }}
                    >
                      <div className="flex gap-3">
                        <div>
                          <MdFlightTakeoff size={20} />
                        </div>
                        <div>
                          <div className="font-bold">{item.CITYNAME}</div>
                          <div>{item.AIRPORTNAME}</div>
                        </div>
                      </div>
                      <div>{item.AIRPORTCODE}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
