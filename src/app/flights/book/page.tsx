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
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuBaggageClaim, LuShoppingBag, LuSiren } from "react-icons/lu";
import * as FlightApi from "@/network/flights/flight";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function FlightBookingPage() {
  const searchParams = useSearchParams();

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

  const [loading, setLoading] = useState(false);

  const getFlightDetails = async () => {
    try {
      setLoading(true);
      const resultIndex = searchParams.get("resultIndex") || "";
      const results = await FlightApi.getFlightDetails(resultIndex);

      console.log("Flight details:", results);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFlightDetails();
  }, []);

  return (
    <Page
      headerChild={
        <div className="grid grid-cols-12 gap-4 rounded-lg bg-onprimary p-4">
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
      }
      overlapChildrenOverHeader={true}
    >
      <Section title="Complete your booking">
        {/* FLIGHT FROM AND TO */}
        <div className="block items-center justify-between lg:flex">
          <div className="block items-center gap-4 lg:flex">
            <div className="flex items-center gap-2 border-l-4 border-l-primary-500 pl-2 text-2xl font-semibold lg:text-xl">
              New Delhi <FaArrowRightLong /> Bengaluru
            </div>
            <div className="mt-2 inline-block rounded-full bg-primary-500 px-4 py-2 text-sm text-onprimary lg:mt-0 lg:block">
              Wednesday, May 22 • Non Stop • 2h 45m
            </div>
          </div>
          <div className="mt-2 hidden items-center gap-4 lg:mt-0 lg:flex">
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
                    <div className="col-span-5 text-center text-sm">2h 00m</div>
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
          <div className="cursor-pointer">LOGIN NOW</div>
        </div>
        <div className="mt-4 rounded-lg bg-background p-4">
          <div>
            Important: Enter name as mentioned on your passport or Government
            approved IDs.
          </div>
          <div>
            Please ensure that the Frequent Flyer No entered here is against the
            same passenger name otherwise the points will not be updated by the
            airline.
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-background p-4">
          <div>You have not added any adults to the list</div>
          <Divider />
          <div className="cursor-pointer text-primary-500">+ ADD NEW ADULT</div>
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
                labelSize="small"
                variant="contained"
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <TextField
                label="Email"
                placeholder="user@email.com"
                labelColor="default"
                labelSize="small"
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
                  <div className="text-lg font-semibold">{item.title}</div>
                  <div>{item.caption}</div>
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
  );
}
