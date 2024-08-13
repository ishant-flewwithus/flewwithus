"use client";
import Page from "@/components/app/Page";
import Section from "@/components/generic/Section";
import Image from "next/image";
import { useState } from "react";
import AirplaneSeat from "@/assets/airplane_seat.svg";
import Tooltip from "@/components/generic/Tooltip";
import { MdAirlineSeatFlat, MdFlightTakeoff } from "react-icons/md";
import { FaClock, FaPlane } from "react-icons/fa6";
import { BsFillLuggageFill } from "react-icons/bs";
import { RiSofaFill } from "react-icons/ri";
import { GiGymBag } from "react-icons/gi";

interface FlightSeat {
  number: number;
  price: number;
  isBooked: boolean;
}

interface FlightSeatItemProps {
  seat: FlightSeat;
}

const FlightSeatItem = ({ seat }: FlightSeatItemProps) => {
  return (
    <Tooltip
      content={`Seat ${seat.number} ${seat.isBooked ? "(Booked)" : "(Free)"} `}
    >
      <Image
        src={
          seat.isBooked
            ? "/seat_grey.png"
            : seat.price < 300
              ? "/seat_red.png"
              : "/seat_green.png"
        }
        alt="seat"
        width={34}
        height={49}
        className={`${seat.isBooked ? "cursor-default" : "cursor-pointer"}`}
      />
    </Tooltip>
  );
};

export default function FlightSeat() {
  const generateRandomSeats = () => {
    const seats = [];
    for (let i = 1; i <= 90; i++) {
      const seat: FlightSeat = {
        number: i,
        price: Math.floor(Math.random() * (15000 - 200 + 1)) + 200,
        isBooked: Math.random() < 0.5,
      };
      seats.push(seat);
    }
    return seats;
  };

  const [seats, setSeats] = useState(generateRandomSeats());
  const [details, setDetails] = useState([
    { label: "SpiceJet SG-8157", icon: <FaPlane /> },
    { label: "2h 10m • Non Stop", icon: <FaClock /> },
    { label: "Check-in baggage 15 kg (1 piece)", icon: <BsFillLuggageFill /> },
    { label: "Economy Class • Saver", icon: <RiSofaFill /> },
    { label: "Cabin baggage 7 kg (1 piece)", icon: <GiGymBag /> },
    { label: "Seat No. D1", icon: <MdAirlineSeatFlat /> },
  ]);

  return (
    <Page
      headerChild={
        <div>
          <div className="mb-4 grid grid-cols-12 gap-4 rounded-lg bg-onprimary p-4">
            <div className="col-span-6 text-2xl font-semibold lg:col-span-3">
              Fare Summary:
            </div>
            <div className="col-span-6 flex flex-col items-end justify-end lg:col-span-3 lg:block">
              <div>
                <span className="font-bold">Base Fare:</span> ₹ 2,925
              </div>
              <div>Adult(s) (1 X ₹17,564)</div>
            </div>
            <div className="col-span-3 hidden lg:block">
              <div>
                <span className="font-bold">Taxes and Surcharges:</span> ₹ 2,925
              </div>
              <div>Airline Taxes and Surcharges (1 x ₹ 17,564)</div>
            </div>
            <div className="col-span-3 hidden lg:block">
              <div className="text-xl font-bold text-primary-900">
                Total Amount ₹ 2,925
              </div>
              <div>The airfare has increased by ₹ 4,105</div>
            </div>
          </div>

          <Section>
            <div className="text-lg">ONWARD • SAT, 27 JUL</div>
            <div className="mt-4 flex items-center gap-4 text-3xl font-bold">
              <div>Delhi</div>
              <div>
                <MdFlightTakeoff />
              </div>
              <div>Mumbai</div>
            </div>
            <div className="grid grid-cols-12 gap-2 mt-4">
              {details.map((item, index) => (
                <div className="flex col-span-4 items-center gap-2 p-2">
                    {item.icon} <div className="">{item.label}</div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      }
      overlapChildrenOverHeader={true}
    >
      <div>
        <div className="flex items-center justify-center">
          <div>
            {/* AIRPLANE TOP IMAGE */}
            <div className="relative h-[300px] w-[444px]">
              <Image src="/airplane_top.png" fill={true} alt="airplane top" />
            </div>
            {/* SEATS */}
            <div className="bg-white p-4 md:p-10 shadow-xl">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-6 grid grid-cols-3 gap-2">
                  {seats.slice(0, 60).map((seat, index) => (
                    <div className="col-span-1" key={index}>
                      <FlightSeatItem seat={seat} />
                    </div>
                  ))}
                </div>
                <div className="col-span-6 grid grid-cols-3 gap-2">
                  {seats.slice(0, 60).map((seat, index) => (
                    <div className="col-span-1" key={index}>
                      <FlightSeatItem seat={seat} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* AIRPLANE BOTTOM IMAGE */}
            <div className="relative h-[300px] w-[444px]">
              <Image
                src="/airplane_bottom.png"
                fill={true}
                alt="airplane bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
