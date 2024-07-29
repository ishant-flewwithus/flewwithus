import { useEffect, useState } from "react";

enum ChipType {
  contained,
  outlined,
}

interface ChipProps {
  label: string;
  variant: keyof typeof ChipType;
  isSelected: boolean;
}

export default function Chip({ label, variant, isSelected }: ChipProps) {
  const [type, setType] = useState<keyof typeof ChipType>("outlined");
  useEffect(() => {
    let type: keyof typeof ChipType;
    if (isSelected) {
      setType("contained");
    } else {
      if (variant) {
        setType(variant);
      } else {
        setType("outlined");
      }
    }
  }, [variant, isSelected]);

  return (
    <div
      className={`cursor-pointer rounded-full ${type === "contained" ? "border border-primary-500 bg-primary-500 px-4 py-1 text-onprimary hover:bg-primary-600" : "border border-gray-500 bg-white px-4 py-1 text-textheading hover:bg-gray-200"}`}
    >
      {label}
    </div>
  );
}
