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
  subDays,
} from "date-fns";
import * as FlightApi from "@/network/flights/flight";
import { useSearchParams } from "next/navigation";
import Filters from "@/components/pages/flight/search/Filters";
import FlightResults from "@/components/pages/flight/search/FlightResults";
import { z } from "zod";
import { toast } from "react-toastify";
import {
  AirlineFilter,
  FlightFilter,
  FlightSearchResult,
} from "@/models/Flight";
import { useDebounce } from "react-use";
import { roundUpToNearest500 } from "@/util/math";
import { validateFlightSearchParams } from "@/util/validation/validateFlight";

export default function FlightSearchPage() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FlightSearchResult[]>([]); // All results
  const [filteredData, setFilteredData] = useState<FlightSearchResult[]>([]); // Frontend filtered results
  const [showFiltersOnMobile, setShowFiltersOnMobile] = useState(false);

  // Filters
  const [filters, setFilters] = useState<FlightFilter[]>([
    {
      title: "Direct Flight",
      id: "directflight",
      value: false,
    },
    {
      title: "One Stop Flight",
      id: "oneStopflight",
      value: false,
    },
  ]);
  const [priceFilter, setPriceFilter] = useState(0);
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(10000);
  const [airlineFilters, setAirlineFilters] = useState<AirlineFilter[]>([]);

  // Get flights from TBO API
  const params = {
    AdultCount: searchParams.get("AdultCount") || "0",
    ChildCount: searchParams.get("ChildCount") || "0",
    InfantCount: searchParams.get("InfantCount") || "0",
    JourneyType: searchParams.get("JourneyType") || "0",
    Origin: searchParams.get("Origin") || "",
    Destination: searchParams.get("Destination") || "",
    DepartureDate: searchParams.get("DepartureDate") || "",
    ArrivalDate: searchParams.get("ArrivalDate") || "",
    FromCity: searchParams.get("FromCity") || "",
    ToCity: searchParams.get("ToCity") || "",
    FlightCabinClass: searchParams.get("FlightCabinClass") || "1",
  };

  const searchFlights = async () => {
    try {
      setLoading(true);

      // Validate params and throw error if validation fails
      validateFlightSearchParams(params);

      const results = await FlightApi.searchFlights({
        AdultCount: params.AdultCount,
        ChildCount: params.ChildCount,
        InfantCount: params.InfantCount,
        JourneyType: params.JourneyType,
        Origin: params.Origin,
        Destination: params.Destination,
        DepartureDate: parseISO(params.DepartureDate),
        ArrivalDate: parseISO(params.ArrivalDate),
        FlightCabinClass: params.FlightCabinClass,
      });

      console.log("Flight Results:", results);
      setData(results || []);
      setFilteredData(results || []);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  const setupFilters = () => {
    if (data?.length > 0) {
      // Since prices are sorted by default in price asc order
      setMaxPriceFilter(
        roundUpToNearest500(data[data.length - 1]?.Fare?.OfferedFare),
      );
      setMinPriceFilter(roundUpToNearest500(data[0]?.Fare?.OfferedFare - 500));
      setPriceFilter(
        roundUpToNearest500(data[data.length - 1]?.Fare?.OfferedFare),
      );

      // Setup airline filters
      let uniqueAirlines = new Set();
      let uniqueAirlinesArr = [];
      for (let i = 0; i < data?.length; i++) {
        let _airline = data[i].Segments[0][0].Airline;
        if (!uniqueAirlines.has(_airline.AirlineCode)) {
          uniqueAirlines.add(_airline.AirlineCode);
          uniqueAirlinesArr.push({ airline: _airline, isSelected: true });
        }
      }

      setAirlineFilters(uniqueAirlinesArr);
    }
  };

  // Setup filters
  useEffect(() => {
    setupFilters();
  }, [data]);

  // Update data on filter change
  useDebounce(
    () => {
      searchFlights();
    },
    800,
    [filters],
  );

  useDebounce(
    () => {
      let filtered = data?.filter(
        (item) => item.Fare.OfferedFare <= priceFilter,
      );
      setFilteredData(filtered);
    },
    800,
    [priceFilter],
  );

  useDebounce(
    () => {
      let selectedAirlines = airlineFilters
        .filter((a) => a.isSelected)
        .map((a) => a.airline.AirlineCode);
      let filtered = data?.filter((item) =>
        selectedAirlines.includes(item.Segments[0][0].Airline.AirlineCode),
      );
      setFilteredData(filtered);
    },
    800,
    [airlineFilters],
  );

  return (
    <Page headerChild={<FlightSearch />} overlapChildrenOverHeader={false}>
      <div className="grid grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <Filters
          flights={filteredData}
          showFiltersOnMobile={showFiltersOnMobile}
          setShowFiltersOnMobile={setShowFiltersOnMobile}
          filters={filters}
          setFilters={setFilters}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          maxPriceFilter={maxPriceFilter}
          setMaxPriceFilter={setMaxPriceFilter}
          minPriceFilter={minPriceFilter}
          setMinPriceFilter={setMinPriceFilter}
          airlineFilters={airlineFilters}
          setAirlineFilters={setAirlineFilters}
        />

        {/* RIGHT COLUMN */}
        <FlightResults
          setShowFiltersOnMobile={setShowFiltersOnMobile}
          flights={filteredData}
          loading={loading}
          fromCity={params.FromCity}
          toCity={params.ToCity}
        />
      </div>
    </Page>
  );
}
