import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/LA-Cafe/WhyChooseUs";
import BunkHero from "@/components/bunk-stay/Bunkhero/BunkHero";
import BunkStayRooms from "@/components/bunk-stay/BunkStayRooms";

export default function LACafePage() {
  return (
    <>
      <Navbar />
      <BunkHero />
      <BunkStayRooms />
      <WhyChooseUs />
      {/* Next sections will come here */}
      <Footer />
    </>
  );
}
