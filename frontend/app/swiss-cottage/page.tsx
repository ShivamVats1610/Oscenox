import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SwissHero from "@/components/swiss-cottage/SwissHero/SwissHero";
import SwissCottageRooms from "@/components/swiss-cottage/SwissCottageRooms";
import SwissCottageAmenities from "@/components/swiss-cottage/SwissCottageAmenities";
import AboutSwissCotage from "@/components/swiss-cottage/AboutSwissCotage";

export default function SwissCottagePage() {
  return (
    <>
      <Navbar />
      <SwissHero />
      <SwissCottageRooms />
      <AboutSwissCotage />
      <SwissCottageAmenities/>
      {/* Next sections will come here */}
      <Footer />
    </>
  );
}
