import Api from "@/util/Api";
import ApiResponse from "../../models/ApiResponse";
import { Airport } from "@/models/Flight";

export const getAirports = async () => {
  const response = await Api.get<ApiResponse<Airport[]>>(`/home/airports`);
  return response.data.data;
};

export const searchAirports = async (query: string) => {
  const response = await Api.get<ApiResponse<Airport[]>>(`/home/airportbycode/?code=${query}`);
  return response.data.data;
};
