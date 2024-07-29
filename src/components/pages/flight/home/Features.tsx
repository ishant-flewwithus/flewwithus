import Section from "@/components/generic/Section";
import Stack from "@/components/generic/Stack";
import Image from "next/image";

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

export default function Features() {
  return (
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
  );
}
