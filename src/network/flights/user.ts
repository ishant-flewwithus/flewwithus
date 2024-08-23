import ApiResponse from "@/models/ApiResponse";
import Api from "@/util/Api";

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

// export const sendPhoneOTP = async (phone: string, otp: string) => {
//   const response = await Api.post<ApiResponse<any>>(`/user/send-phone-otp`, {
//     phone: phone,
//     otp: otp,
//   });
//   return response.data.data;
// };

// export const verifyEmailOTP = async (email: string, password: string) => {
//   const response = await Api.post<ApiResponse<any>>(`/user/verify-email-otp`, {
//     email: email,
//     password: password,
//   });
//   return response.data.success;
// };

// export const verifyPhoneOTP = async (phone: string, otp: string) => {
//   const response = await Api.post<ApiResponse<any>>(`/user/verify-phone-otp`, {
//     phone: phone,
//     otp: otp,
//   });
//   return response.data.data;
// };
