import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Menu, X } from "lucide-react"; // for toggle icons
import { getVendorInfo } from "../utils/vendor-utils";
import UserDropdown from "../components/userdropdown";

type HeaderProps = {
    onSelectCategory?: (setSelectedCategory: string | null) => void;
    selectedCategory?: string | null;
    selectAll?: boolean;
};
const category = [
    { category_id: '1', category_name: 'Equipment', title: 'Heavy Equipment', created_by: 'test', heading: 'Heavy Equipment for Rent', slug: 'equipment' },

    { category_id: '2', category_name: 'Experts', title: 'Experts On-Demand', created_by: 'test', heading: 'Experts On-Demand', slug: 'experts' },

    { category_id: '3', category_name: 'Mobility', title: 'Mobility Solutions', created_by: 'test', heading: 'Industrial Mobility Solutions', slug: 'mobility' }]

function Header({ }: HeaderProps) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const user = getVendorInfo();
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="w-full border-b shadow-sm">
            {/* Top Section */}
            <div className="flex justify-between items-center px-4 md:px-10 py-1">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <Link to={"/"}>
                        <img
                            src="/Type_2 1.png"
                            alt="logo"
                            className="object-cover"
                            width={160}
                            height={100}
                            onClick={() => setOpen((prev) => !prev)}
                        />

                    </Link>
                    {/* Category Bar (Desktop) */}
                    <div className="hidden lg:flex overflow-x-auto gap-4 py-2">
                        <Link
                            to={'/'}
                            className={`text-blue-950 font-medium whitespace-nowrap hover:text-orange-600 cursor-pointer transition ${location.pathname == `/` ? 'text-orange-600' : 'text-blue-950'}`}
                        >
                            Home
                        </Link>
                        <Link
                            to={'/about'}
                            className={`text-blue-950 font-medium whitespace-nowrap hover:text-orange-600 cursor-pointer transition ${location.pathname == `/about` ? 'text-orange-600' : 'text-blue-950'}`}
                        >
                            About Us
                        </Link>
                        {category && category.map((data) => (
                            <Link
                                key={data.category_id}
                                to={`${data?.slug}` || ''}
                                className={`text-blue-950 font-medium whitespace-nowrap hover:text-orange-600 cursor-pointer transition ${location.pathname == `/${data.slug}` ? 'text-orange-600' : 'text-blue-950'}`}
                            >
                                {data.category_name}
                            </Link>
                        ))}

                        <Link
                            to={'/blog'}
                            className={`text-blue-950 font-medium whitespace-nowrap hover:text-orange-600 cursor-pointer transition ${location.pathname == `/blog` ? 'text-orange-600' : 'text-blue-950'}`}
                        >
                            Blog
                        </Link>
                        <Link
                            to={'/contact'}
                            className={`text-blue-950 font-medium whitespace-nowrap hover:text-orange-600 cursor-pointer transition ${location.pathname == `/contact` ? 'text-orange-600' : 'text-blue-950'}`}
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>

                {/* Desktop Buttons */}
                <div className="flex gap-4">
                    {user?.role == "customer" || user?.role == "vendor" ? <UserDropdown /> :
                        <div className="hidden lg:flex items-center gap-3">
                            <Link to={'login'}>
                                <Button
                                    variant="custom"
                                    data-active={location.pathname == "/login"}
                                >
                                    Login
                                </Button>

                            </Link>
                            <Link to={'vendor-register'}>
                                <Button variant={"custom"} data-active={location.pathname == "/vendor-register"}>
                                    Become a Vendor
                                </Button>
                            </Link>
                        </div>
                    }
                    <button
                        className="lg:hidden flex items-center text-orange-600"
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        {open ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

            </div>

            {/* Category Menu (Mobile Toggle) */}
            {open && (
                <div
                    ref={wrapperRef}
                    className="flex flex-col lg:hidden gap-3 px-5 py-4 border-t bg-orange-50 animate-slideDown"
                >
                    <Link
                        onClick={() => setOpen((prev) => !prev)}
                        to={'/'}
                        className={`text-blue-950 font-medium whitespace-nowrap hover:text-orange-600 cursor-pointer transition ${location.pathname == `/` ? 'text-orange-600' : 'text-blue-950'}`}
                    >
                        Home
                    </Link>
                    <Link
                        onClick={() => setOpen((prev) => !prev)}
                        to={'/about'}
                        className={`text-blue-950 font-medium whitespace-nowrap hover:text-orange-600 cursor-pointer transition ${location.pathname == `/about` ? 'text-orange-600' : 'text-blue-950'}`}
                    >
                        About Us
                    </Link>
                    {category && category.map((data) => (
                        <Link
                            key={data.category_id}
                            onClick={() => setOpen((prev) => !prev)}
                            to={`${data?.slug}` || ''}
                            className={`text-blue-950 font-medium whitespace-nowrap hover:text-orange-600 cursor-pointer transition ${location.pathname == `/${data.slug}` ? 'text-orange-600' : 'text-blue-950'}`}
                        >
                            {data.category_name}
                        </Link>
                    ))}

                    <Link
                        onClick={() => setOpen((prev) => !prev)}
                        to={'/blog'}
                        className={`text-blue-950 font-medium whitespace-nowrap hover:text-orange-600 cursor-pointer transition ${location.pathname == `/blog` ? 'text-orange-600' : 'text-blue-950'}`}
                    >
                        Blog
                    </Link>
                    <Link
                        onClick={() => setOpen((prev) => !prev)}
                        to={'/contact'}
                        className={`text-blue-950 font-medium whitespace-nowrap hover:text-orange-600 cursor-pointer transition ${location.pathname == `/contact` ? 'text-orange-600' : 'text-blue-950'}`}
                    >
                        Contact Us
                    </Link>

                    {!user &&
                        (<div className="flex flex-col gap-2 mt-3">
                            <Link to={'/login'} onClick={() => setOpen(false)}>
                                <Button className="bg-white text-orange-600 border border-orange-500 hover:bg-orange-500 hover:text-white" >
                                    Login
                                </Button>
                            </Link>
                            <Link to={'/vendor-register'} onClick={() => setOpen(false)}>
                                <Button className="bg-orange-500 text-white hover:bg-orange-600">
                                    Become a Vendor
                                </Button>
                            </Link>
                        </div>)}
                </div>
            )}
        </header>
    );
}

export default Header;
