import Api from "@/util/Api";
import ApiResponse from "../../models/ApiResponse";
import { Airport } from "@/models/Flight";

export const getAirports = async () => {
  const response = await Api.get<ApiResponse<Airport[]>>(`/home/airports`);
  return response.data.data;
};

export const searchAirports = async (query: string) => {
  const response = await Api.get<ApiResponse<Airport[]>>(
    `/home/airportbycode/?code=${query}`,
  );
  return response.data.data;
};

interface FlightSearchBody {
  AdultCount?: number;
  ChildCount?: number;
  InfantCount?: number;
  JourneyType?: number;
  //PreferredAirlines: null;
  DirectFlight: boolean;
  OneStopFlight: boolean;
  Origin?: string;
  Destination?: string;
  FlightCabinClass?: number;
  DepartureDate?: Date;
  ArrivalTime?: Date;
  //Sources?: null;
}

export const searchFlights = async (flightFilters: FlightSearchBody) => {
  const response = await Api.post<ApiResponse<Airport[]>>(
    `https://fwu-backend-725r.vercel.app/fwu/api/v1/home/searchFlights`,
    flightFilters,
  );
  return response.data.data;
};
