"use client";
import Page from "@/components/app/Page";
import FlightSearch from "@/components/pages/flight/common/FlightSearch";
import React, { useEffect, useState } from "react";
import {
  parseISO,
  isValid,
  isToday,
  isAfter,
  startOfDay,
  isBefore,
} from "date-fns";
import * as FlightApi from "@/network/flights/flight";
import { useSearchParams } from "next/navigation";
import Filters from "@/components/pages/flight/search/Filters";
import FlightResults from "@/components/pages/flight/search/FlightResults";
import { searchFlightParamsSchema } from "@/util/validation/validation";
import { z } from "zod";
import { toast } from "react-toastify";
import { FlightSearchResult } from "@/models/Flight";

export default function FlightSearchPage() {
  const [showFiltersOnMobile, setShowFiltersOnMobile] = useState(false);

  const searchParams = useSearchParams();
  const params = {
    AdultCount: searchParams.get("AdultCount") || "0",
    ChildCount: searchParams.get("ChildCount") || "0",
    InfantCount: searchParams.get("InfantCount") || "0",
    JourneyType: searchParams.get("JourneyType") || "0",
    Origin: searchParams.get("Origin") || "",
    Destination: searchParams.get("Destination") || "",
    DepartureDate: parseISO(searchParams.get("DepartureDate") || ""),
    ArrivalDate: parseISO(searchParams.get("ArrivalDate") || ""),
    FromCity: searchParams.get("FromCity"),
    ToCity: searchParams.get("ToCity"),
  };

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FlightSearchResult[]>([]);

  const searchFlights = async () => {
    try {
      setLoading(true);

      const validatedParams = searchFlightParamsSchema.parse(params);

      const results = await FlightApi.searchFlights({
        AdultCount: validatedParams.AdultCount,
        ChildCount: validatedParams.ChildCount,
        InfantCount: validatedParams.InfantCount,
        JourneyType: validatedParams.JourneyType,
        Origin: validatedParams.Origin,
        Destination: validatedParams.Destination,
        DepartureDate: validatedParams.DepartureDate,
        ArrivalDate: validatedParams.ArrivalDate,
        FlightCabinClass: 1,
        DirectFlight: true,
        OneStopFlight: true,
      });

      console.log("Flight Results:", results);
      setData(results);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchFlights();
  }, []);

  return (
    <Page headerChild={<FlightSearch />} overlapChildrenOverHeader={false}>
      <div className="grid grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <Filters
          showFiltersOnMobile={showFiltersOnMobile}
          setShowFiltersOnMobile={setShowFiltersOnMobile}
        />

        {/* RIGHT COLUMN */}
        <FlightResults
          setShowFiltersOnMobile={setShowFiltersOnMobile}
          flights={data}
          loading={loading}
          fromCity={params.FromCity}
          toCity={params.ToCity}
        />
      </div>
    </Page>
  );
}
