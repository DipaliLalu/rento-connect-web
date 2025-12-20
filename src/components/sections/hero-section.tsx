import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Helmet } from "react-helmet-async";

const HeroSection = () => {
  const canonical = `${import.meta.env.VITE_URL}${location.pathname}`;
  return (
    <>
     <Helmet>
                <title>Home | Rento Connect</title>
                <meta name="description" content="Rento Connect Equipment Experts Mobility"></meta>
                <meta name="keywords" content="Rento Connect"></meta>
                <meta name="author" content="Rento Connect"></meta>
                <link rel="canonical" href={canonical} />

                <meta property="og:title" content="Home | Rento Connect Equipment Experts Mobility" />
                <meta property="og:site_name" content="Rento Connect"></meta>
                <meta property="og:description" content="Rento Connect Equipment Experts Mobility" />
                <meta property="og:image" content="https://rentoconnect.propheticdevelopers.com//3D-Effects.png"></meta>
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="800" />
                <meta property="og:image:alt" content="Rento Connect" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonical} />

                <meta name="twitter:title" content="Rento Connect" />
                <meta name="twitter:card" content="summary_large_image"></meta>
                <meta name="twitter:description" content="Rento Connect Equipment Experts Mobility" />
                <meta name="twitter:image" content={"https://rentoconnect.propheticdevelopers.com//3D-Effects.png"} />
            </Helmet>
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
              <Link to={'/services'}>
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
    </>
  );
};

export default HeroSection;
