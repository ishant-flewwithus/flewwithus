"use client";
import Section from "@/components/generic/Section";
import NavBar from "@/components/app/NavBar";
import Stack from "@/components/generic/Stack";
import {
  DEFAULT_CONTENT_GAP,
  DEFAULT_SECTION_GAP,
} from "@/other/style.constant";
import FlightSearch from "@/components/pages/flight/home/FlightSearch";
import Box from "@/components/generic/Box";
import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const informationCarouselData = [
  {
    title: "#1 PRODUCT OFFERING",
    description:
      "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsuLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum.Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ips",
  },
  {
    title: "#2 PRODUCT OFFERING",
    description:
      "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsuLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum.Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ips",
  },
  {
    title: "#3 PRODUCT OFFERING",
    description:
      "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsuLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum.Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ips",
  },
  {
    title: "#4 PRODUCT OFFERING",
    description:
      "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsuLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum.Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ips",
  },
  {
    title: "#5 PRODUCT OFFERING",
    description:
      "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsuLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum Lorem IpsumLorem Ipsum.Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ips",
  },
];

export default function FlightHome() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 2,
    speed: 500,
  };

  return (
    <><Section fullHeight={true} backgroundImageUrl="/flight_home_image.png">
      <Stack gap={DEFAULT_SECTION_GAP} direction="vertical">
        <NavBar />
        <FlightSearch />
        <Box>
          <div className="relative h-[300px] w-full">
            <div className="z-[2] text-3xl font-medium">
              Information Flew with Us
            </div>
            <div className="slider-container mt-14">
              <Slider {...settings}>
                {informationCarouselData.map((item, index) => (
                  <div key={index} className="p-4 rounded-xl bg-background w-[500px mr-4]">
                    <div className="text-xl font-semibold">{item.title}</div>
                    <div className="text-sm">{item.description}</div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </Box>
      </Stack>
    </Section>
        <Footer />
    </>
  );
}
