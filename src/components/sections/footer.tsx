import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getVendorInfo } from "../../utils/vendor-utils";

function Footer() {
  const user = getVendorInfo();
  return (
    <>
      <footer className="bg-secondary text-secondary-foreground border-t px-10">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:justify-center">
            {/* Logo + Description */}
            <div className="flex flex-col space-y-4">
              <Link to="/" className="flex items-center w-full">
                <img
                  src="/5_About_Us/Our Story.png"
                  alt="Rento Connect Logo"
                  className="w-full h-38 object-cover rounded-lg"
                />
              </Link>
              <p className="text-muted-foreground text-justify">
                Bridging the gap between industrial service providers and the
                businesses that need them.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 col-span-2 md:ml-6">
              {/* Services */}
              <div className="">
                <h3 className="font-headline font-semibold underline-offset-8 text-blue-950 underline text-3xl mb-5">Our Services</h3>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <FaAngleDoubleRight size={20} className="text-orange-500" />
                    <Link to="/equipment" className="text-muted-foreground hover:text-primary">
                      Equipment Rental
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaAngleDoubleRight size={20} className="text-orange-500" />
                    <Link to="/experts" className="text-muted-foreground hover:text-primary">
                      Expert Hiring
                    </Link>
                  </li>

                  <li className="flex items-center gap-2">
                    <FaAngleDoubleRight size={20} className="text-orange-500" />
                    <Link to="/mobility" className="text-muted-foreground hover:text-primary ">
                      Mobility Solutions
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaAngleDoubleRight size={20} className="text-orange-500" />
                    <Link
                      to={
                        !user
                          ? "/login"
                          : user.role === "customer"
                            ? "/customer-dashboard"
                            : "/vendor-dashboard"
                      }
                      className="text-muted-foreground hover:text-primary"
                    >
                      {!user
                        ? "Vendor Dashboard"
                        : user.role === "customer"
                          ? "Customer Dashboard"
                          : "Vendor Dashboard"}
                    </Link>
                  </li>

                </ul>
              </div>

              {/* Quick Link */}
              <div className="md:ml-6.5">
                <h3 className="font-headline font-semibold underline-offset-8 text-blue-950 underline text-3xl mb-5">Quick Link</h3>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <FaAngleDoubleRight size={20} className="text-orange-500" />
                    <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaAngleDoubleRight size={20} className="text-orange-500" />
                    <Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaAngleDoubleRight size={20} className="text-orange-500" />
                    <Link to="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                  <li className="flex items-center gap-2">
                    <FaAngleDoubleRight size={20} className="text-orange-500" />
                    <Link to="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
                </ul>
              </div>

              {/* Support */}
              <div className="md:ml-5">
                <h3 className="font-headline font-semibold underline-offset-8 text-blue-950 underline text-3xl mb-5">Support</h3>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <FaAngleDoubleRight size={20} className="text-orange-500" />
                    <Link to="/careers" className="text-muted-foreground hover:text-primary">Careers</Link></li>
                  <li className="flex items-center gap-2">
                    <FaAngleDoubleRight size={20} className="text-orange-500" />
                    <Link to="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
                  <li className="flex items-center gap-2">
                    <FaAngleDoubleRight size={20} className="text-orange-500" />
                    <Link to="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                  <li className="flex items-center gap-2">
                    <FaAngleDoubleRight size={20} className="text-orange-500" />
                    <Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>

            {/* Social Links */}
            <div className="w-fit ">
              <h3 className="font-headline font-semibold underline-offset-8 text-blue-950 underline text-3xl">Our Contact</h3>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 group">
                  <img
                    src="/Rento_Website/Social Media/Mail1.png"
                    alt={'mail Icon'}
                    className="w-10 h-10 object-contain group-hover:hidden duration-500 border-2 border-blue-900 rounded-full"
                  />
                  <img
                    src="/Rento_Website/Social Media/Mail2.png"
                    alt={'mail Icon'}
                    className="w-10 h-10 object-contain hidden group-hover:block duration-500 border-2 border-orange-600 rounded-full"
                  />
                  <Link to="mailto:info@rentoconnect.com" className="text-muted-foreground hover:text-primary text-[17px]">info@rentoconnect.com</Link>
                </li>
                <li className="flex items-center gap-2 group">
                  <img
                    src="/Rento_Website/Social Media/Location1.png"
                    alt={'location Icon'}
                    className="w-10 h-10 object-contain group-hover:hidden duration-500 border-2 border-blue-900 rounded-full"
                  />
                  <img
                    src="/Rento_Website/Social Media/Location2.png"
                    alt={'location Icon'}
                    className="w-10 h-10 object-contain hidden group-hover:block duration-500 border-2 border-orange-600 rounded-full"
                  />
                  <Link to="https://www.google.com/maps/place/Ahmedabad,+Gujarat/@23.0205342,72.2500575,78563m/data=!3m2!1e3!4b1!4m6!3m5!1s0x395e848aba5bd449:0x4fcedd11614f6516!8m2!3d23.022505!4d72.5713621!16zL20vMDFkODhj?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="text-muted-foreground hover:text-primary text-[17px]"> Ahmedabad,Gujarat,India</Link>
                </li>
                <li className="flex items-center gap-3 mt-4">
                  {/* Facebook */}
                  <div className="group cursor-pointer">
                    <img
                      src="/Rento_Website/Social Media/Facebook1.png"
                      alt="Facebook"
                      className="w-10 h-10 object-contain border-2 border-blue-900 rounded-full group-hover:hidden transition"
                    />
                    <img
                      src="/Rento_Website/Social Media/Facebook2.png"
                      alt="Facebook"
                      className="w-10 h-10 object-contain hidden border-2 border-orange-600 rounded-full group-hover:block transition"
                    />
                  </div>

                  {/* Twitter */}
                  <div className="group cursor-pointer">
                    <img
                      src="/Rento_Website/Social Media/Tweeter1.png"
                      alt="Twitter"
                      className="w-10 h-10 object-contain border-2 border-blue-900 rounded-full group-hover:hidden transition"
                    />
                    <img
                      src="/Rento_Website/Social Media/Tweeter2.png"
                      alt="Twitter"
                      className="w-10 h-10 object-contain hidden border-2 border-orange-600 rounded-full group-hover:block transition"
                    />
                  </div>

                  {/* Instagram */}
                  <div className="group cursor-pointer">
                    <img
                      src="/Rento_Website/Social Media/Instagram1.png"
                      alt="Instagram"
                      className="w-10 h-10 object-contain border-2 border-blue-900 rounded-full group-hover:hidden transition"
                    />
                    <img
                      src="/Rento_Website/Social Media/Instagram2.png"
                      alt="Instagram"
                      className="w-10 h-10 object-contain hidden border-2 border-orange-600 rounded-full group-hover:block transition"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div className="group cursor-pointer">
                    <img
                      src="/Rento_Website/Social Media/Linkdin1.png"
                      alt="LinkedIn"
                      className="w-10 h-10 object-contain border-2 border-blue-900 rounded-full group-hover:hidden transition"
                    />
                    <img
                      src="/Rento_Website/Social Media/Linkdin2.png"
                      alt="LinkedIn"
                      className="w-10 h-10 object-contain hidden border-2 border-orange-600 rounded-full group-hover:block transition"
                    />
                  </div>

                  {/* YouTube */}
                  <div className="group cursor-pointer">
                    <img
                      src="/Rento_Website/Social Media/Youtube1.png"
                      alt="YouTube"
                      className="w-10 h-10 object-contain border-2 border-blue-900 rounded-full group-hover:hidden transition"
                    />
                    <img
                      src="/Rento_Website/Social Media/Youtube2.png"
                      alt="YouTube"
                      className="w-10 h-10 object-contain hidden border-2 border-orange-600 rounded-full group-hover:block transition"
                    />
                  </div>
                </li>

              </ul>
            </div>
          </div>

        </div>
      </footer>
      {/* Bottom Section */}
      <div className="border-t p-5 text-white text-center w-full bg-blue-900">
        <p> Copyright ©2025 Rento Connect. All Rights Reserved</p>
      </div>
    </>
  );
}

export default Footer;
