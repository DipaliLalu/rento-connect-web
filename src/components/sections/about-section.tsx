function AboutSection() {
  return (
    <section className="px-10 py-20 bg-blue-900 text-primary-foreground">
      <div className="">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              About Rento Connect
            </h2>
            <p className="mt-4 text-lg text-slate-200 text-justify">
              RentoConnect is a pioneering B2B on-demand platform designed to
              bridge the gap between industrial service providers and the
              businesses that need them. Our mission is to create a seamless,
              efficient, and transparent ecosystem for sourcing industrial
              solutions.
            </p>
            <p className="mt-4 text-slate-200 text-justify">
              We eliminate the traditional hassles of finding reliable vendors,
              negotiating terms, and managing services by bringing everything
              onto a single, powerful digital platform. Whether you need
              specialized machinery, expert technicians, or streamlined mobility
              for your workforce, RentoConnect provides instant access to a
              verified network of professionals across India.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-xl">
            <img
              alt="Industrial setting"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              src="/5_About_Us/Our Story.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
