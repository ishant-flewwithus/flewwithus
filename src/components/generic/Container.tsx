interface ContainerProps {
  children?: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="px-1 md:px-10 py-8">{children}</div>;
}
