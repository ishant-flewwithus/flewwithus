interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="px-1 md:px-6 py-1">{children}</div>;
}
