
import Page from "@/components/app/Page";
import Image from "next/image";

export default function page() {
  return (
    <Page headerChild={
      <div className="text-center text-5xl text-onprimary my-10 font-bold ">
        Privacy Policy
      </div>
    } overlapChildrenOverHeader={true}>
        <div className="flex justify-center mt-16">
            <Image src={"/aboutuslogo.png"} width={230} height={230} alt="about us logo"></Image>
        </div>
        
    </Page>
  )
}
