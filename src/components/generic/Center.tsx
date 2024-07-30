interface CenterBoxProps {
  children: React.ReactNode;
  className?: string;
}

export default function CenterBox({ children, className }: CenterBoxProps) {
  return (
    <div className={`flex items-center justify-center flex-col gap-4 ${className}`}>
      {children}
    </div>
  );
}
