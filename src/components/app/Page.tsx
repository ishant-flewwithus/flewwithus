import Image from "next/image";
import Container from "../generic/Container";
import Stack from "../generic/Stack";
import NavBar from "./NavBar";
import { DEFAULT_SECTION_GAP } from "@/constants/style.constant";
import Footer from "./Footer";
import { toast } from "react-toastify";
import * as UserApi from "@/network/flights/user";
import { useEffect } from "react";
interface PageProps {
  headerChild?: React.ReactNode;
  children?: React.ReactNode;
  overlapChildrenOverHeader?: boolean;
}

export const revalidate = 0;

export default function Page({
  children,
  headerChild,
  overlapChildrenOverHeader = false,
}: PageProps) {
  return (
    <div>
      <div className="relative">
        {/* HEADER CHILD */}
        <div className="w-full">
          {/* BACKGROUND IMAGE */}
          {/* <div className="absolute left-0 right-0 top-0 z-[-1] h-full w-full">
            <div className="h-full w-full">
              <Image
                src="/flight_home_image.png"
                fill={true}
                alt="background image"
              />
            </div>
          </div> */}
          <div className="absolute left-0 right-0 top-0 z-[-1] h-full w-full bg-gradient-to-r from-[#333690] to-[#8E92EA]"></div>
          <div className="bg-transparent">
            {/* HEADER CONTENT */}
            <Container>
              <Stack gap={DEFAULT_SECTION_GAP} direction="vertical">
                <NavBar />
                <div className="mb-4">{headerChild}</div>
                {overlapChildrenOverHeader && <div></div>}
              </Stack>
            </Container>
          </div>
        </div>
      </div>
      {/* CHILDREN */}
      <div>
        <Container>
          <div className={overlapChildrenOverHeader ? "mt-[-80px]" : "mt-0"}>
            <Stack gap={DEFAULT_SECTION_GAP} direction="vertical">
              {children}
            </Stack>
          </div>
        </Container>
        <Footer />
      </div>
    </div>
  );
}
