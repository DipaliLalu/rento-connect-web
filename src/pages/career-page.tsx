import { Briefcase, Mail, MapPin } from "lucide-react";
import { Helmet } from "react-helmet-async";

const jobs = [
    {
        title: "Field Operations Executive",
        location: "Ahmedabad, India",
        type: "Full-time",
        description:
            "Responsible for overseeing day-to-day field operations, ensuring efficiency and compliance with company standards. Requires strong organizational and communication skills.",
    },
    {
        title: "Vendor Onboarding Specialist",
        location: "Ahmedabad, India",
        type: "Full-time",
        description:
            "Manage the end-to-end vendor onboarding process, from initial contact to final integration. Key skills include negotiation and relationship management.",
    },
    {
        title: "Sales & BD Managers",
        location: "Ahmedabad, India",
        type: "Full-time",
        description:
            "Drive business growth by identifying new opportunities, building client relationships, and leading the sales team. Proven track record in B2B sales is a must.",
    },
    {
        title: "Technical Coordinators",
        location: "Ahmedabad, India",
        type: "Full-time",
        description:
            "Act as the bridge between our clients and technical teams. Responsible for project coordination, requirement gathering, and ensuring technical solutions meet client needs.",
    },
];

function CareerPage() {
    const canonical = `${import.meta.env.VITE_URL}${location.pathname}`;
    return (
        <>
         <Helmet>
                <title>Careers | Rento Connect</title>
                <meta name="description" content="Rento Connect Equipment Experts Mobility"></meta>
                <meta name="keywords" content="Rento Connect"></meta>
                <meta name="author" content="Rento Connect"></meta>
                <link rel="canonical" href={canonical} />

                <meta property="og:title" content="Careers | Rento Connect Equipment Experts Mobility" />
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
            <section className="relative bg-blue-900 text-primary-foreground py-20 md:py-32">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{
                        backgroundImage: "url('https://placehold.co/1920x1080.png')",
                    }}
                    data-ai-hint="industrial machinery"
                ></div>

                <div className="relative flex flex-col gap-5 justify-center items-center text-center">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
                        Join Our Team
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
                        Be a part of a dynamic team that is revolutionizing the B2B industrial services landscape. We are looking for passionate individuals to grow with us.
                    </p>
                </div>
            </section>

            <section className="flex flex-col gap-5 text-center py-20">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-blue-950">Current Openings</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground px-5">
                    Explore the opportunities to build your career with Rento Connect.
                </p>

                <div className="flex flex-col gap-6 mt-6 px-4 md:px-10 items-center">
                    {jobs.map((job, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all text-start max-w-5xl"
                        >
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {job.title}
                            </h2>
                            <div className="flex flex-wrap items-center text-gray-500 text-sm mb-4 gap-4">
                                <span className="flex items-center gap-1">
                                    <MapPin size={16} />
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Briefcase size={16} />
                                    {job.type}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4">{job.description}</p>
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-medium transition">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            </section >

            <section className="py-16 px-10 bg-secondary">
                <div className="text-center">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-blue-950">
                        Don't See a Fit?
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        We are always looking for talented individuals. If you believe you have what it takes to contribute to our team, send us your resume.
                    </p>

                    <div className="mt-8">
                            <a
                                href="mailto:careers@rentoconnect.com"
                                className="inline-flex items-center gap-2 bg-indigo-900 hover:bg-indigo-800 text-white font-medium px-6 py-3 rounded-md transition"
                            >
                                <Mail size={18} />
                                Email your resume to: <span className="font-semibold">careers@rentoconnect.com</span>
                            </a>

                    </div>
                </div>
            </section>
        </>
    )
}

export default CareerPage
