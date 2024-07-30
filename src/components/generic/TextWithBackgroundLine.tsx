interface TextWithBackgroundLineProps {
  title: string;
}

export default function TextWithBackgroundLine({
  title,
}: TextWithBackgroundLineProps) {
  return (
    <div className="my-1">
      <div className="relative">
        <div className="absolute h-[0.5px] w-full bg-gray-300"></div>
        <div className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 transform bg-white px-2 py-1 text-sm font-bold text-primary-500">
          {title}
        </div>
      </div>
    </div>
  );
}
