import { z } from "zod";
import { parseISO, isValid, isBefore, subDays } from "date-fns";

export const searchFlightParamsSchema = z
  .object({
    AdultCount: z
      .string({ message: "Invalid adult count" })
      .transform((val) => parseInt(val, 10))
      .optional()
      .default("0"),
    ChildCount: z
      .string({ message: "Invalid child count" })
      .transform((val) => parseInt(val, 10))
      .optional()
      .default("0"),
    InfantCount: z
      .string({ message: "Invalid infant count" })
      .transform((val) => parseInt(val, 10))
      .optional()
      .default("0"),
    JourneyType: z
      .string({ message: "Invalid journey type" })
      .transform((val) => parseInt(val, 10))
      .refine((val) => [1, 2].includes(val), {
        message: "Invalid journey type",
      }),
    Origin: z.string().length(3, { message: "Invalid origin place" }),
    Destination: z.string().length(3, { message: "Invalid destination place" }),
    DepartureDate: z.date().refine((val) => isValid(val), {
      message: "Invalid departure date",
    }),
    ArrivalDate: z.date().refine((val) => isValid(val), {
      message: "Invalid arrival date",
    }),
    FlightCabinClass: z
      .number()
      .refine((val) => [1, 2, 3].includes(val), {
        message: "Invalid flight class type",
      }),
  })
  .refine(
    (data) => {
      const totalPassengers =
        data.AdultCount + data.ChildCount + data.InfantCount;
      return totalPassengers > 0;
    },
    {
      message: "Please select at least one adult, child, or infant",
    },
  )
  .refine(
    (data) => {
      const parsedDepartureDate = data.DepartureDate;
      const parsedArrivalDate = data.ArrivalDate;
      return (
        !isBefore(parsedDepartureDate, subDays(new Date(), 1)) &&
        !isBefore(parsedArrivalDate, parsedDepartureDate)
      );
    },
    {
      message: "Arrival date must be ahead of departure date",
    },
  );
