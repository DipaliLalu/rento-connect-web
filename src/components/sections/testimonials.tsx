import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

import type { CarouselApi } from "../ui/carousel";

const testimonials = [
  {
    text: "Easy onboarding, real leads, and genuine payments.",
    name: "JCB Vendor",
    location: "Vadodara",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&q=60",
  },
  {
    text: "RentoConnect helped me earn from idle machines without any hassle.",
    name: "Equipment Owner",
    location: "Gujarat",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=500&q=60",
  },
  {
    text: "Their response time and support made our shutdown project smooth.",
    name: "Rental Partner",
    location: "Surat",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&q=60",
  },
];

export default function Testimonials() {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [active, setActive] = useState(0);

  // ✅ Sync active dot with carousel
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActive(api.selectedScrollSnap());
    };

    onSelect(); // initial sync
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="py-20 px-4 bg-[url('/bg-texture.jpg')] bg-cover">
      <h2 className="text-center text-3xl font-bold mb-10 text-blue-950">
        Love From Clients
      </h2>

      <Carousel
        plugins={[autoplay.current]}
        opts={{ loop: true }}
        setApi={setApi}
        className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg py-7"
      >
        <CarouselContent>
          {testimonials.map((item, index) => (
            <CarouselItem key={index}>
              <div className="px-16 justify-center flex flex-col md:flex-row gap-6 items-center">
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-48 h-38 rounded-xl object-cover"
                />

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* ✅ Clickable Dots */}
        <div className="flex justify-end gap-2 mt-4 pr-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                active === i
                  ? "bg-blue-900 scale-110"
                  : "bg-orange-300 hover:bg-orange-500"
              }`}
            />
          ))}
        </div>

      </Carousel>
    </section>
  );
}
