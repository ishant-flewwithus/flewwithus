import Page from "@/components/app/Page";
import Image from "next/image";

export default function page() {
  return (
    <Page headerChild={
      <div className="text-center text-5xl text-onprimary my-10 font-bold ">
        About Us
      </div>
    } overlapChildrenOverHeader={true}>
        <div className="flex justify-center mt-16">
            <Image src={"/aboutuslogo.png"} width={230} height={230} alt="about us logo"></Image>
        </div>
        <div className="flex justify-center">
            <Image src={"/ourstory.png"} width={500} height={500} alt="our story logo"></Image>
        </div>
        <div className="flex justify-center mt-4">
            <Image src={"/about_portrate.png"} width={500} height={500} alt="our mission logo"></Image>
        </div>
        <div className="flex flex-col justify-start mt-20">
            <Image src={"/vision_year24.png"} width={1200} height={500} alt="our vision logo"></Image>
            <div className="mt-16 max-w-6xl text-lg">
            Our vision for 2024 is to help every traveler explore the world effortlessly, ensuring that the joys and wonders of travel are accessible for generations to come. We aim to create seamless, enriching experiences that transcend borders and cultural barriers, leveraging cutting-edge technology and sustainable practices. By fostering a global community of explorers, we are committed to making travel more intuitive, inclusive, and impactful, so that every journey is not just a trip, but a meaningful adventure that leaves a positive legacy for future generations.
            </div>
        </div>
        <div className="flex flex-col items-end mt-20 mb-8">
            <Image src={"/vision_year25.png"} width={1200} height={500} alt="our mission logo"></Image>
            <div className="mt-16 max-w-6xl text-lg">
            By 2025, we aim to ensure that every traveler can explore the world effortlessly, creating lasting memories for generations to come. Our focus is on developing innovative travel solutions that simplify journeys, making them more accessible, enjoyable, and sustainable. Embracing new technologies and fostering a spirit of global connectivity, we strive to break down barriers and enhance the travel experience for everyone. Our commitment is to provide seamless and meaningful adventures, ensuring that the joy of discovery and exploration continues to inspire and connect people across the globe for years to come.
            </div>
        </div>
    </Page>
  )
}
