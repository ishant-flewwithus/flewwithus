import ApiResponse from "@/models/ApiResponse";
import { User } from "@/models/User";
import Api from "@/util/Api";
import { cookies } from "next/headers";

// Signup by email + pwd or phone
export const signup = async (
  provider: string,
  email: string | null,
  password: string | null,
  phone: string | null,
) => {
  const response = await Api.post<ApiResponse<any>>(`/user/signup`, {
    provider: provider,
    email: email,
    password: password,
    phone: phone,
  });
  return response.data.success;
};

// Verify by email + pwd or phone
export const verifySignup = async (
  provider: string,
  email: string | null,
  phone: string | null,
  otp: string | null,
) => {
  const response = await Api.post<ApiResponse<any>>(
    `/user/verify-signup`,
    {
      provider: provider,
      email: email,
      phone: phone,
      otp: otp,
    },
    {
      withCredentials: true,
    },
  );
  console.log("Res: ", response);
  console.log("Response Headers:", response.headers);
  const cookies = response.headers["set-cookie"];
  console.log("Cookies:", cookies);
  return response.data.success;
};

// Get logged in user details
export const getUser = async () => {
  const response = await Api.get<ApiResponse<User>>(`/user/get-user`, {
    withCredentials: true,
  });
  
  if (response.data.message === "Not authenticated") {
    return null;
  } else {
    return response.data.data;
  }
};

export const logout = async () => {
  const response = await Api.post<ApiResponse<User>>(`/user/logout`, {
    withCredentials: true,
  });
  return response.data.success;
};
