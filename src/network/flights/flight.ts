import ApiResponse from "@/models/ApiResponse";
import { Airport, FlightSearchResult } from "@/models/Flight";
import Api from "@/util/Api";
import { format } from "date-fns";

interface FlightSearchBody {
  AdultCount?: number;
  ChildCount?: number;
  InfantCount?: number;
  JourneyType?: number;
  //PreferredAirlines: null;
  DirectFlight?: boolean;
  OneStopFlight?: boolean;
  Origin?: string;
  Destination?: string;
  FlightCabinClass?: number;
  DepartureDate?: Date;
  ArrivalDate?: Date;
  //Sources?: null;
}

export const searchFlights = async ({
  AdultCount,
  ChildCount,
  InfantCount,
  JourneyType,
  DirectFlight,
  OneStopFlight,
  Origin,
  Destination,
  FlightCabinClass,
  DepartureDate,
  ArrivalDate,
}: FlightSearchBody) => {
  let queryParams = `?AdultCount=${AdultCount}&ChildCount=${ChildCount}&InfantCount=${InfantCount}&JourneyType=1&DirectFlight=${DirectFlight}&OneStopFlight=${OneStopFlight}&Origin=${Origin}&Destination=${Destination}&FlightCabinClass=${FlightCabinClass}&DepartureDate=${format(DepartureDate!, "yyyy-MM-dd")}&ArrivalDate=${format(ArrivalDate!, "yyyy-MM-dd")}`;

  const response = await Api.get<ApiResponse<FlightSearchResult[]>>(
    `/home/searchFlights${queryParams}`,
  );
  return response.data.data;
};
