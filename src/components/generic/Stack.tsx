import React from "react";

enum Direction {
  horizontal,
  vertical,
}

interface StackProps {
  children?: React.ReactNode;
  gap: number;
  direction: keyof typeof Direction;
}

export default function Stack({
  children,
  gap = 2,
  direction = "horizontal",
}: StackProps) {
  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: direction === "vertical" ? "column" : "row",
    gap: `${gap}px`,
  };
  return <div style={style}>{children}</div>;
}
