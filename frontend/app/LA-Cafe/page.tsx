import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LAHero from "@/components/LA-Cafe/LAhero/LAHero";
import LACafeIntro from "@/components/LA-Cafe/LACafeIntro";
import LAAmenities from "@/components/LA-Cafe/LAAmenities";
import LAOverviewOverlap from "@/components/LA-Cafe/LAOverviewOverlap";
import WhyChooseUs from "@/components/LA-Cafe/WhyChooseUs";

export default function LACafePage() {
  return (
    <>
      <Navbar />
      <LAHero />
      <LAOverviewOverlap />
      <LACafeIntro />
      <LAAmenities />
      <WhyChooseUs />
      {/* Next sections will come here */}
      <Footer />
    </>
  );
}
