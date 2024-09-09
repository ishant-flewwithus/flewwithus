"use client";
import Page from "@/components/app/Page";
import Checkgroup, { CheckgroupItem } from "@/components/generic/Checkgroup";
import Divider from "@/components/generic/Divider";
import FormInputCheckbox from "@/components/generic/FormInputCheckbox";
import Radiogroup, { RadiogroupItem } from "@/components/generic/Radiogroup";
import Section from "@/components/generic/Section";
import Select, { SelectOption } from "@/components/generic/Select";
import TextField from "@/components/generic/TextField";
import {
  COUNTRY_CODE_OPTIONS,
  INDIAN_STATES,
} from "@/constants/country.constant";
import { format, set } from "date-fns";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuBaggageClaim, LuShoppingBag, LuSiren } from "react-icons/lu";
import Dialog from "@/components/generic/Dialog";
import Stack from "@/components/generic/Stack";
import Button from "@/components/generic/Button";
import TextWithBackgroundLine from "@/components/generic/TextWithBackgroundLine";

enum Gender {
  Male = "Male",
  Female = "Female",
}
interface FlightUser {
  id: string;
  firstname: string;
  lastname: string;
  gender: Gender | "";
  countrycode: string;
  mobilenumber: string;
  email: string;
  dob: Date;
  passportno: string;
  issuingcountry: string;
  wheelchair: boolean;
}

interface AGenderProps {
  selectedGender: Gender;
  setSelectedGender: (gender: Gender) => void;
}

export default function FlightBookingPage() {
  const [flightStops, setFlightStops] = useState([
    {
      date: new Date(),
      place: "New Delhi",
      airport: "Indira Gandhi International Airport, Terminal T3",
      cabinBaggage: "7 Kgs / Adult",
      checkInBaggage: "25 Kgs / Adult",
    },
    {
      date: new Date(),
      place: "Bengaluru",
      airport: "Bengaluru International Airport, Terminal T2",
      cabinBaggage: "8 Kgs / Adult",
      checkInBaggage: "20 Kgs / Adult",
    },
  ]);

  const [fareOptions, setFareOptions] = useState<CheckgroupItem[]>([
    {
      label: "Pay just Rs 489 per passenger",
      caption: "Approx Refund: Rs 3,074",
      isSelected: true,
    },
    {
      label: "No, I don't want Free Cancellation",
      caption: "Approx Refund: Rs 0",
      isSelected: false,
    },
  ]);

  const [bookerCountryCode, setBookerCountryCode] = useState<
    SelectOption | undefined
  >(COUNTRY_CODE_OPTIONS[0]);

  const [bookerPhone, setBookerPhone] = useState("");

  const [gstState, setGstState] = useState<SelectOption | undefined>(
    INDIAN_STATES[0],
  );

  const [tripFeatures, setTripFeatures] = useState([
    {
      title: "24 x 7 Support",
      caption: "Delayed / lost baggage Assistance",
      icon: <LuBaggageClaim />,
    },
    {
      title: "Flat Rs 50000",
      caption: "Personal Accident",
      icon: <LuSiren />,
    },
    {
      title: "Flat Rs 50000",
      caption: "Lost baggage",
      icon: <LuShoppingBag />,
    },
  ]);

  const secureOptions = [
    {
      label: "Yes, secure my trip",
      value: "yes",
    },
    {
      label: "No, I will book without trip secure",
      value: "no",
    },
  ];

  const [secureTripEnabled, setSecureTripEnabled] = useState<RadiogroupItem>(
    secureOptions[0],
  );

  const [newAdult, setNewAdult] = useState(false);

  const AGender: React.FC<AGenderProps> = ({
    selectedGender,
    setSelectedGender,
  }) => {
    // const [selectedGender, setSelectedGender] = useState<Gender | null>(null);

    return (
      <div className="ml-auto grid w-full p-2">
        <div>
          <button
            className={`mx-2 cursor-pointer rounded-full border-2 p-2.5 px-8 ${
              selectedGender === Gender.Male
                ? "border-0 bg-primary-400 text-white"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedGender(Gender.Male)}
          >
            Male
          </button>
          <button
            className={`mx-2 cursor-pointer rounded-full border-2 p-2.5 px-6 ${
              selectedGender === Gender.Female
                ? "border-0 bg-primary-400 text-white"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedGender(Gender.Female)}
          >
            Female
          </button>
        </div>
      </div>
    );
  };
  const [adults, setAdults] = useState<FlightUser[]>([
    {
      id: new Date().getTime().toString(),
      firstname: "",
      lastname: "",
      gender: "",
      countrycode: "",
      mobilenumber: "",
      email: "",
      dob: new Date(),
      passportno: "",
      issuingcountry: "",
      wheelchair: false,
    },
  ]);
  const [selectedAdultIndex, setSelectedAdultIndex] = useState<number>(0);

  function addAdult() {
    setAdults([
      ...adults,
      {
        id: new Date().getTime().toString(),
        firstname: "",
        lastname: "",
        gender: "",
        countrycode: "",
        mobilenumber: "",
        email: "",
        dob: new Date(),
        passportno: "",
        issuingcountry: "",
        wheelchair: false,
      },
    ]);
  }

  const deleteUser = (id: string) => {
    if (adults.length === 1) {
      alert("Cannot delete only user.");
      return;
    }
    const updatedAdults = adults.filter((adult) => adult.id !== id);
    setAdults(updatedAdults);
    if (selectedAdultIndex >= updatedAdults.length) {
      setSelectedAdultIndex(updatedAdults.length - 1);
    }
  };

  const handleAdultClick = (index: number) => {
    setSelectedAdultIndex(index);
  };
  const handleInputChange = (
    field: keyof FlightUser,
    value: string | boolean | Date,
  ) => {
    const updatedAdults = [...adults];
    updatedAdults[selectedAdultIndex] = {
      ...updatedAdults[selectedAdultIndex],
      [field]: value,
    };
    setAdults(updatedAdults);
  };
  return (
    <>
      <Page
        headerChild={
          <div className="grid grid-cols-12 items-center gap-4 rounded-lg bg-onprimary p-4">
            <div className="col-span-6 text-2xl font-semibold lg:col-span-3">
              Fare Summary:
            </div>
            <div className="text-md col-span-6 flex flex-col items-start justify-end sm:items-end lg:col-span-3 lg:block">
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
              <div className="text-lg font-bold text-primary-900">
                Total Amount ₹ 2,925
              </div>
              <div>The airfare has increased by ₹ 4,105</div>
            </div>
          </div>
        }
        overlapChildrenOverHeader={true}
      >
        <Section title="Complete your booking">
          {/* FLIGHT FROM AND TO */}
          <div className="block items-center justify-between lg:flex">
            <div className="block items-center gap-4 lg:flex">
              <div className="flex items-center gap-2 border-l-4 border-l-primary-500 pl-2 text-xl font-semibold lg:text-2xl">
                New Delhi <FaArrowRightLong /> Bengaluru
              </div>
              <div className="mt-2 inline-block rounded-full bg-primary-500 px-4 py-2 text-sm text-onprimary lg:mt-0 lg:block">
                Wednesday, May 22 • Non Stop • 2h 45m
              </div>
            </div>
            <div className="ml-2 mt-2 hidden items-center gap-4 lg:mt-0 lg:flex">
              <div className="font-medium text-textheading">
                Economy &gt; Flex
              </div>
              <div className="cursor-pointer rounded-full bg-primary-500 px-6 py-2 text-center text-onprimary">
                View Fare Rules
              </div>
            </div>
          </div>
          {/* FLIGHT DETAILS */}
          <div className="my-4 text-sm">Air India AI 803</div>
          {/* FLIGHT STOPS */}
          <div>
            {flightStops?.map((item, index) => (
              <div key={index}>
                <div className="grid grid-cols-12 items-center gap-5 lg:gap-14">
                  <div className="col-span-7 grid grid-cols-12 items-center gap-4 text-xs sm:text-sm lg:col-span-3 lg:text-base">
                    <div className="col-span-5">
                      {format(item.date, "hh:mm a")}
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full border-2 border-primary-500 lg:h-6 lg:w-6"></div>
                    </div>
                    <div className="col-span-5 text-end font-semibold">
                      {item.place}
                    </div>
                  </div>

                  <div className="col-span-5 text-xs sm:text-sm lg:col-span-9 lg:text-base">
                    {item.airport}
                  </div>
                </div>
                {index !== flightStops.length - 1 && (
                  <div className="grid grid-cols-12 items-center gap-5 lg:gap-14">
                    <div className="col-span-7 grid grid-cols-12 items-center gap-4 lg:col-span-3">
                      <div className="col-span-5"></div>
                      <div className="col-span-2 flex items-center justify-center">
                        <div className="h-10 border-2 border-dashed border-primary-500"></div>
                      </div>
                      <div className="col-span-5 text-center text-sm">
                        2h 00m
                      </div>
                    </div>

                    <div className="col-span-5 lg:col-span-9"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* INFO MESSAGE */}
          <div className="mt-6 border-t border-t-gray-300 py-6 text-sm">
            Sorry, extra check-in baggage allowance details are currently not
            available from the airline for DEL-BLR.
          </div>
          <div className="rounded-xl bg-background p-6">
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium">
                Cancellation Refund Policy
              </div>
              <div className="hidden cursor-pointer rounded-full bg-primary-500 px-6 py-2 text-center text-onprimary lg:block">
                View Fare Rules
              </div>
            </div>
            <div className="text-lg font-semibold">Air India</div>

            {/* CANCELLATION BAR */}
            <div className="my-4">
              {/* RATES */}
              <div className="grid grid-cols-12 text-sm">
                <div className="col-span-4">Cancellation Panelty:</div>
                <div className="col-span-4 text-center">₹ 2,925</div>
                <div className="col-span-4 text-end">₹ 2,925</div>
              </div>
              {/* BAR */}
              <div className="relative my-4">
                <div className="h-2 rounded-full bg-primary-500"></div>
                <div className="absolute left-1/2 -mt-4 h-6 border border-dashed border-gray-800"></div>
              </div>
              {/* DATES */}
              <div className="grid grid-cols-12 text-sm">
                <div className="col-span-4">Cancellation Between:</div>
                <div className="col-span-4 text-center">
                  <div>22 May</div>
                  <div className="font-semibold">04:10</div>
                </div>
                <div className="col-span-4 text-end">
                  <div>22 May</div>
                  <div className="font-semibold">04:10</div>
                </div>
              </div>
            </div>
          </div>
        </Section>
        <Section title="Free Cancellation">
          <Checkgroup
            items={fareOptions}
            setItems={setFareOptions}
            multiSelect={false}
          />
        </Section>
        <Section title="Traveller Details">
          <div className="flex items-center justify-between rounded-lg bg-background p-4">
            <div className="font-semibold">
              Log in to view your saved traveller list, unlock amazing deals &
              much more!
            </div>
            <div className="center cursor-pointer rounded border-2 border-primary-500 border-opacity-80 bg-primary-100 bg-opacity-40 p-2">
              LOGIN NOW
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-background p-4">
            <div>
              <span className="font-semibold">Important: </span>
              Enter name as mentioned on your passport or Government approved
              IDs.
            </div>
            <div>
              Please ensure that the Frequent Flyer No entered here is against
              the same passenger name otherwise the points will not be updated
              by the airline.
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-background p-4">
            <div>You have not added any adults to the list</div>
            <Divider />
            <div
              className="cursor-pointer text-primary-500"
              onClick={() => setNewAdult(true)}
            >
              + ADD NEW ADULT
            </div>
          </div>

          <div className="mt-8">
            <div className="font-bold">Booking details will be sent to</div>
            <div className="mt-4 grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-4">
                <Select
                  label="Country"
                  options={COUNTRY_CODE_OPTIONS}
                  value={bookerCountryCode}
                  onChange={(val) => setBookerCountryCode(val)}
                />
              </div>
              <div className="col-span-12 lg:col-span-4">
                <TextField
                  label="Phone"
                  placeholder="XX XXXX XXXX"
                  labelColor="default"
                  variant="contained"
                />
              </div>
              <div className="col-span-12 lg:col-span-4">
                <TextField
                  label="Email"
                  placeholder="user@email.com"
                  labelColor="default"
                  variant="contained"
                />
              </div>
            </div>
            <div className="mt-5">
              <FormInputCheckbox label="I have a GST number (Optional)" />
            </div>
          </div>
        </Section>
        <Section title="Your State">
          <div className="w-full lg:w-1/3">
            <Select
              label="Select State"
              options={INDIAN_STATES}
              value={gstState}
              onChange={(val) => setGstState(val)}
            />
          </div>
          <div className="mt-3">
            <FormInputCheckbox label="Confirm and save booking details to your profile" />
          </div>
        </Section>
        <Section title="Trip Secure">
          <div className="bg-background p-4">
            <div className="text-lg font-bold">
              Rs 369 /{" "}
              <span className="text-sm font-normal">
                (Traveller 18% GST Included)
              </span>
            </div>
            <div className="mt-4 grid grid-cols-12 gap-4">
              {tripFeatures?.map((item, index) => (
                <div
                  className="col-span-12 flex cursor-pointer items-center gap-4 rounded-md bg-onprimary p-4 lg:col-span-4"
                  key={index}
                >
                  <div className="rounded-md bg-primary-100 p-2 text-2xl text-primary-700">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-md font-semibold md:text-lg">
                      {item.title}
                    </div>
                    <div className="md:text-md text-sm">{item.caption}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-background p-4 font-semibold">
            Recommended for your travel within India
          </div>
          <div className="mt-4">
            <Radiogroup
              items={secureOptions}
              value={secureTripEnabled}
              onChange={(val) => setSecureTripEnabled(val)}
            />
          </div>
        </Section>
      </Page>
      <Dialog open={newAdult} setOpen={setNewAdult} hideCloseButton={true}>
        <div className="w-full items-center p-3 text-textheading">
          <Stack direction="vertical" gap={10}>
            <div className="relative w-full bg-white">
              <div className="mb-40 ml-2 block p-6 md:mb-0">
                <div className="mb-2 px-2 text-primary-500">
                  {adults.map((adult, index) => (
                    <>
                      <span
                        key={adult.id}
                        className={`cursor-pointer p-2 ${selectedAdultIndex === index ? "font-bold" : ""} `}
                        onClick={() => handleAdultClick(index)}
                      >
                        Adult {index + 1}
                      </span>
                      <span className="">|</span>
                    </>
                  ))}

                  <span className="cursor-pointer p-2 underline" onClick={addAdult}>
                    + Add New Adult
                  </span>
                </div>

                <div className="h-[1px] w-full bg-gray-300"></div>

                <Stack direction="vertical" gap={10}>
                  <div className="mt-2 grid grid-cols-12 gap-9">
                    <div className="col-span-4">
                      <TextField
                        type="text"
                        placeholder="First and Middle Name"
                        value={adults[selectedAdultIndex].firstname}
                        onChange={(e) =>
                          handleInputChange("firstname", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-4">
                      <TextField
                        type="text"
                        placeholder="Last Name"
                        value={adults[selectedAdultIndex].lastname}
                        onChange={(e) =>
                          handleInputChange("lastname", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-4">
                      <AGender
                        selectedGender={
                          adults[selectedAdultIndex].gender as Gender
                        }
                        setSelectedGender={(gender: Gender) =>
                          handleInputChange("gender", gender)
                        }
                      />
                    </div>
                  </div>
                </Stack>
                <Stack direction="vertical" gap={10}>
                  <div className="grid grid-cols-12 gap-9 p-2">
                    <div className="col-span-4">
                      <TextField
                        type="text"
                        label="Country Code"
                        labelSize="small"
                        labelColor="black"
                        placeholder="Country Code"
                        value={adults[selectedAdultIndex].countrycode}
                        onChange={(e) =>
                          handleInputChange("countrycode", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-4">
                      <TextField
                        type="text"
                        label="Phone Number"
                        labelSize="small"
                        labelColor="black"
                        placeholder="Phone Number"
                        value={adults[selectedAdultIndex].mobilenumber}
                        onChange={(e) =>
                          handleInputChange("mobilenumber", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-4">
                      <TextField
                        type="text"
                        label="Email"
                        labelSize="small"
                        labelColor="black"
                        placeholder="Email"
                        value={adults[selectedAdultIndex].email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </Stack>
                <Stack direction="vertical" gap={10}>
                  <div className="grid grid-cols-12 gap-9 p-2">
                    <div className="col-span-4">
                      <TextField
                        type="text"
                        label="Passport No."
                        labelSize="small"
                        labelColor="black"
                        placeholder="Passport No."
                        value={adults[selectedAdultIndex].passportno}
                        onChange={(e) =>
                          handleInputChange("passportno", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-4">
                      <TextField
                        type="text"
                        label="Passport Issuing Country"
                        labelSize="small"
                        labelColor="black"
                        placeholder="Passport Issuing Country"
                        value={adults[selectedAdultIndex].issuingcountry}
                        onChange={(e) =>
                          handleInputChange("issuingcountry", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-4">
                      <TextField
                        type="date"
                        label="Date of Birth"
                        labelSize="small"
                        labelColor="black"
                        placeholder="Date of Birth"
                        value={
                          adults[selectedAdultIndex].dob
                            .toISOString()
                            .split("T")[0]
                        }
                        onChange={(e) =>
                          handleInputChange("dob", new Date(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </Stack>
              </div>
            </div>
          </Stack>
          <Stack direction="vertical" gap={10}>
            <div className="ml-10">
              <label>
                <input
                  type="checkbox"
                  className="mb-6 mr-2"
                  checked={adults[selectedAdultIndex].wheelchair}
                  onChange={(e) =>
                    handleInputChange("wheelchair", e.target.checked)
                  }
                />
                I require wheelchair (Optional)
              </label>
            </div>
          </Stack>
          <Stack direction="vertical" gap={0}>
            <div className="flex justify-end">
              <button
                className="w-1/4 rounded bg-red-500 px-4 py-2 text-white"
                onClick={() => deleteUser(adults[selectedAdultIndex].id)}
              >
                Delete User
              </button>
            </div>
          </Stack>
        </div>
      </Dialog>
    </>
  );
}
