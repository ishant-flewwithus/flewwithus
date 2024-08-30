import { SelectOption } from "@/components/generic/Select";
import Countries from "world-countries";

export const COUNTRY_CODE_OPTIONS: SelectOption[] = Countries
  // Filter countries if needed (e.g., remove countries without phone codes)
  .filter((c) => c.idd.root)
  // Sort countries by name in ascending order
  .sort((a, b) => a.name.official.localeCompare(b.name.official))
  // Flatten the mapped result
  .flatMap((c) =>
    c.idd.suffixes.map((cs) => ({
      label: `(${c.idd.root}${cs}) ${c.name.official}`,
      value: `${c.idd.root}${cs}`,
    })),
  );

export const INDIAN_STATES: SelectOption[] = [
  { label: "Andhra Pradesh", value: "andhra pradesh" },
  { label: "Arunachal Pradesh", value: "arunachal pradesh" },
  { label: "Assam", value: "assam" },
  { label: "Bihar", value: "bihar" },
  { label: "Chhattisgarh", value: "chhattisgarh" },
  { label: "Goa", value: "goa" },
  { label: "Gujarat", value: "gujarat" },
  { label: "Haryana", value: "haryana" },
  { label: "Himachal Pradesh", value: "himachal pradesh" },
  { label: "Jharkhand", value: "jharkhand" },
  { label: "Karnataka", value: "karnataka" },
  { label: "Kerala", value: "kerala" },
  { label: "Madhya Pradesh", value: "madhya pradesh" },
  { label: "Maharashtra", value: "maharashtra" },
  { label: "Manipur", value: "manipur" },
  { label: "Meghalaya", value: "meghalaya" },
  { label: "Mizoram", value: "mizoram" },
  { label: "Nagaland", value: "nagaland" },
  { label: "Odisha", value: "odisha" },
  { label: "Punjab", value: "punjab" },
  { label: "Rajasthan", value: "rajasthan" },
  { label: "Sikkim", value: "sikkim" },
  { label: "Tamil Nadu", value: "tamil nadu" },
  { label: "Telangana", value: "telangana" },
  { label: "Tripura", value: "tripura" },
  { label: "Uttar Pradesh", value: "uttar pradesh" },
  { label: "Uttarakhand", value: "uttarakhand" },
  { label: "West Bengal", value: "west bengal" },
  {
    label: "Andaman and Nicobar Islands",
    value: "andaman and nicobar islands",
  },
  { label: "Chandigarh", value: "chandigarh" },
  {
    label: "Dadra and Nagar Haveli and Daman and Diu",
    value: "dadra and nagar haveli and daman and diu",
  },
  { label: "Lakshadweep", value: "lakshadweep" },
  { label: "Delhi", value: "delhi" },
  { label: "Puducherry", value: "puducherry" },
  { label: "Ladakh", value: "ladakh" },
  { label: "Jammu and Kashmir", value: "jammu and kashmir" },
];
