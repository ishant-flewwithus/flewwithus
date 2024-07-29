import Box from "./Box";

interface SectionProps {
  title: String;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export default function Section({ title, children, actions }: SectionProps) {
  return (
    <Box>
      <div className="flex items-center justify-between">
        <div className="z-[2] text-2xl md:text-3xl font-medium">{title}</div>
        <div>{actions}</div>
      </div>
      <div className="mt-4">{children}</div>
    </Box>
  );
}
