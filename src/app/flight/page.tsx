import Image from "next/image";
import PlaneSvg from "@/assets/plane.svg";
import HotelsSvg from "@/assets/hotels.svg";
import CabsSvg from "@/assets/cabs.svg";

export default function FlightHome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen relative">
      <div className="absolute top-0 left-0 right-0 w-full z-[-1]">
        <img src="/flight_home_image.png" className="w-full h-screen" />
      </div>
      <div className="flex items-center justify-between p-4">
        <img src="logo_white_icon_text.svg" className="w-40 h-auto" />
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center justify-between gap-2 text-onprimary border-onprimary border px-4 py-2 rounded-full font-normal cursor-pointer bg-primary-500/70 hover:bg-primary-500">
            <Image src={PlaneSvg} width={20} height={20} />
            Flights
          </div>
          <div className="flex items-center justify-between gap-2 text-primary-500 border-onprimary border px-4 py-2 rounded-full font-normal cursor-pointer bg-onprimary hover:bg-onprimary/80">
            <Image src={HotelsSvg} width={20} height={20} />
            Hotels
          </div>
          <div className="flex items-center justify-between gap-2 text-primary-500 border-onprimary border px-4 py-2 rounded-full font-normal cursor-pointer bg-onprimary hover:bg-onprimary/80">
            <Image src={CabsSvg} width={20} height={20} />
            Cabs
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between gap-2 text-primary-500 border-onprimary border px-4 py-2 rounded-full font-normal cursor-pointer bg-onprimary hover:bg-onprimary/80">
            <Image
              src="/emojione-v1_flag-for-india.png"
              width={20}
              height={20}
            />
            <span className="text-sm">IND | ENG | INR</span>
            <span className="text-textbody">|</span>
            <span className="text-sm font-bold">LOGIN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
