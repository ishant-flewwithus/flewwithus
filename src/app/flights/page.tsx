import NavBar from "@/components/app/NavBar";
import { DEFAULT_SECTION_GAP } from "@/other/style.constant";
import FlightSearch from "@/components/pages/flight/home/FlightSearch";
import Image from "next/image";

import Footer from "@/components/app/Footer";
import Container from "@/components/generic/Container";
import Features from "@/components/pages/flight/home/Features";
import FAQ from "@/components/pages/flight/home/FAQ";
import Stack from "@/components/generic/Stack";
import Page from "@/components/app/Page";

export default function FlightHome() {
  return (
    <Page>
      <FlightSearch />
      <Features />
      <FAQ />
    </Page>
  );
}
