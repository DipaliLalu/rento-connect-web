import ContactusForm from "../components/sections/contactus-form";
import { Helmet } from "react-helmet-async";

export default function ContactPage() {
    const canonical = `${import.meta.env.VITE_URL}${location.pathname}`;
    return (
        <>
            <Helmet>
                <title>Contact | Rento Connect</title>
                <meta name="description" content="Rento Connect Equipment Experts Mobility"></meta>
                <meta name="keywords" content="Rento Connect"></meta>
                <meta name="author" content="Rento Connect"></meta>
                <link rel="canonical" href={canonical} />

                <meta property="og:title" content="Contact | Rento Connect Equipment Experts Mobility" />
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
            {/* ✅ Hero Section */}
            <section className="relative bg-blue-900 text-primary-foreground py-20 md:h-92">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{
                        backgroundImage: "url('/1250_368/Contact-Us.png')",
                    }}
                    data-ai-hint="industrial machinery"
                ></div>

                <div className="relative flex flex-col gap-6 justify-center items-center text-center">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
                        Contact Us
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg md:text-xl">
                        We'd love to hear from you! Whether you have questions about our
                        services, pricing, or anything else — our team is ready to help.
                    </p>
                </div>
            </section>

            <section className="px-6 md:px-12 pt-15 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column — Contact Info */}
                <div className="p-10 bg-blue-900 rounded-3xl flex justify-center items-center">
                    <div className="flex flex-col gap-8 bg-white p-8 rounded-3xl transition hover:-translate-y-2 duration-500">
                        <h2 className="text-3xl font-bold text-center text-blue-950 mb-2">
                            Get in Touch
                        </h2>
                        <p className="text-justify">We operate a business built on trust. this can only be achieved through communication and experienced support. from the first contact to your many anniversaries with us.</p>
                        <p className="text-justify">
                            We are eager to discuss your business needs, and answer any question you may have. enter your details and we will get back to you shortly. our entire team receives specialised training regularly to ensure you are receiving the best information possible. from basic questions to complex compliance inquiries, we're here to help.
                        </p>
                    </div>

                </div>

                {/* Right Column — image */}
                <img
                    src={'/5_About_Us/Our Story1.png'}
                    alt={'contact image'}
                    loading="lazy"
                    className="rounded-2xl w-full h-full object-cover"
                />
            </section>

            {/* ✅ Contact Details + Form Section */}
            <section className="px-6 md:px-12 py-15 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Right Column — Contact Form Placeholder */}
                <ContactusForm />
                {/* Left Column — Contact Info */}
                <div className="p-10 bg-blue-900 rounded-3xl flex justify-center items-center">

                    <div className="space-y-6 w-full">
                        <div className="flex w-full gap-4 bg-white p-4 rounded-3xl transition hover:-translate-y-2 duration-500 group">
                            <img
                                src="/Rento_Website/Social Media/Location1.png"
                                alt="loaction icon"
                                className="w-10 h-10 object-contain group-hover:hidden duration-500"
                            />

                            <img
                                src="/Rento_Website/Social Media/Location2.png"
                                alt="loaction icon"
                                className="w-10 h-10 object-contain hidden group-hover:block"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-blue-950">Address</h3>
                                <p className="text-gray-700">
                                    Ahmedabad,
                                    Gujarat, India
                                </p>
                            </div>

                        </div>
                        {/* Address */}
                        {/* <hr className="border-[1.3px]" /> */}
                        {/* Phone */}
                        <div className="flex w-full gap-4 bg-white p-4 rounded-3xl transition hover:-translate-y-2 duration-500 group">
                            <img
                                src="/Rento_Website/Social Media/Call1.png"
                                alt="call icon"
                                className="w-10 h-10 object-contain group-hover:hidden duration-500"
                            />

                            <img
                                src="/Rento_Website/Social Media/Call2.png"
                                alt="call icon"
                                className="w-10 h-10 object-contain hidden group-hover:block"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-blue-950">Phone</h3>
                                <p className="text-gray-700">+91-XXXXXXXXXX</p>
                            </div>
                        </div>
                        {/* <hr className="border-[1.3px]" /> */}
                        {/* Email */}
                        <div className="flex w-full gap-4 bg-white p-4 rounded-3xl transition hover:-translate-y-2 duration-500 group">
                            <img
                                src="/Rento_Website/Social Media/Mail1.png"
                                alt="loaction icon"
                                className="w-10 h-10 object-contain group-hover:hidden duration-500"
                            />

                            <img
                                src="/Rento_Website/Social Media/Mail2.png"
                                alt="loaction icon"
                                className="w-10 h-10 object-contain hidden group-hover:block"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-blue-950">Email</h3>
                                <p className="text-gray-700">info@rentoconnect.com</p>
                            </div>
                        </div>
                        {/* <hr className="border-[1.3px]" /> */}
                        {/* Website */}
                        <div className="flex w-full gap-4 bg-white p-4 rounded-3xl transition hover:-translate-y-2 duration-500 group">
                            <img
                                src="/Website1.png"
                                alt="loaction icon"
                                className="w-10 h-10 object-contain group-hover:hidden duration-500"
                            />

                            <img
                                src="/Website2.png"
                                alt="loaction icon"
                                className="w-10 h-10 object-contain hidden group-hover:block"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-blue-950">Website</h3>
                                <p className="text-gray-700">www.rentoconnect.com</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <h3 className="text-3xl font-bold text-center text-blue-950 mb-2">
                Stay In connected
            </h3>
            <section className="px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-29 justify-center w-full">
                <img src="/1-2-1128x1536.png" alt="qrcode" width={140} height={90} />
                <img src="/1-2-1128x1536.png" alt="qrcode" width={140} height={90} />
                <img src="/1-2-1128x1536.png" alt="qrcode" width={140} height={90} />
                <img src="/1-2-1128x1536.png" alt="qrcode" width={140} height={90} />
                <img src="/1-2-1128x1536.png" alt="qrcode" width={140} height={90} />
            </section>
        </>
    );
}
