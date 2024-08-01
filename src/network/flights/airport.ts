import Api from "@/util/Api";
import ApiResponse from "../../models/ApiResponse";
import { Airport } from "@/models/Flight";

export const getAirports = async () => {
  const response = await Api.get<ApiResponse<Airport[]>>(`/home/airports`);
  return response.data.data;
};
