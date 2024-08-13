"use client";

import Page from "@/components/app/PageForProfile";
import Image from "next/image";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { IoLogOut, IoPerson } from "react-icons/io5";
import { TbLogin2 } from "react-icons/tb";
import { MdAirplaneTicket } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { PiDevicesFill } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { TbBriefcase2Filled } from "react-icons/tb";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

export default function UserProfile() {
  const [menuItems, setMenuItems] = useState([
    {
      title: "Profile",
      icon: <IoPerson />,

      value: "profile",
    },
    {
      title: "Login Details",
      icon: <TbLogin2 />,

      value: "login",
    },
    {
      title: "Your Booking",
      icon: <MdAirplaneTicket />,

      value: "booking",
    },
    {
      title: "Price Alerts",
      icon: <FaBell />,

      value: "alert",
    },
    {
      title: "Save Travellers",
      icon: <BsPeopleFill />,

      value: "traveller",
    },
    {
      title: "Logged In Devices",
      icon: <PiDevicesFill />,

      value: "device",
    },
    {
      title: "Logout",
      icon: <IoLogOut />,

      value: "logout",
    },
  ]);

  interface RoundedButton {
    icon: React.ReactNode;
    title: string;
  }

  const roundedButtons: RoundedButton[] = [
    {
      title: "Verify your mobile",
      icon: <IoIosCheckmarkCircle />,
    },
    {
      title: "Complete your info",
      icon: <IoIosCheckmarkCircle />,
    },
  ];

  interface ProfileLeftButton {
    icon: React.ReactNode;
    title: string;
  }

  const profileLeftButtons: ProfileLeftButton[] = [
    {
      title: "Profile",
      icon: <IoPerson />,
    },
    {
      title: "Login Details",
      icon: <TbLogin2 />,
    },
    {
      title: "Your Booking",
      icon: <MdAirplaneTicket />,
    },
    {
      title: "Price Alerts",
      icon: <FaBell />,
    },
    {
      title: "Save Travellers",
      icon: <BsPeopleFill />,
    },
    {
      title: "Logged In Devices",
      icon: <PiDevicesFill />,
    },
    {
      title: "Logout",
      icon: <IoLogOut />,
    },
  ];

  return (
    <Page
      headerChild={<div className="h-60"></div>}
      overlapChildrenOverHeader={true}
    >
      <div className="flex w-auto items-center">
        <button className="text-md cursor-pointer rounded-full bg-onprimary px-8 py-3 text-blue-800">
          My Account
        </button>
        <div className="px-3 text-2xl text-onprimary">
          <FaAngleRight />
        </div>
        <div className="text-onprimary">My Profile</div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4 flex justify-center border-2 border-black">
          <div className="flex h-[1050px] w-80 flex-col items-center rounded-b-xl rounded-t-full border-2 bg-onprimary">
            <div className="mt-4 h-72 w-72 rounded-full border-2 border-blue-500 bg-purple-600"></div>

            <div className="mt-8 text-3xl font-bold">Mary</div>
            <div className="mb-14 mt-4 text-xs font-extralight">
              PERSONAL PROFILE
            </div>

            {/* Buttons for profile */}
            <div className="my-4 w-full">
              <div className="mx-6 flex items-center gap-3 rounded-full bg-[#c9e9f575] px-5 py-3 text-2xl">
                <IoPerson />
                <span className="text-base font-medium">Profile</span>
              </div>
            </div>

            <div className="w-full">
            {profileLeftButtons?.map((item, index) => (
              <div
                key={index}
                className="mx-6 my-4 flex items-center gap-3 rounded-full bg-[#f6f6f66e] px-5 py-3 text-2xl cursor-pointer"
              >
                {item.icon}
                <span className="text-base font-medium">{item.title}</span>
              </div>
            ))}
            </div>

            

          </div>
        </div>
        <div className="col-span-8 h-auto border-2 border-black">
          <div className="h-24 w-full rounded-2xl bg-onprimary"></div>

          <div className="my-7 flex h-16 w-full gap-8">
            <div className="flex h-full w-1/3 cursor-pointer items-center justify-center rounded-full bg-onprimary text-3xl text-green-600">
              <IoIosAddCircle />
              <span className="cursor-pointer pl-2 text-sm font-bold text-black">
                Add your email id
              </span>
            </div>
            {roundedButtons?.map((item, index) => (
              <div
                key={index}
                className="flex h-full w-1/3 cursor-pointer items-center justify-center rounded-full bg-onprimary text-3xl text-blue-800"
              >
                {item.icon}
                <span className="cursor-pointer pl-2 text-sm font-bold text-black">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          {/*User Details*/}

          <div className="h-[600px] w-full rounded-2xl bg-onprimary"></div>

          {/* Your Bookings */}

          <div className="mt-10 h-auto w-full rounded-2xl bg-onprimary">
            <div className="flex flex-col px-10 py-10 text-4xl font-bold">
              Your Bookings
              <span className="text-xs font-light opacity-80">
                Please check your Bookings
              </span>
            </div>

            <div className="flex flex-row justify-between gap-8 px-10">
                <div className="flex h-16 w-full items-center justify-center gap-2 rounded-full bg-[#4D51B0] text-2xl text-onprimary">
                  <TbBriefcase2Filled />
                  <span className="text-sm">UPCOMING</span>
                </div>

                <div className="h-16 w-full rounded-full border-2 border-[#cccccc] bg-onprimary flex items-center justify-center gap-2 text-2xl">
                <FaClockRotateLeft />
                <span className="text-sm font-bold">PAST</span>
                </div>

                <div className="h-16 w-full rounded-full border-2 border-[#cccccc] bg-onprimary flex items-center justify-center gap-2 text-2xl">
                <FaCircleCheck />
                <span className="text-sm font-bold">COMPLETED</span>
                </div>

                <div className="h-16 w-full rounded-full border-2 border-[#cccccc] bg-onprimary flex items-center justify-center gap-2 text-2xl">
                <MdCancel />
                <span className="text-sm font-bold">CANCELLED</span>
                </div>
            </div>

            <div className="flex p-10">
              <Image src={"/Booking-Upcomping-1.png"} width={142} height={142} alt="booking alt logo"></Image>
              <div className="flex flex-col justify-center gap-2 pl-12">
              <span className="text-2xl font-light">Looks empty, you&apos;ve no upcoming bookings.</span>
              <span className="font-bold">Looks empty, you&apos;ve no upcoming bookings.</span>
              <button className="w-44 p-2 bg-[#4d50b0dd] text-white rounded-2xl">Plan A Trip</button>
              </div>
            </div>


            </div>
          
          </div>
      </div>
    </Page>
  );
}
