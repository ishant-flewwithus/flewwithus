"use client";
import CircularProgressBar from "@/components/generic/CircularProgress";
import Dialog from "@/components/generic/Dialog";
import { Airport, FlightDetails } from "@/models/Flight";
import { formatMinutes } from "@/util/dateFormatter";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoFilterOutline } from "react-icons/io5";
import { MdFlightTakeoff } from "react-icons/md";

interface FlightResultsProps {
  setShowFiltersOnMobile: React.Dispatch<React.SetStateAction<boolean>>;
  flights: FlightDetails[];
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
  const [showFareDialog, setShowFareDialog] = useState(false);

  const router = useRouter()

  return (
    <>
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
                <span className="font-medium">
                  ( {flights?.length} Flights )
                </span>
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
                          {item.outBound[0].airlineName}
                        </div>
                        <div>{item.outBound[0].flightNumber}</div>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="text-xl font-semibold">
                        {format(item.outBound[0].arrivalTime, "hh:mm aa")}
                      </div>
                      <div className="text-sm">
                        {item.outBound[0].originAirportName}{" "}
                        {item.outBound[0].originCityName}
                        {/* TODO: Add Country */}
                        {/* {item.outBound[0].originCountryName} */}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="text-xl font-semibold">
                        {format(item.outBound[0].arrivalTime, "hh:mm aa")}
                      </div>
                      <div className="text-sm">
                        {item.outBound[0].destinationAirportName}{" "}
                        {item.outBound[0].destinationCityName}{" "}
                        {/* TODO: Add Country */}
                        {/* {item.outBound[0].originCountryName} */}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="border-b-4 border-b-primary-500 pb-2 text-center text-sm">
                        {formatMinutes(item.outBound[0].duration)}
                      </div>
                      <div className="pt-2 text-center text-sm">
                        {item.outBound.length > 1
                          ? `${item.outBound.length - 1} Stops`
                          : "Non-Stop"}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="text-xl font-semibold">
                        {item.fare.Currency} {item.fare.OfferedFare}
                      </div>
                      <div className="text-sm">per adult</div>
                    </div>

                    <div className="col-span-2">
                      <div
                        className="cursor-pointer rounded-full bg-primary-500 px-6 py-1 text-center text-onprimary hover:bg-primary-600"
                        onClick={() => {
                          router.push(`/flights/book?resultIndex=${item.resultIndex}`)
                        }}
                      >
                        View Prices
                      </div>
                    </div>
                  </div>
                  {/* MOBILE ITEM */}
                  <div className="mt-4 block rounded-md bg-onprimary p-6 shadow-sm lg:hidden">
                    <div className="text-center text-2xl font-semibold">
                      {item.outBound[0].airlineName}
                    </div>
                    <div className="text-center text-sm font-medium">
                      {item.outBound[0].flightNumber}
                    </div>
                    <div className="mt-6 grid grid-cols-12 gap-4 text-center">
                      <div className="col-span-4">
                        <div className="text-lg font-bold">
                          {format(item.outBound[0].departureTime, "hh:mm aa")}
                        </div>
                        <div className="text-sm">
                          {item.outBound[0].originAirportName}{" "}
                          {item.outBound[0].originCityName}{" "}
                          {/* TODO: Add country */}
                        </div>
                      </div>
                      <div className="col-span-4">
                        <div className="border-b-2 border-b-green-500 pb-1 text-sm font-bold">
                          {formatMinutes(item.outBound[0].duration)}
                        </div>
                        <div className="pt-2 text-xs font-medium">
                          {item.outBound.length - 1} Stops
                        </div>
                      </div>
                      <div className="col-span-4">
                        <div className="text-lg font-bold">
                          {format(item.outBound[0].arrivalTime, "hh:mm aa")}
                        </div>
                        <div className="text-sm">
                          {" "}
                          {item.outBound[0].destinationAirportName}{" "}
                          {item.outBound[0].destinationCityName}{" "}
                          {/* TODO: Add country */}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid cursor-pointer grid-cols-12 rounded-full bg-primary-500 px-4 py-2 text-onprimary">
                      <div className="col-span-4 text-start font-semibold line-through opacity-65">
                        {item?.fare?.Currency} {item?.fare?.OfferedFare}
                      </div>
                      <div className="col-span-4 text-end font-semibold">
                        {item?.fare?.Currency} {item?.fare?.OfferedFare}
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
      <Dialog
        open={showFareDialog}
        setOpen={setShowFareDialog}
        hideCloseButton={true}
      >
        <div>Hi</div>
      </Dialog>
    </>
  );
}
