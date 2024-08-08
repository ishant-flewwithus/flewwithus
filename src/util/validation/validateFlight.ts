import { AirportDBItem, FlightSearchParams } from "@/models/Flight";
import { isValid, parseISO, isBefore, subDays } from "date-fns";

export function validateFlightSearchParams(params: FlightSearchParams): void {
  const {
    AdultCount = "0",
    ChildCount = "0",
    InfantCount = "0",
    JourneyType = "0",
    Origin = "",
    Destination = "",
    DepartureDate = "",
    ArrivalDate = "",
    FlightCabinClass = "1",
  } = params;

  let errMsg: string | undefined = undefined;

  const totalPassengers =
    parseInt(AdultCount) + parseInt(ChildCount) + parseInt(InfantCount);

  if (totalPassengers <= 0) {
    errMsg = "Please select at least one person";
  } else if (totalPassengers >= 9) {
    errMsg = "You can only select up to 9 people per flight";
  } else if (Origin.length < 3) {
    errMsg = "From destination is invalid";
  } else if (Destination.length < 3) {
    errMsg = "To destination is invalid";
  } else if (!isValid(parseISO(DepartureDate))) {
    errMsg = "Departure date is invalid";
  } else if (isBefore(parseISO(DepartureDate), subDays(new Date(), 1))) {
    errMsg = "Departure date must be today or later";
  } else if (!["1", "2"].includes(JourneyType)) {
    errMsg = "Invalid Journey Type";
  } else if (JourneyType === "2") {
    if (!isValid(parseISO(ArrivalDate))) {
      errMsg = "Return date is invalid";
    } else if (isBefore(parseISO(ArrivalDate), parseISO(DepartureDate))) {
      errMsg = "Arrival Date should be after Departure Date";
    }
  } else if (!["1", "2", "3"].includes(FlightCabinClass)) {
    errMsg = "Invalid flight class";
  }

  if (errMsg) {
    throw new Error(errMsg);
  }
}

export function isAirportDBItem(obj: any) {
  return (
    obj !== undefined &&
    obj.AIRPORTCODE !== undefined &&
    obj.AIRPORTNAME !== undefined &&
    obj.TERMINAL !== undefined &&
    obj.CITYCODE !== undefined &&
    obj.CITYNAME !== undefined &&
    obj.COUNTRYCODE !== undefined &&
    obj.COUNTRYNAME !== undefined
  );
}
