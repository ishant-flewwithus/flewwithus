interface RoundedButtonBaseProps {
  children: React.ReactNode;
}

export default function RoundedButtonBase({
  children,
}: RoundedButtonBaseProps) {
  return (
    <div className="text-xs flex cursor-pointer items-center justify-between gap-2 rounded-full border border-onprimary bg-onprimary px-4 py-2 font-normal text-primary-500">
      {children}
    </div>
  );
}
