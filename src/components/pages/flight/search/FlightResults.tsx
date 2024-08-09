"use client";
import CircularProgressBar from "@/components/generic/CircularProgress";
import { Airport, FlightSearchResult } from "@/models/Flight";
import { formatMinutes } from "@/util/dateFormatter";
import { format } from "date-fns";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoFilterOutline } from "react-icons/io5";
import { MdFlightTakeoff } from "react-icons/md";

interface FlightResultsProps {
  setShowFiltersOnMobile: React.Dispatch<React.SetStateAction<boolean>>;
  flights: FlightSearchResult[];
  loading: boolean;
  fromCity: string | null;
  toCity: string | null;
}

export default function FlightResults({
  setShowFiltersOnMobile,
  flights,
  loading,
  fromCity,
  toCity,
}: FlightResultsProps) {
  return (
    <div className="col-span-12 xl:col-span-9">
      <div className="flex items-center justify-between">
        <div className="text-2xl">
          {loading ? (
            <>
              Looking for Flights from {fromCity} to {toCity}...
            </>
          ) : (
            <>
              Flights from {fromCity} to {toCity}{" "}
              <span className="font-medium">( {flights?.length} Flights )</span>
            </>
          )}
        </div>
        <div>
          <div
            className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-onprimary p-3 shadow-sm xl:hidden"
            onClick={() => setShowFiltersOnMobile(true)}
          >
            <IoFilterOutline size={40} />
          </div>
        </div>
      </div>
      <div className="mt-4 overflow-y-auto scrollbar-thin xl:h-[150vh]">
        {loading ? (
          <div className="my-4 flex w-full items-center justify-center">
            <CircularProgressBar />
          </div>
        ) : (
          <div>
            {flights?.map((item, index) => (
              <div key={index}>
                {/* PC ITEM */}
                <div className="mt-4 hidden rounded-md bg-onprimary p-6 shadow-sm lg:grid lg:grid-cols-12 lg:gap-6">
                  <div className="col-span-2 flex gap-4">
                    <div className="flex items-center">
                      <div className="w-50 h-50 rounded-xl bg-primary-500 p-2 text-white">
                        <MdFlightTakeoff size={30} />
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold">
                        {item.Segments[0][0].Airline.AirlineName}
                      </div>
                      <div>{item.Segments[0][0].Airline.FlightNumber}</div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="text-xl font-semibold">
                      {format(item.Segments[0][0].Origin.DepTime, "hh:mm aa")}
                    </div>
                    <div className="text-sm">
                      {item.Segments[0][0].Origin.Airport.AirportName}{" "}
                      {item.Segments[0][0].Origin.Airport.CityName}{" "}
                      {item.Segments[0][0].Origin.Airport.CountryName}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="text-xl font-semibold">
                      {format(
                        item.Segments[0][0].Destination.ArrTime,
                        "hh:mm aa",
                      )}
                    </div>
                    <div className="text-sm">
                      {item.Segments[0][0].Destination.Airport.AirportName}{" "}
                      {item.Segments[0][0].Destination.Airport.CityName}{" "}
                      {item.Segments[0][0].Destination.Airport.CountryName}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="border-b-4 border-b-primary-500 pb-2 text-center text-sm">
                      {formatMinutes(item.Segments[0][0].Duration)}
                    </div>
                    <div className="pt-2 text-center text-sm">Non-Stop</div>
                  </div>

                  <div className="col-span-2">
                    <div className="text-xl font-semibold">
                      {item?.Fare?.Currency} {item?.Fare?.OfferedFare}
                    </div>
                    <div className="text-sm">per adult</div>
                  </div>

                  <div className="col-span-2">
                    <div className="cursor-pointer rounded-full bg-primary-500 px-6 py-1 text-onprimary hover:bg-primary-600">
                      View Prices
                    </div>
                  </div>
                </div>
                {/* MOBILE ITEM */}
                <div className="mt-4 block rounded-md bg-onprimary p-6 shadow-sm lg:hidden">
                  <div className="text-center text-2xl font-semibold">
                    {item.Segments[0][0].Airline.AirlineName}
                  </div>
                  <div className="text-center text-sm font-medium">
                    {item.Segments[0][0].Airline.FlightNumber}
                  </div>
                  <div className="mt-6 grid grid-cols-12 gap-4 text-center">
                    <div className="col-span-4">
                      <div className="text-lg font-bold">
                        {format(item.Segments[0][0].Origin.DepTime, "hh:mm aa")}
                      </div>
                      <div className="text-sm">
                        {item.Segments[0][0].Origin.Airport.AirportName}{" "}
                        {item.Segments[0][0].Origin.Airport.CityName}{" "}
                        {item.Segments[0][0].Origin.Airport.CountryName}
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="border-b-2 border-b-green-500 pb-1 text-sm font-bold">
                        {formatMinutes(item.Segments[0][0].Duration)}
                      </div>
                      <div className="pt-2 text-xs font-medium">1 STOP</div>
                    </div>
                    <div className="col-span-4">
                      <div className="text-lg font-bold">
                        {format(
                          item.Segments[0][0].Destination.ArrTime,
                          "hh:mm aa",
                        )}
                      </div>
                      <div className="text-sm">
                        {" "}
                        {
                          item.Segments[0][0].Destination.Airport.AirportName
                        }{" "}
                        {item.Segments[0][0].Destination.Airport.CityName}{" "}
                        {item.Segments[0][0].Destination.Airport.CountryName}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid cursor-pointer grid-cols-12 rounded-full bg-primary-500 px-4 py-2 text-onprimary">
                    <div className="col-span-4 text-start font-semibold line-through opacity-65">
                      {item?.Fare?.Currency} {item?.Fare?.OfferedFare}
                    </div>
                    <div className="col-span-4 text-end font-semibold">
                      {item?.Fare?.Currency} {item?.Fare?.OfferedFare}
                    </div>
                    <div className="col-span-4 flex items-center justify-end">
                      <FaArrowRightLong size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
