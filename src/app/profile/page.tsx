"use client";

import Page from "@/components/app/Page";
import Image from "next/image";
import { useEffect, useState } from "react";
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
import { GrUpload } from "react-icons/gr";
import Section from "@/components/generic/Section";
import CollapsableSection from "@/components/generic/CollapsableSection";
import { HTMLInputTypeAttribute } from "react";
import { profileUpdateValidator } from "@/util/validator";
import { useSession } from "@/context/sessionContext";
import * as UserApi from "@/network/flights/user";
import { toast } from "react-toastify";
import Select, { SelectOption } from "@/components/generic/Select";
import { parse } from "date-fns";

interface UserProfileFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const UserProfileField = ({ label, ...props }: UserProfileFieldProps) => {
  return (
    <div className="mb-4 grid grid-cols-12 gap-4 rounded-full border px-8 py-4">
      <div className="col-span-4 flex items-center">{label}</div>
      <div className="col-span-8 flex items-center">
        <input
          type="text"
          placeholder={`Enter ${label}`}
          className="w-full border-none text-lg font-bold outline-none placeholder:text-base placeholder:font-normal"
          {...props}
        />
      </div>
    </div>
  );
};

interface UserProfileDropdownProps {
  label: string;
  value: SelectOption;
  onChange: (arg0: SelectOption | undefined) => void;
  options: SelectOption[];
}

const UserProfileDropdown = ({
  label,
  value,
  onChange,
  options,
}: UserProfileDropdownProps) => {
  return (
    <div className="mb-4 grid grid-cols-12 gap-4 rounded-full border px-8 py-4">
      <div className="col-span-4 flex items-center">{label}</div>
      <div className="col-span-8 flex items-center">
        <Select
          options={options}
          value={value}
          onChange={(val) => onChange(val)}
        />
      </div>
    </div>
  );
};

interface UserProfileDateProps {
  label: string;
  value: string;
  onChange: (arg0: string) => void;
}

const UserProfileDate = ({ label, value, onChange }: UserProfileDateProps) => {
  return (
    <div className="mb-4 grid grid-cols-12 gap-4 rounded-full border px-8 py-4">
      <div className="col-span-4 flex items-center">{label}</div>
      <div className="col-span-8 flex items-center">
        <input
          type="date"
          placeholder={`Enter ${label}`}
          className="w-full border-none text-lg font-bold outline-none placeholder:text-base placeholder:font-normal"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default function UserProfile() {
  const { user, setUser } = useSession();

  const MENU_ITEMS = [
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
  ];

  const GENDER_OPTIONS = [
    {
      label: "Male",
      value: "Male",
    },
    {
      label: "Female",
      value: "Female",
    },
    {
      label: "Other",
      value: "Other",
    },
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState(MENU_ITEMS[0].value);

  const [username, setUsername] = useState<string>();
  const [dob, setDob] = useState<string>();
  const [gender, setGender] = useState<string>();

  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setDob(user.dateOfBirth || new Date().toISOString());
      setGender(user.gender);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);

  const updateProfile = async () => {
    try {
      let parsedDob = parse(dob, "yyyy-MM-dd", new Date());
      await profileUpdateValidator.validate({
        _id: user!._id,
        username: username,
        dateOfBirth: parsedDob,
        gender: gender,
      });
      await UserApi.updateProfile(user!._id, username, parsedDob, gender);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    }
  };

  return (
    <Page
      headerChild={<div className="h-40"></div>}
      overlapChildrenOverHeader={true}
    >
      <div className="relative">
        <div className="mt-[-140px] grid grid-cols-12 gap-10">
          <div className="col-span-12 hidden lg:col-span-3 lg:block">
            <div className="w-full rounded-b-[1500px] rounded-t-full bg-onprimary p-5">
              <div className="relative">
                <div className="relative mx-auto w-full cursor-pointer overflow-hidden rounded-full border-2 pt-[100%]">
                  <div className="h-full w-full">
                    <Image
                      src="/user_placeholder.jpg"
                      fill={true}
                      alt="Set profile pic"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 mb-[20px] mr-[10px] flex cursor-pointer items-center justify-center rounded-full bg-primary-500 p-4 text-white hover:bg-primary-600">
                  <GrUpload />
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold">{user?.username}</div>
                <div className="mt-1 text-sm text-textheading">
                  PERSONAL PROFILE
                </div>
              </div>
              <div className="mt-4">
                {MENU_ITEMS?.map((item, index) => (
                  <div
                    key={index}
                    className={`mx-2 my-1 flex cursor-pointer items-center gap-4 rounded-full ${selectedMenuItem === item.value ? "bg-primary-50" : "bg-onprimary hover:bg-gray-100"} px-6 py-2 text-xl font-medium`}
                    onClick={() => setSelectedMenuItem(item.value)}
                  >
                    {item.icon}
                    <div className="text-lg">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-12 space-y-4 lg:col-span-9">
            <CollapsableSection title="Profile">
              <UserProfileField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <UserProfileDropdown
                label="Gender"
                value={
                  GENDER_OPTIONS.find((g) => g.value === gender) as SelectOption
                } // TODO: Optimize
                onChange={(val) => setGender(val?.value!)}
                options={GENDER_OPTIONS}
              />

              <UserProfileDate
                label="Date of birth"
                value={dob}
                onChange={(date) => setDob(date)}
              />

              <div className="flex items-center justify-end">
                <button
                  onClick={() => updateProfile()}
                  className="mt-2 rounded-full border-none bg-primary-500 px-4 py-2 text-onprimary shadow-sm hover:bg-primary-600"
                >
                  Apply Changes
                </button>
              </div>
            </CollapsableSection>

            <CollapsableSection title="User Details">
              <UserProfileField label="Birthday" />
              <UserProfileField label="Gender" />
              <UserProfileField label="Marital Sign" />
              <UserProfileField label="Address" />
              <UserProfileField label="Pincode" />
              <UserProfileField label="State" />
            </CollapsableSection>
          </div>
        </div>
      </div>
    </Page>
  );
}
