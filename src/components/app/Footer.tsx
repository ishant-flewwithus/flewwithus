import Image from "next/image";
import Logo from "@/assets/white-flew-logo-footer.svg";
import Link from "next/link";
import { FaSquareFacebook } from "react-icons/fa6";
import { ImTwitter } from "react-icons/im";
import { BsYoutube } from "react-icons/bs";
import { RiInstagramLine } from "react-icons/ri";

export default function Footer() {
  const footerLinks = [
    { title: "Help", url: "/" },
    { title: "Privacy Policy", url: "/" },
    { title: "Terms of service", url: "/" },
    { title: "Privacy Settings", url: "/privacy-settings" },
    { title: "Login", url: "/" },
    { title: "About Us", url: "/about" },
    { title: "Flights", url: "/" },
    { title: "Hotels", url: "/" },
    { title: "Car hire", url: "/" },
    { title: "Blog", url: "/" },
  ];

  const secondaryLinks = [
    { title: "Privacy Policy", url: "/" },
    { title: "Terms & Conditions", url: "/" },
  ];

  return (
    <div className="relative bg-gradient-to-r from-[#333690] via-[#4D51B0] to-[#8E92EA] px-6 py-6 text-onprimary lg:px-10 lg:py-20">
      <div className="absolute right-0 flex items-start opacity-5 lg:opacity-15">
        <Image src="/footer_img.png" width={588} height={379} alt="footer" />
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 flex items-start justify-center border-b border-onprimary lg:col-span-4 lg:justify-start lg:border-b-0">
          <Image src={Logo} alt="logo" width={166} height={128} />
        </div>
        <div className="col-span-12 grid grid-cols-2 gap-4 py-10 lg:col-span-4">
          {footerLinks?.map((item, index) => (
            <div className="text-sm sm:text-base lg:text-left" key={index}>
              <Link href={item.url}>{item.title}</Link>
            </div>
          ))}
        </div>
        <div className="col-span-12 flex items-start justify-center gap-4 lg:col-span-4 z-[2]">
          <a href="#">
            <Image
              src="/apple_download.png"
              width={167}
              height={58}
              alt="apple app"
            />
          </a>
          <a href="#">
            <Image
              src="/playstore_download.png"
              width={167}
              height={58}
              alt="google app"
            />
          </a>
        </div>
      </div>
      <div className="my-10 h-[1px] bg-[rgba(255,255,255,0.7)]"></div>
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0">
        <div className="flex items-center gap-4">
          {secondaryLinks?.map((item, index) => (
            <div className="text-sm sm:text-base" key={index}>
              <Link href={item.url}>{item.title}</Link>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="font-bold">Follow us:</span>
          <a href="#">
            <FaSquareFacebook />
          </a>
          <a href="#">
            <ImTwitter />
          </a>
          <a href="#">
            <BsYoutube />
          </a>
          <a href="#">
            <RiInstagramLine />
          </a>
        </div>
      </div>
    </div>
  );
}
