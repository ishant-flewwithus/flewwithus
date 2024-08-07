interface ContainerProps {
  children?: React.ReactNode;
}

export default function Container({
  children,
}: ContainerProps) {
  return <div className="px-2 py-8 sm:px-10 md:px-15 lg:px-20">{children}</div>;
}
