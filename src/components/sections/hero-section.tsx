import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <main className="flex-grow">
      <section className="relative bg-blue-900 text-primary-foreground py-20 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('https://placehold.co/1920x1080.png')",
          }}
          data-ai-hint="industrial machinery"
        ></div>

        <div className="relative flex flex-col gap-8 justify-center items-center text-center">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
            Your On-Demand B2B Industrial Services Platform
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
            Instantly connect with verified experts, rent heavy equipment, and
            arrange mobility solutions across India.
          </p>

          <div className="flex items-center gap-3 justify-center">
            <Button className="bg-white text-orange-600 border border-orange-500 hover:bg-orange-500 hover:text-white">
              <Link to={'/customer-register'}>
              Find a Service
              </Link>
            </Button>
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
               <Link to={'/vendor-register'}>
              Become a Vendor
               </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
