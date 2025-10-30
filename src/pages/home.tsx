import HeroSection from "../components/sections/hero-section";
import Services from "../components/sections/services";
import StepsSection from "../components/sections/steps";
import WhyChooseSection from "../components/sections/whychoose";
import SuccessStorySection from "../components/sections/success-story";
import Testimonials from "../components/sections/testimonials";
import AboutSection from "../components/sections/about-section";
import CallToAction from "../components/sections/call-to-section";

function Home() {
  
  return (
    <>
        <HeroSection />
        <Services />
        <StepsSection />
        <WhyChooseSection />
        <SuccessStorySection />
        <Testimonials />
        <AboutSection />
        <CallToAction />
    </>
  );
}

export default Home;
