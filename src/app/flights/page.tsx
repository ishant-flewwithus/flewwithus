"use client";
import Section from "@/components/generic/Section";
import NavBar from "@/components/app/NavBar";
import {
  DEFAULT_CONTENT_GAP,
  DEFAULT_SECTION_GAP,
} from "@/other/style.constant";
import FlightSearch from "@/components/pages/flight/home/FlightSearch";
import Box from "@/components/generic/Box";
import Image from "next/image";

import Footer from "@/components/app/Footer";
import Container from "@/components/generic/Container";
import Features from "@/components/pages/flight/home/Features";
import FAQ from "@/components/pages/flight/home/FAQ";
import Stack from "@/components/generic/Stack";

export default function FlightHome() {
  return (
    <div className={`relative h-full`}>
      <div className="absolute left-0 right-0 top-0 z-[-1] w-full">
        <div className="h-screen w-full">
          <Image
            src="/flight_home_image.png"
            fill={true}
            alt="background image"
          />
        </div>
      </div>
      <Container>
        <Stack gap={DEFAULT_SECTION_GAP} direction="vertical">
          <NavBar />
          <FlightSearch />
          <Features />
          <FAQ />
        </Stack>
      </Container>
      <Footer />
    </div>
  );
}
