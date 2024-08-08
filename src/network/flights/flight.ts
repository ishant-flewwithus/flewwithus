import ApiResponse from "@/models/ApiResponse";
import { Airport, FlightSearchResult } from "@/models/Flight";
import Api from "@/util/Api";
import { format } from "date-fns";

interface FlightSearchBody {
  AdultCount?: number;
  ChildCount?: number;
  InfantCount?: number;
  JourneyType?: number;
  Origin?: string;
  Destination?: string;
  FlightCabinClass?: number;
  DepartureDate?: Date;
  ArrivalDate?: Date;
}

export const searchFlights = async ({
  AdultCount,
  ChildCount,
  InfantCount,
  JourneyType,
  Origin,
  Destination,
  FlightCabinClass,
  DepartureDate,
  ArrivalDate,
}: FlightSearchBody) => {
  let queryParams = `?AdultCount=${AdultCount}&ChildCount=${ChildCount}&InfantCount=${InfantCount}&JourneyType=${JourneyType}&Origin=${Origin}&Destination=${Destination}&FlightCabinClass=${FlightCabinClass}&DepartureDate=${format(DepartureDate!, "yyyy-MM-dd")}&ArrivalDate=${format(ArrivalDate!, "yyyy-MM-dd")}`;

  const response = await Api.get<ApiResponse<FlightSearchResult[]>>(
    `/home/searchFlights${queryParams}`,
  );
  return response.data.data;
};
