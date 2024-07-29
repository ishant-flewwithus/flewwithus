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
import { LegacyRef, RefAttributes, useRef, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "@/components/Footer";
import Container from "@/components/generic/Container";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const faqCarouselData = [
  {
    title: "How do I book a flight on Flew With Us?",
    description:
      "To book a flight, visit the Flew With Us website or mobile app. Enter your departure and destination cities, travel dates, and passenger details. Browse available flights, select your preferred option, and complete the booking process.",
  },
  {
    title: "Can I book a hotel and train along with my flight on Flew With Us?",
    description:
      "Yes, Flew With Us offers a one-stop solution for your travel needs. You can book hotels and trains in addition to your flight reservation, providing a seamless travel experience.",
  },
  {
    title: "What information do I need to provide for a flight booking?",
    description:
      "You'll need to provide passenger details, including names and contact information. Additionally, you'll need payment details to complete the booking.",
  },
  {
    title: "How do I check my flight status on Flew With Us?",
    description:
      "You can check your flight status by logging into your Flew With Us account and navigating to the My Trips section. Alternatively, you can use our flight status tool by entering your flight details.",
  },
  {
    title: "What is the Flew With Us cancellation policy?",
    description:
      "Flew With Us follows a cancellation policy that may vary depending on the service (flight, hotel, or train) and the specific terms of your booking. Please refer to the terms and conditions during the booking process for detailed cancellation information.",
  },
  {
    title: "Do I need to create an account to book on Flew With Us?",
    description:
      "While browsing is open to all users, creating a Flew With Us account allows you to access additional features, store your travel preferences, and track your bookings in one convenient place.",
  },
];

const informationCardsData = [
  {
    iconUrl: "/info_a.png",
    title: "Seamless Booking Experience",
    description:
      "Easily book your flights with our user-friendly platform, offering quick searches, flexible options, and secure transactions.",
  },
  {
    iconUrl: "/info_b.png",
    title: "Best Price Guarantee",
    description:
      "Enjoy competitive fares and exclusive deals, ensuring you get the best value for your money every time you book.",
  },
  {
    iconUrl: "/info_c.png",
    title: "24/7 Customer Support",
    description:
      "Rely on our dedicated support team, available around the clock to assist with your booking and travel needs.",
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
    dots: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          centerPadding: "0px",
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slider = useRef<Slider>(null);

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
          <Section title="Information Flew With Us">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {informationCardsData?.map((item, index) => (
                <div key={index} className="rounded-lg bg-background p-8">
                  <Stack gap={10} direction="vertical">
                    <div className="flex items-center justify-center">
                      <Image
                        src={item.iconUrl}
                        width={60}
                        height={60}
                        alt={item.title}
                      />
                    </div>
                    <div className="text-center text-lg font-semibold">
                      {item.title}
                    </div>
                    <div className="text-center text-sm text-textbody">
                      {item.description}
                    </div>
                  </Stack>
                </div>
              ))}
            </div>
          </Section>
          <Section
            title="Frequently Asked Questions"
            actions={
              <div>
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => slider?.current?.slickPrev()}
                    className="cursor-pointer rounded-md bg-primary-50 p-2 hover:bg-primary-100"
                  >
                    <MdChevronLeft />
                  </button>
                  <button
                    onClick={() => slider?.current?.slickNext()}
                    className="cursor-pointer rounded-md bg-primary-50 p-2 hover:bg-primary-100"
                  >
                    <MdChevronRight />
                  </button>
                </div>
              </div>
            }
          >
            <div className="slider-container mt-4">
              <Slider ref={slider} {...settings}>
                {faqCarouselData.map((item, index) => (
                  <div key={index} className="overflow-hidden px-2 md:px-8 py-2">
                    <div className="w-full self-stretch rounded-xl bg-[#F1F9FF] px-2 md:px-8 py-4">
                      <div className="text-xl font-semibold">
                        Q{index + 1}. {item.title}
                      </div>
                      <div className="mt-2 text-sm">{item.description}</div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </Section>
        </Stack>
      </Container>
    </div>
  );
}
