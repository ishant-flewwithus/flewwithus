"use client";
import Image from "next/image";
import FlightIcon from "@/assets/plane.svg";
import CabIcon from "@/assets/cabs.svg";
import HotelIcon from "@/assets/hotels.svg";
import RoundedButton from "@/components/generic/RoundedButton";
import RoundedButtonBase from "@/components/generic/RoundedButtonBase";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineInfo } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdChecklist } from "react-icons/md";
import { TbArticle } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { ReactNode, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Dialog from "../generic/Dialog";
import Stack from "../generic/Stack";
import TextField from "../generic/TextField";
import Button from "../generic/Button";
import TextWithBackgroundLine from "../generic/TextWithBackgroundLine";
import CenterBox from "../generic/Center";
import { FaPlaneDeparture } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa";
import PhoneNumberPicker from "../generic/PhoneNumberPicker";
import { toast } from "react-toastify";
import * as UserApi from "@/network/flights/user";
import { useSession } from "@/context/sessionContext";

const navLinks = [
  {
    title: "Flights",
    navigateUrl: "/flights",
    icon: FlightIcon,
  },
  {
    title: "Hotels",
    navigateUrl: "/hotels",
    icon: HotelIcon,
  },
  {
    title: "Cabs",
    navigateUrl: "/cabs",
    icon: CabIcon,
  },
];

const navLinksMobile = [
  {
    title: "About us",
    navigateUrl: "/",
    icon: <GiHamburgerMenu />,
  },
  {
    title: "Help",
    navigateUrl: "/",
    icon: <IoIosHelpCircleOutline />,
  },
  {
    title: "Privacy policy",
    navigateUrl: "/",
    icon: <MdOutlinePrivacyTip />,
  },
  {
    title: "Terms of service",
    navigateUrl: "/",
    icon: <MdChecklist />,
  },
  {
    title: "Blog",
    navigateUrl: "/",
    icon: <TbArticle />,
  },
  {
    title: "Privacy Settings",
    navigateUrl: "/",
    icon: <MdOutlineSettings />,
  },
];

interface AuthModalFeatureComponents {
  title: string;
  description: string;
  icon: ReactNode;
}

const AuthModalFeatureComponents = ({
  title,
  description,
  icon,
}: AuthModalFeatureComponents) => {
  return (
    <div className="flex w-full items-center gap-6">
      <div>{icon}</div>
      <div className="flex-1">
        <div className="text-xl font-semibold">{title}</div>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default function NavBar() {
  const [showMobileNavMenu, setShowMobileNavMenu] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const pathname = usePathname();

  const [signupWith, setSignupWith] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [shouldAskForOtp, setShouldAskForOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const signup = async () => {
    try {
      let data;
      if (signupWith === "email") {
        console.log("email auth");
        data = await UserApi.signup("email", email, password, null);
      } else if (signupWith === "phone") {
        console.log("phone auth");
        data = await UserApi.signup("phone", null, null, phoneNumber);
      } else {
        // NO-OP
      }
      if (data) {
        setShouldAskForOtp(true);
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    }
  };

  const verifySignup = async () => {
    try {
      let data;
      if (signupWith === "email") {
        console.log("email auth");
        data = await UserApi.verifySignup("email", email, null, otp);
      } else if (signupWith === "phone") {
        console.log("phone auth");
        data = await UserApi.verifySignup("phone", null, phoneNumber, otp);
      } else {
        // NO-OP
      }
      if (data) {
        setUser(data);
        setShowAuthDialog(false);
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    }
  };

  const { user, setUser } = useSession();
  const router = useRouter();

  const logout = async () => {
    try {
      const isSuccess = await UserApi.logout();
      if (isSuccess) {
        document.cookie = "connect.sid=;"; // TODO: Consider other approach
        setUser(undefined);
        router.push("/");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    }
  };

  const googleSignIn = async () => {
    try {
      window.open(
        `http://localhost:8000/fwu/api/v1/user/google-signin`,
        "_self",
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        {/* LOGO */}
        <div className="relative h-[45px] w-[150px] lg:h-[55px] lg:w-[186px]">
          <Image
            src="/logo_white_icon_text.svg"
            alt="Flew With Us Logo"
            layout="fill"
          />
        </div>

        {/* LINKS */}
        <div className="hidden items-center justify-between gap-4 lg:flex">
          {navLinks?.map((item, index) => (
            <RoundedButton
              key={index}
              title={item.title}
              isSelected={
                "/" + String(pathname).split("/")[1] === item.navigateUrl
              }
              icon={item.icon}
              navigateUrl={item.navigateUrl}
            />
          ))}
        </div>

        {/* SETTINGS BUTTON */}
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex">
            <RoundedButtonBase>
              <Image
                src="/emojione-v1_flag-for-india.png"
                width={20}
                height={20}
                alt="India"
              />
              <span className="text-xs lg:text-sm">IND | ENG | INR</span>
              <span className="text-xs text-textbody lg:text-sm">|</span>
              {!user ? (
                <span
                  className="text-xs font-bold lg:text-sm"
                  onClick={() => setShowAuthDialog(true)}
                >
                  LOGIN
                </span>
              ) : (
                <div className="flex items-center space-x-2">
                  <div
                    className="relative h-7 w-8 overflow-hidden rounded-full border-2 shadow-sm"
                    onClick={() => {
                      router.push("/profile");
                    }}
                  >
                    <Image
                      src="/user_placeholder.jpg"
                      fill={true}
                      alt="profile pic"
                    />
                  </div>
                  <span
                    className="text-xs font-bold lg:text-sm"
                    onClick={() => logout()}
                  >
                    LOGOUT
                  </span>
                </div>
              )}
            </RoundedButtonBase>
          </div>

          <div className="relative lg:hidden">
            <div
              onClick={() => setShowMobileNavMenu(true)}
              className="cursor-pointer text-2xl text-onprimary hover:text-onprimary/90"
            >
              <GiHamburgerMenu />
            </div>
            {showMobileNavMenu && (
              <div className="absolute right-0 z-[250] w-[60vw] rounded-b-xl rounded-l-xl bg-primary-500 p-4 shadow-xl sm:w-[45vw] md:w-[30vw]">
                {navLinksMobile.map((item, index) => (
                  <div
                    key={index}
                    className="flex cursor-pointer items-center gap-3 px-1 py-2 text-onprimary"
                    onClick={() => setShowMobileNavMenu(false)}
                  >
                    <div>{item.icon}</div>
                    {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={showAuthDialog}
        setOpen={setShowAuthDialog}
        hideCloseButton={true}
      >
        <div className="relative h-[600px] w-full">
          {/* BACKGROUND IMAGE */}
          <Image
            src="/auth_bg.webp"
            alt="auth image 1"
            className="absolute inset-0 h-full w-full object-cover"
            fill={true}
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 mx-4 flex h-full w-full items-center justify-center bg-opacity-50 p-6">
            <div className="grid grid-cols-12 gap-2">
              {/* OFFER TEXT */}
              <div className="col-span-6 flex flex-col items-center justify-center gap-4 text-onprimary">
                <div className="w-2/3">
                  <div className="mb-10 text-2xl font-semibold">
                    Sign up now to get
                  </div>

                  <Stack direction="vertical" gap={20}>
                    <AuthModalFeatureComponents
                      title="FLAT 10% OFF"
                      description="On Domestic Flight*"
                      icon={<FaPlaneDeparture size={25} />}
                    />
                    <AuthModalFeatureComponents
                      title="FLAT 20% OFF"
                      description="On Domestic Hotels*"
                      icon={<FaHotel size={25} />}
                    />
                  </Stack>
                </div>
              </div>
              {/* AUTH FORM */}
              <div className="col-span-6 text-onprimary">
                <div className="my-4 rounded-xl bg-white p-8 text-textheading">
                  <Stack direction="vertical" gap={20}>
                    {shouldAskForOtp ? (
                      <>
                        <TextField
                          type="number"
                          label="OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                        <Button onClick={() => verifySignup()}>Continue</Button>
                      </>
                    ) : (
                      <>
                        {signupWith === "email" ? (
                          <>
                            <TextField
                              type="email"
                              label="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                              type="password"
                              label="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button onClick={() => signup()}>Continue</Button>
                          </>
                        ) : (
                          <>
                            <PhoneNumberPicker
                              label="Phone Number"
                              value={phoneNumber}
                              setValue={setPhoneNumber}
                            />
                            <Button onClick={() => signup()}>Continue</Button>
                          </>
                        )}
                      </>
                    )}

                    <div
                      className="cursor-pointer text-center font-semibold text-green-600"
                      onClick={() => {
                        signupWith === "email"
                          ? setSignupWith("phone")
                          : setSignupWith("email");
                      }}
                    >
                      Or signup with{" "}
                      {signupWith === "email" ? "Phone Number" : "Email"}
                    </div>

                    <TextWithBackgroundLine title="Use auth providers" />
                    <CenterBox>
                      <div onClick={() => googleSignIn()}>
                        <Image
                          src="/google_signin.png"
                          width={43}
                          height={43}
                          alt="google sign in"
                          className="cursor-pointer"
                        />
                      </div>

                      <div className="text-center text-xs">
                        By proceeding in, you agree to Flew With Us&apos;s terms
                        and conditions
                      </div>
                    </CenterBox>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
