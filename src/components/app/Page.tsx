import Image from "next/image";
import Container from "../generic/Container";
import Stack from "../generic/Stack";
import NavBar from "./NavBar";
import { DEFAULT_SECTION_GAP } from "@/other/style.constant";
import Footer from "./Footer";

interface PageProps {
  children?: React.ReactNode;
}

export default function Page({ children }: PageProps) {
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
          {children}
        </Stack>
      </Container>
      <Footer />
    </div>
  );
}
