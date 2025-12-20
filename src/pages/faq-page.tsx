import { ChevronDown, ChevronUp, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const faqs = [
    {
        question: "Can I rent equipment for just one day?",
        answer:
            "Yes, absolutely. We offer flexible rental terms, including daily, weekly, and monthly options to suit your project's needs.",
    },
    {
        question: "What happens if the rented equipment breaks down?",
        answer:
            "In case of breakdowns, please contact our support team immediately. We will coordinate repair or replacement as quickly as possible.",
    },
    {
        question: "Are the vendors on Rento Connect verified?",
        answer:
            "Yes, every vendor undergoes a thorough verification process before being listed on Rento Connect to ensure reliability and safety.",
    },
    {
        question: "How do I find the right expert for my industrial needs?",
        answer:
            "You can browse our list of verified experts, filter by specialty, and contact them directly through the Rento Connect platform.",
    },
    {
        question: "What areas do your mobility solutions cover?",
        answer:
            "Our mobility solutions are available in multiple regions. Please check the service area page or contact us for location-specific details.",
    },
];

const vendorFaqs = [
    {
        question: "How do I list my machine on Rento Connect?",
        answer:
            "You can list your equipment by contacting our team directly through the contact page or by filling out our vendor onboarding form. We'll guide you through the process.",
    },
    {
        question: "Do I need to pay any fees to join as a vendor?",
        answer:
            "No, listing your equipment on Rento Connect is completely free. We operate on a commission-based model, meaning we only charge a small percentage on successful rentals.",
    },
    {
        question: "How do I get paid for my rentals?",
        answer:
            "We facilitate secure and timely payments directly to your account after the rental period is successfully completed and confirmed by the customer.",
    },
    {
        question: "What kind of equipment can I list?",
        answer:
            "You can list a wide range of heavy industrial and construction equipment, including cranes, excavators, loaders, rollers, and more. Check our equipment page for a full list of categories.",
    },
];

const generalFaqs = [
    {
        question: "What is Rento Connect?",
        answer:
            "Rento Connect is a B2B platform that connects businesses with a network of verified providers for industrial equipment rental, expert hiring, and workforce mobility solutions.",
    },
    {
        question: "How does Rento Connect ensure the quality of services?",
        answer:
            "We have a multi-step verification process for all our partners. We also gather continuous feedback and performance ratings from customers to maintain a high-quality, reliable marketplace.",
    },
];

function FaqSection({
    title,
    items,
}: {
    title: string;
    items: { question: string; answer: string }[];
}) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 px-6 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-10">
                {title}
            </h2>

            <div className="w-full max-w-3xl divide-y rounded-lg cursor-pointer">
                {items.map((faq, index) => (
                    <div key={index} className="px-6 py-5 cursor-pointer">
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex justify-between items-center text-left font-semibold text-lg text-slate-900"
                        >
                            <span
                                className={`text-blue-950 ${openIndex === index ? "underline" : ""
                                    }`}
                            >
                                {faq.question}
                            </span>
                            {openIndex === index ? (
                                <ChevronUp size={20} />
                            ) : (
                                <ChevronDown size={20} />
                            )}
                        </button>

                        {openIndex === index && (
                            <p className="mt-3 text-gray-600 text-sm md:text-base">
                                {faq.answer}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function FaqPage() {
    const canonical = `${import.meta.env.VITE_URL}${location.pathname}`;
    return (
        <>
         <Helmet>
                <title>FAQ | Rento Connect</title>
                <meta name="description" content="Rento Connect Equipment Experts Mobility"></meta>
                <meta name="keywords" content="Rento Connect"></meta>
                <meta name="author" content="Rento Connect"></meta>
                <link rel="canonical" href={canonical} />

                <meta property="og:title" content="FAQ | Rento Connect Equipment Experts Mobility" />
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
            {/* Hero Section */}
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
                        Frequently Asked Questions
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
                        Find answers to common questions about our platform and services.
                    </p>
                </div>
            </section>

            {/* FAQ Sections */}
            <FaqSection title="For Customers" items={faqs} />
            <FaqSection title="For Equipment Owners & Vendors" items={vendorFaqs} />
            <FaqSection title="General" items={generalFaqs} />

            <section className="bg-secondary py-16 px-6 flex flex-col items-center text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-3">
                    Still have questions?
                </h2>
                <p className="text-gray-600 max-w-2xl mb-8">
                    Our team is here to help. Get in touch with us for any specific inquiries.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {/* Email Button */}
                    <a
                        href="mailto:info@rentoconnect.com"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-950 text-white rounded-lg hover:bg-blue-800 transition-all duration-200"
                    >
                        <Mail size={18} />
                        Email Us
                    </a>

                    {/* Call Button */}
                    <a
                        href="tel:+919876543210"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-blue-950 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200"
                    >
                        <Phone size={18} />
                        Call Us
                    </a>
                </div>
            </section>
            
        </>
    );
}
