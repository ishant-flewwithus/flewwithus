enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export interface Country {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: Country;
  zipCode: string;
}

export interface User {
  username?: string;
  email?: string;
  password?: string;
  gender?: Gender;
  dateOfBirth?: Date;
  passportNo?: string;
  passportExpiry?: Date;
  passportIssuingCountry?: Country;
  panNo?: string;
  nationality?: Country;
  address?: Address;
  phone: string;
  userType?: "Admin" | "Client";
  profilePic?: string;
  wallet?: number;
  refCode?: string;
  deviceId?: string;
  deviceToken?: string;
  googleId?: string;
  resetPasswordExpiry: number;
  resetPasswordToken: string;
  isVerified: boolean;
}
