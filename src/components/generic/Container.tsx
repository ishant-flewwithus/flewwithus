interface ContainerProps {
  children?: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="px-5 sm:px-10 md:px-15 lg:px-20 py-8">{children}</div>;
}
