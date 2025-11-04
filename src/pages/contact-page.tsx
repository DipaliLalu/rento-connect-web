import { FaFacebook, FaFileInvoice, FaInstagram, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineMail, HiOutlineGlobeAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import ContactusForm from "../components/sections/contactus-form";

export default function ContactPage() {
    return (
        <>
            {/* ✅ Hero Section */}
            <section className="relative bg-blue-900 text-primary-foreground py-20 md:py-32">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{
                        backgroundImage: "url('https://placehold.co/1920x1080.png')",
                    }}
                    data-ai-hint="industrial machinery"
                ></div>

                <div className="relative flex flex-col gap-6 justify-center items-center text-center">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
                        Contact Us
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
                        We'd love to hear from you! Whether you have questions about our
                        services, pricing, or anything else — our team is ready to help.
                    </p>
                </div>
            </section>

            {/* ✅ Contact Details + Form Section */}
            <section className="px-6 md:px-16 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column — Contact Info */}
                <div className="flex flex-col gap-8">
                    <h2 className="text-3xl font-bold text-blue-950 mb-2">
                        Get in Touch
                    </h2>

                    <div className="space-y-6">
                        {/* Address */}
                        <div className="flex gap-4 items-start">
                            <IoLocationOutline size={30} className="text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-semibold text-blue-950">Address</h3>
                                <p className="text-gray-700 md:w-1/2">
                                    C-509, Swati Trinity, SP Ring Road, Bopal, Ahmedabad-380054,
                                    Gujarat, India
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex gap-4 items-start">
                            <FaPhoneAlt size={26} className="text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-semibold text-blue-950">Phone</h3>
                                <p className="text-gray-700">+91-XXXXXXXXXX</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex gap-4 items-start">
                            <HiOutlineMail size={28} className="text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-semibold text-blue-950">Email</h3>
                                <p className="text-gray-700">info@rentoconnect.com</p>
                            </div>
                        </div>

                        {/* Website */}
                        <div className="flex gap-4 items-start">
                            <HiOutlineGlobeAlt size={28} className="text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-semibold text-blue-950">Website</h3>
                                <p className="text-gray-700">www.rentoconnect.com</p>
                            </div>
                        </div>

                        {/* GSTIN */}
                        <div className="flex gap-4 items-start">
                            <FaFileInvoice size={26} className="text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-semibold text-blue-950">GSTIN</h3>
                                <p className="text-gray-700">24CZSPA7097L1ZO</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-headline font-bold text-blue-950 text-lg">Follow Us</h3>
                        <div className="flex mt-4 space-x-4">
                            <Link to="#" className="text-muted-foreground hover:text-primary">
                                <FaLinkedin className="h-6 w-6" />
                            </Link>
                            <Link to="#" className="text-muted-foreground hover:text-primary">
                                <FaInstagram className="h-6 w-6" />
                            </Link>
                            <Link to="#" className="text-muted-foreground hover:text-primary">
                                <FaFacebook className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Column — Contact Form Placeholder */}
                <ContactusForm />
            </section>
        </>
    );
}
