import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

const heroSlides = [
  "/1250_368/Type_Main.png",
  "/1250_368/Type_Equipment.png",
  "/1250_368/Type_Experts.png",
  "/1250_368/Type_Mobility.png",
];

const HeroSection = () => {
  const locations = useLocation();
  const canonical = `${import.meta.env.VITE_URL}${locations.pathname}`;

  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      {/* ================= SEO ================= */}
      <Helmet>
        <title>Home | Rento Connect</title>
        <meta
          name="description"
          content="Rento Connect Equipment Experts Mobility"
        />
        <meta name="keywords" content="Rento Connect" />
        <meta name="author" content="Rento Connect" />
        <link rel="canonical" href={canonical} />

        <meta
          property="og:title"
          content="Home | Rento Connect Equipment Experts Mobility"
        />
        <meta property="og:site_name" content="Rento Connect" />
        <meta
          property="og:description"
          content="Rento Connect Equipment Experts Mobility"
        />
        <meta
          property="og:image"
          content="https://rentoconnect.propheticdevelopers.com/3D-Effects.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="Rento Connect" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />

        <meta name="twitter:title" content="Rento Connect" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Rento Connect Equipment Experts Mobility"
        />
        <meta
          name="twitter:image"
          content="https://rentoconnect.propheticdevelopers.com/3D-Effects.png"
        />
      </Helmet>

      <main className="flex-grow">
        {/* ================= HERO SECTION ================= */}
        <section className="relative bg-blue-900 text-primary-foreground py-10 md:h-92 overflow-hidden">

          {/* 🔁 Background Slider */}
          <Carousel
            setApi={setApi}
            plugins={[autoplay.current]}
            opts={{ loop: true }}
            className="absolute inset-0"
          >
            <CarouselContent>
              {heroSlides.map((img, index) => (
                <CarouselItem
                  key={index}
                  className="relative min-h-[500px]"
                >
                  <div
                    className="absolute inset-0 lg:bg-contain bg-cover 2xl:bg-cover 2xl:bottom-0 md:bottom-32 bg-center bg-no-repeat opacity-60 transition-all duration-700"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* 🌑 Overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* 🧾 Content */}
          <div className="relative z-10 flex flex-col gap-8 justify-center items-center text-center">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
              Your On-Demand B2B Industrial Services Platform
            </h1>

            <p className="max-w-3xl mx-auto text-lg md:text-xl">
              Instantly connect with verified experts, rent heavy equipment, and
              arrange mobility solutions across India.
            </p>

            <div className="flex items-center gap-3 justify-center">
              <Button
                variant="custom"
                data-active={locations.pathname === "/services"}
              >
                <Link to="/services">Find a Service</Link>
              </Button>

              <Button
                variant="custom"
                data-active={
                  locations.pathname === "/vendor-register"
                }
              >
                <Link to="/vendor-register">Become a Vendor</Link>
              </Button>
            </div>
          </div>

          {/* 🔘 DOTS NAVIGATION */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index, true)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300
                  ${current === index
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default HeroSection;
