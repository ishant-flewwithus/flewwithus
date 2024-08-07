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
            <div className="mt-16 max-w-6xl">
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonoru (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.
            </div>
        </div>
        <div className="flex flex-col items-end mt-20">
            <Image src={"/vision_year25.png"} width={1200} height={500} alt="our mission logo"></Image>
            <div className="mt-16 max-w-6xl">
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 o Finibus Bonorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem IpsumLorem ipsum dolor sit amet, comes from a line in section 1.10.32.
            </div>
        </div>
    </Page>
  )
}
