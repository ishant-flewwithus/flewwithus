import Page from "@/components/app/Page";
import Image from "next/image";

export default function privacySettings() {
  return (
    <Page headerChild={
      <div className="flex flex-col justify-center items-center">
        <div className="text-center text-5xl text-onprimary my-10 font-light ">
        What can we <span className="font-bold">help you</span> with today?
        </div>
      <div className="h-12 sm:w-[700px]  flex flex-row gap-5">
        <div className="flex w-full h-full bg-white rounded-full cursor-pointer">
          <input type="search" name="search" id="search" placeholder="How can we help you today?" className="w-full border-none rounded-full bg-transparent px-4 py-1"/>
        </div>
        <button className="h-full w-1/3 bg-primary-500 rounded-full border-2 border-white cursor-pointer flex justify-center items-center text-onprimary text-xl">
        Search
        </button>
      </div>
      </div>
    } overlapChildrenOverHeader={true}>
        <div className="flex justify-center mt-24">
          <div className="text-3xl">
            Browse articles by topic
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-4">
            <div className="cursor-pointer">
              <Image src={"/searching_help.png"} width={300} height={300} alt="searching help logo"></Image>
            </div>
            <div className="cursor-pointer">
              <Image src={"/prices_help.png"} width={300} height={300} alt="pricing help logo"></Image>
            </div>
            <div className="cursor-pointer">
              <Image src={"/booking_help.png"} width={300} height={300} alt="bookings help logo"></Image>
            </div>
            <div className="cursor-pointer">
              <Image src={"/travelling_help.png"} width={300} height={300} alt="travel help logo"></Image>
            </div>
            <div className="cursor-pointer">
              <Image src={"/about_help.png"} width={300} height={300} alt="about help logo"></Image>
            </div>
            <div className="cursor-pointer">
              <Image src={"/privacy_help.png"} width={300} height={300} alt="bookings help logo"></Image>
            </div>
          </div>
        </div>

        
    </Page>
  );
}
