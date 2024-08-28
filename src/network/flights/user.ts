import ApiResponse from "@/models/ApiResponse";
import { User } from "@/models/User";
import Api from "@/util/Api";
import { profileUpdateValidator } from "@/util/validator";
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
  const response = await Api.post<ApiResponse<User | null>>(
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

  return response.data.data;
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

// Logout
export const logout = async () => {
  const response = await Api.post<ApiResponse<User>>(
    `/user/logout`,
    {},
    {
      withCredentials: true,
    },
  );
  return response.data.success;
};

// Update profile
export const updateProfile = async (
  _id: string,
  username: string,
  dateOfBirth: Date,
  gender: string,
) => {
  const response = await Api.post<ApiResponse<User>>(`/user/update`, {
    _id,
    username,
    dateOfBirth,
    gender,
  });
  return response.data.success;
};
