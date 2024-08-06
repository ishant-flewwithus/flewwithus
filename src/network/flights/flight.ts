import ApiResponse from "@/models/ApiResponse";
import { Airport } from "@/models/Flight";
import Api from "@/util/Api";

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
    `/home/searchFlights`,
    flightFilters,
  );
  return response.data.data;
};
