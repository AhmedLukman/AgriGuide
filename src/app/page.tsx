import Carousel from "@/components/sections/Carousel";
import FAQ from "@/components/sections/FAQ";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Partnerships from "@/components/sections/Partnerships";
import Testimonials from "@/components/sections/Testimonials";

const Home = () => {
  return (
    <main>
      <Carousel />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Partnerships />
      <FAQ />
    </main>
  );
};

export default Home;
