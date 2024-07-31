enum ContainerSizeTypes {
  small,
  normal,
}

interface ContainerProps {
  children?: React.ReactNode;
  size?: keyof typeof ContainerSizeTypes;
}

export default function Container({
  children,
  size = "normal",
}: ContainerProps) {
  return (
    <div
      className={`${size === "small" ? "px-3 py-8 sm:px-5 md:px-10 lg:px-10" : "md:px-15 px-5 py-8 sm:px-10 lg:px-20"}`}
    >
      {children}
    </div>
  );
}
