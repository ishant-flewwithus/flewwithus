"use client";
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
          Flights from {fromCity} to {toCity}{" "}
          <span className="font-medium">( {flights?.length} Flights )</span>
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
            <div role="status">
              <svg
                aria-hidden="true"
                className="h-12 w-12 animate-spin fill-primary-500 text-gray-200"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
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
