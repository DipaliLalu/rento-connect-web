import { RiFocus2Line } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";

function AboutPage() {
    return (
        <>
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
                        About Rento Connect
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
                        We are revolutionizing the industrial services sector by connecting businesses with reliable, on-demand solutions.
                    </p>
                </div>
            </section>

            <section className="px-10 py-20">
                <div className="">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* left Image */}
                        <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-xl">
                            <img
                                alt="Industrial setting"
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 h-full w-full object-cover"
                                src="https://placehold.co/600x400.png"
                            />
                        </div>
                        {/* right Content */}
                        <div>
                            <h2 className="font-headline text-3xl md:text-4xl font-bold text-blue-950">
                                Our Story
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Rento Connect was founded with a clear objective: to simplify the complex process of sourcing industrial services. Having experienced the challenges firsthand—unreliable vendors, opaque pricing, and logistical nightmares—our founders envisioned a digital platform that would bring efficiency, transparency, and trust to the B2B industrial ecosystem.
                            </p>
                            <p className="mt-4 text-muted-foreground">
                                Today, Rento Connect is a thriving marketplace that empowers businesses across India. We bridge the gap between demand and supply for heavy equipment, skilled experts, and workforce mobility, all through a seamless and user-friendly interface.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <section className="relative py-20 md:py-32 px-5 md:px-10 bg-secondary">
                <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
                    <div
                        className="bg-white rounded-xl shadow-md border p-6 flex flex-col items-center text-center hover:shadow-xl transition cursor-pointer"
                    >
                        {/* Icon / Image */}
                        <div className="w-14 h-14 flex items-center justify-center bg-orange-100 rounded-full mb-4">
                            <RiFocus2Line size={30} className="text-primary" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-blue-950">
                            Our Mission
                        </h3>

                        {/* Description */}
                        <p className="text-[var(--color-muted-foreground)] mt-2">
                            To be India's most trusted and efficient B2B platform for on-demand industrial services, empowering businesses to achieve operational excellence by providing quick access to a verified network of equipment, experts, and mobility solutions.
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-xl shadow-md border p-6 flex flex-col items-center text-center hover:shadow-xl transition cursor-pointer"
                    >
                        {/* Icon / Image */}
                        <div className="w-14 h-14 flex items-center justify-center bg-orange-100 rounded-full mb-4">
                            <IoMdEye size={30} className="text-primary" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-blue-950">
                            Our Vision
                        </h3>

                        {/* Description */}
                        <p className="text-[var(--color-muted-foreground)] mt-2">
                            To build a comprehensive digital backbone for the industrial services sector, fostering growth, innovation, and partnership for every stakeholder in the ecosystem, from individual equipment owners to large-scale industrial enterprises.
                        </p>
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-5 text-center py-20">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-blue-950">Meet Our Leadership</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground px-5">
                   The driving force behind our mission.
                </p>

                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mt-6 px-4 md:px-10">

                    <div
                        className="bg-white rounded-xl shadow-md border p-6 flex flex-col items-center text-center hover:shadow-xl transition hover:-translate-y-2 cursor-pointer"
                    >
                        {/* Icon / Image */}
                        <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full mb-4">
                            <img src="/100x100.png" alt="100x100 image" className="rounded-full" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-blue-950">
                           Ravi Kumar
                        </h3>

                        {/* Description */}
                        <p className="text-primary mt-2">
                            Founder & CEO
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-xl shadow-md border p-6 flex flex-col items-center text-center hover:shadow-xl transition hover:-translate-y-2 cursor-pointer"
                    >
                        {/* Icon / Image */}
                        <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full mb-4">
                            <img src="/100x100.png" alt="100x100 image" className="rounded-full" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-blue-950">
                          Priya Singh
                        </h3>

                        {/* Description */}
                        <p className="text-primary mt-2">
                            Chief Operating Officer
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-xl shadow-md border p-6 flex flex-col items-center text-center hover:shadow-xl transition hover:-translate-y-2 cursor-pointer"
                    >
                        {/* Icon / Image */}
                        <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full mb-4">
                            <img src="/100x100.png" alt="100x100 image" className="rounded-full" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-blue-950">
                           Amit Patel
                        </h3>

                        {/* Description */}
                        <p className="text-primary mt-2">
                            Head of Technology
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-xl shadow-md border p-6 flex flex-col items-center text-center hover:shadow-xl transition hover:-translate-y-2 cursor-pointer"
                    >
                        {/* Icon / Image */}
                        <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full mb-4">
                            <img src="/100x100.png" alt="100x100 image" className="rounded-full" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-blue-950">
                           Sunita Sharma
                        </h3>

                        {/* Description */}
                        <p className="text-primary mt-2">
                           Head of Vendor Relations
                        </p>
                    </div>
                

                </div>
            </section>
        </>
    )
}

export default AboutPage
