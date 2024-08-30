import Box from "./Box";

interface SectionProps {
  title?: String;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export default function Section({ title, children, actions }: SectionProps) {
  return (
    <Box>
      <div className="flex items-center justify-between">
        {title && (
          <div className="z-[2] text-2xl font-medium md:text-3xl">{title}</div>
        )}
        <div>{actions}</div>
      </div>
      <div className={`${title ? "mt-4" : "mt-0"}`}>{children}</div>
    </Box>
  );
}
