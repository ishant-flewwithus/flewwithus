interface BoxProps {
    children?: React.ReactNode;
  }
  
  export default function Box({ children }: BoxProps) {
    return <div className="bg-onprimary p-6 rounded-2xl shadow-md">{children}</div>;
  }
  