import ApiResponse from "@/models/ApiResponse";
import { FlightDetails } from "@/models/Flight";
import Api from "@/util/Api";
import { format } from "date-fns";

interface FlightSearchBody {
  AdultCount?: string;
  ChildCount?: string;
  InfantCount?: string;
  JourneyType?: string;
  Origin?: string;
  Destination?: string;
  FlightCabinClass?: string;
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
  let queryParams;
  if (JourneyType === "1") {
    queryParams = `?AdultCount=${AdultCount}&ChildCount=${ChildCount}&InfantCount=${InfantCount}&JourneyType=${JourneyType}&Origin=${Origin}&Destination=${Destination}&FlightCabinClass=${FlightCabinClass}&DepartureDate=${format(DepartureDate!, "yyyy-MM-dd")}&ArrivalDate=${format(DepartureDate!, "yyyy-MM-dd")}`;
  } else {
    queryParams = `?AdultCount=${AdultCount}&ChildCount=${ChildCount}&InfantCount=${InfantCount}&JourneyType=${JourneyType}&Origin=${Origin}&Destination=${Destination}&FlightCabinClass=${FlightCabinClass}&DepartureDate=${format(DepartureDate!, "yyyy-MM-dd")}&ArrivalDate=${format(DepartureDate!, "yyyy-MM-dd")}&ReturnArrivalDate=${format(ArrivalDate!, "yyyy-MM-dd")}&ReturnDepartureDate=${format(ArrivalDate!, "yyyy-MM-dd")}&ReturnFlightCabinClass=${FlightCabinClass}`;
  }
  const response = await Api.get<ApiResponse<FlightDetails[]>>(
    `/home/searchFlights${queryParams}`,
  );
  return response.data.data;
};

export const getFlightDetails = async (resultIndex: string) => {
  const response = await Api.get<ApiResponse<FlightDetails[]>>(
    `/home/fareRule?ResultIndex=${resultIndex}`,
    {
      withCredentials: true,
    },
  );
  return response.data.data;
};
