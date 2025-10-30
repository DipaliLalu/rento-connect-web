import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t px-10">
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Description */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center">
              <img
                src="/3D-Effects.png"
                alt="Rento Connect Logo"
                className="w-auto h-12"
              />
            </Link>
            <p className="text-muted-foreground">
              Bridging the gap between industrial service providers and the
              businesses that need them.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-headline font-bold text-blue-950 text-lg">Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/category?type=equipment" className="text-muted-foreground hover:text-primary">
                  Equipment Rental
                </Link>
              </li>
              <li>
                <Link to="/category?type=experts" className="text-muted-foreground hover:text-primary">
                  Expert Hiring
                </Link>
              </li>
              <li>
                <Link to="/category?type=mobility" className="text-muted-foreground hover:text-primary">
                  Mobility Solutions
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary">
                  Vendor Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-headline font-bold text-blue-950 text-lg">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social Links */}
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

        {/* Bottom Section */}
        <div className="mt-8 border-t pt-8 text-center text-muted-foreground">
          <p>© 2025 Rento Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
