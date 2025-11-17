import { FaStar } from "react-icons/fa6"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

const testimonials = [
  {
    text: "Easy onboarding, real leads, and genuine payments.",
    name: "JCB Vendor",
    location: "Vadodara",
    rating: 5,
  },
  {
    text: "RentoConnect helped me earn from idle machines without any hassle.",
    name: "Equipment Owner",
    location: "Gujarat",
    rating: 5,
  },
  {
    text: "Their response time and support made our shutdown project smooth.",
    name: "Rental Partner",
    location: "Surat",
    rating: 4,
  },

]

function Testimonials() {
  return (
    <section className="flex flex-col gap-5 text-center mt-10 px-10 py-20">
      <h2 className="text-4xl font-bold tracking-tight text-blue-950">Client & Partner Testimonials</h2>
      <p className="text-[var(--color-muted-foreground)]">
        Real feedback from our users:
      </p>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-5xl mx-auto relative"
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-full md:basis-1/2 lg:basis-1/2 pl-4"
            >
              <div className="p-6 bg-white rounded-xl shadow-sm border text-center flex flex-col justify-between h-full">
                <p className="italic text-gray-600 mb-4">
                  "{item.text}"
                </p>
                <div className="flex justify-center mb-3">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <FaStar className="text-yellow-500" size={20} key={i}/>
                  ))}
                </div>
                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Responsive arrow positioning */}
        <CarouselPrevious className="left-2 sm:left-[-3rem]" />
        <CarouselNext className="right-2 sm:right-[-3rem]" />
      </Carousel>

    </section>
  )
}

export default Testimonials
