import { useState, useRef, useEffect } from "react";
import { useGetCategory } from "../actions/category";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Menu, X } from "lucide-react"; // for toggle icons
import { getVendorInfo } from "../utils/vendor-utils";
import UserDropdown from "../components/userdropdown";

type HeaderProps = {
    onSelectCategory?: (setSelectedCategory: string | null) => void;
    selectedCategory?: string | null;
    selectAll?: boolean;
};

function Header({ }: HeaderProps) {
    const { category = [] } = useGetCategory();
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const user = getVendorInfo();

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
            <div className="flex justify-between items-center px-4 md:px-10 py-3">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <Link to={"/"} className="flex items-center gap-2">
                        <img
                            src="/3D-Effects.png"
                            alt="logo"
                            className="object-contain"
                            width={70}
                            height={70}
                        />
                    </Link>
                    {/* Category Bar (Desktop) */}
                    <div className="hidden md:flex overflow-x-auto gap-4 py-2">
                        {category && category.map((data) => (
                            <Link
                                key={data.category_id}
                                to={`${data?.slug}` || ''}
                                className="text-blue-950 font-medium whitespace-nowrap hover:text-blue-900 cursor-pointer transition"
                            >
                                {data.category_name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Desktop Buttons */}
                <div className="flex gap-4">
                    {user?.role == "customer" || user?.role == "vendor" ? <UserDropdown /> :
                        <div className="hidden md:flex items-center gap-3">
                            <Link to={'login'}>
                                <Button className="bg-white text-orange-600 border border-orange-500 hover:bg-orange-500 hover:text-white">
                                    Login
                                </Button>
                            </Link>
                            <Link to={'vendor-register'}>
                                <Button className="bg-orange-500 text-white hover:bg-orange-600">
                                    Become a Vendor
                                </Button>
                            </Link>
                        </div>
                    }
                    <button
                        className="md:hidden flex items-center text-orange-600"
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
                    className="flex flex-col md:hidden gap-3 px-5 py-4 border-t bg-orange-50 animate-slideDown"
                >
                    {category && category.map((data) => (
                        <Link
                            key={data.category_id}
                            to={`${data?.slug}` || ''}
                            onClick={() => setOpen(false)}
                            className="text-blue-950 font-medium whitespace-nowrap hover:text-blue-900 cursor-pointer transition"
                        >
                            {data.category_name}
                        </Link>
                    ))}

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
