import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useGetSubCategoryWithSlug } from "../actions/subcategory";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import WhyHireSection from "../components/sections/why-hire-section";
import { getVendorInfo } from "../utils/vendor-utils";
import { Skeleton } from "../components/ui/skeleton";
import { useGetProductWithSlug } from "../actions/product";
import { Helmet } from "react-helmet-async";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

function EquipmentCategoryPage() {
    const categoryKey = "equipment";
    const navigate = useNavigate();
    const h1Ref = useRef<HTMLHtmlElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { subcategory, isLoading, pager } = useGetSubCategoryWithSlug(categoryKey, currentPage);
    const totalPages = pager?.last_page ?? 1;
    const user = getVendorInfo();

    const { products } = useGetProductWithSlug(categoryKey);
    const [equipmentSearch, setEquipmentSearch] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const isSearching = equipmentSearch || locationSearch;

    /** ---------------------------------------------------------
     *  STEP 1 → Filter products by location + group by subcategory
     * --------------------------------------------------------- */
    const productMap: Record<string, any[]> = {};

    products?.forEach((p: any) => {
        // Location filter
        if (
            locationSearch.trim() &&
            !p.location?.toLowerCase().includes(locationSearch.toLowerCase())
        ) {
            return;
        }

        if (!productMap[p.sub_category]) {
            productMap[p.sub_category] = [];
        }
        productMap[p.sub_category].push(p);
    });

    /** ---------------------------------------------------------
     *  STEP 2 → pick minimum price product for each subcategory
     * --------------------------------------------------------- */
    const minPriceProducts: Record<string, any> = {};

    Object.keys(productMap).forEach((key) => {
        minPriceProducts[key] = productMap[key].reduce((min, curr) =>
            curr.price_day < min.price_day ? curr : min
        );
    });

    /** ---------------------------------------------------------
     *  STEP 3 → displayData logic
     *  Only show subcategories that have minimum-price product
     *  after location filtering
     * --------------------------------------------------------- */
    const displayData = subcategory?.filter((item: any) => {
        // Equipment name filter
        if (
            equipmentSearch.trim() &&
            !item.display_name
                .toLowerCase()
                .includes(equipmentSearch.toLowerCase())
        ) {
            return false;
        }

        // Location-based product availability filter
        if (locationSearch.trim() && !minPriceProducts[item.slug]) {
            return false;
        }

        return true;
    });

    const handleRequestQuote = (data: any) => {
        if (user == null) {
            navigate("/login");
        } else if (user?.role === "customer") {
            navigate("/request-quote", { state: { data } });
        } else {
            navigate("/login");
        }
    };
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= (pager?.last_page ?? 1)) {
            setCurrentPage(page);
            // Scroll to h1
            if (h1Ref.current) {
                h1Ref.current.scrollIntoView({ behavior: "smooth" });
            }
        }
    };
    const canonical = `${import.meta.env.VITE_URL}${location.pathname}`;
    return (
        <>
            <Helmet>
                <title>Equipment | Rento Connect</title>
                <meta name="description" content="Rento Connect Equipment Experts Mobility"></meta>
                <meta name="keywords" content="Rento Connect"></meta>
                <meta name="author" content="Rento Connect"></meta>
                <link rel="canonical" href={canonical} />

                <meta property="og:title" content="Equipment | Rento Connect Equipment Experts Mobility" />
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
            <section className="relative bg-blue-900 text-primary-foreground py-20 md:h-96">
                {/* 🔹 Background Video */}
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source
                        src="/Rento_Website/2_Equipment/Why Rent Equipment from Rento Connect.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* 🔹 Overlay (same opacity like earlier bg image) */}
                <div className="absolute inset-0 bg-black/20"></div>


                <div className="relative flex flex-col gap-8 justify-center items-center text-center px-5">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
                        Heavy Equipment for Rent
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
                        Find and rent the right heavy machinery for your project, anywhere
                        in India. Competitive pricing and verified vendors.
                    </p>
                </div>

                {/* Search Section */}
                <div className="absolute bottom-[-5.5rem] sm:bottom-[-2rem] left-1/2 transform -translate-x-1/2 w-full px-4 md:px-10">
                    <div className="mx-auto w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden  border-2 border-orange-500">

                        {/* Equipment Search */}
                        <div className="flex items-center flex-1 border-b md:border-b-0 md:border-r border-gray-200 px-3 py-2 sm:px-4 sm:py-3 group">
                            <img
                                src="/Rento_Website/Social Media/Serch1.png"
                                alt={'Serch Icon'}
                                className="w-7 h-7 object-contain group-hover:hidden duration-500 border-2 border-blue-900 rounded-full"
                            />
                            <img
                                src="/Rento_Website/Social Media/Serch2.png"
                                alt={'Serch Icon'}
                                className="w-7 h-7 object-contain hidden group-hover:block duration-500 border-2 border-orange-600 rounded-full"
                            />
                            <Input
                                type="text"
                                value={equipmentSearch}
                                onChange={(e) => setEquipmentSearch(e.target.value)}
                                placeholder="Search for equipment (e.g., Crane, JCB)"
                                className="border-none focus-visible:ring-0 text-gray-800 placeholder:text-gray-400 text-sm sm:text-base"
                            />
                        </div>

                        {/* Location Search */}
                        <div className="flex items-center flex-1 border-b md:border-b-0 md:border-r border-gray-200 px-3 py-2 sm:px-4 sm:py-3 group">
                            <img
                                src="/Rento_Website/Social Media/Location1.png"
                                alt={'Location Icon'}
                                className="w-7 h-7 object-contain group-hover:hidden duration-500 border-2 border-blue-900 rounded-full"
                            />
                            <img
                                src="/Rento_Website/Social Media/Location2.png"
                                alt={'Location Icon'}
                                className="w-7 h-7 object-contain hidden group-hover:block duration-500 border-2 border-orange-600 rounded-full"
                            />
                            <Input
                                type="text"
                                value={locationSearch}
                                onChange={(e) => setLocationSearch(e.target.value)}
                                placeholder="Location (e.g., Mumbai)"
                                className="border-none focus-visible:ring-0 text-gray-800 placeholder:text-gray-400 text-sm sm:text-base"
                            />
                        </div>

                        {/* Search Button */}
                        <div className="flex justify-center items-center px-3 py-2 sm:px-4 sm:py-3">
                            <Button className="w-full md:w-auto px-6 py-3 sm:px-10 sm:py-5 text-sm sm:text-base rounded-md" variant={"custom"}>
                                Search
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Equipment Cards */}
            <section className="relative py-18 px-5 md:px-10" ref={h1Ref}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                    {isLoading &&
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="flex flex-col w-full gap-5">
                                <Skeleton className="h-52 rounded-t-xl" />
                                <div className="space-y-3">
                                    <Skeleton className="h-4" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                        ))}

                    {displayData && displayData?.length > 0 ? (
                        displayData.map((item: any) => {
                            const matchedProduct = minPriceProducts[item.slug];

                            return (
                                <div
                                    key={item.subcategory_id}
                                    className="rounded-lg border-2 bg-card text-card-foreground shadow-sm flex flex-col overflow-hidden group transition hover:-translate-y-2 hover:border-2 hover:border-blue-900 duration-500 border-orange-500"
                                >
                                    <div className="relative h-48 w-full">
                                        <img
                                            src={`${import.meta.env.VITE_URL}/${item.subcategory_image}`}
                                            alt={item.subcategory_name}
                                            loading="lazy"
                                            className="transition-transform duration-300 group-hover:scale-110 w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 py-4 p-5 flex-1">
                                        <h3 className="font-semibold tracking-tight font-headline text-xl text-blue-950">
                                            {item.display_name}
                                        </h3>
                                        <p className="text-muted-foreground">{item.description}</p>

                                        <div className="mt-4">
                                            <p className="text-sm font-semibold text-foreground">
                                                Starting from
                                            </p>
                                            <p className="text-lg font-bold text-primary">
                                                {matchedProduct
                                                    ? `₹${matchedProduct.price_hour}/hour`
                                                    : `₹${item.price_perhour}/hour`}
                                            </p>
                                            <p className="text-lg font-bold text-primary">
                                                {matchedProduct
                                                    ? `₹${matchedProduct.price_day}/day`
                                                    : `₹${item.price_perday}/day`}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="px-5 mt-auto mb-4">
                                        <Button
                                            className="w-full"
                                            onClick={() => handleRequestQuote(item?.subcategory_name)}
                                            variant={"custom"}
                                        >
                                            Request Quote
                                        </Button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        !isLoading && (
                            <p className="col-span-full text-center text-muted-foreground">
                                No equipment found for your search.
                            </p>
                        )
                    )}
                </div>

                {/* Pagination Controls */}
                {!isSearching && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-18">

                        {/* ⬅ PREVIOUS */}
                        {currentPage !== 1 && <Button
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            variant="custom"
                        >
                            <FaAnglesLeft />
                        </Button>}

                        {/* PAGE NUMBERS */}
                        {Array.from({ length: totalPages }, (_, i) => {
                            const pageNumber = i + 1;
                            const isActive = currentPage === pageNumber;

                            return (
                                <Button
                                    key={pageNumber}
                                    size="sm"
                                    onClick={() => handlePageChange(pageNumber)}
                                    variant={"custom"}
                                    data-active={isActive ? "true" : "false"}
                                >
                                    {pageNumber}
                                </Button>
                            );
                        })}

                        {/* ➡ NEXT */}
                        <Button
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            variant="custom"
                        >
                            <FaAnglesRight />
                        </Button>
                    </div>
                )}
            </section>


            <WhyHireSection category={categoryKey} />
        </>
    );
}

export default EquipmentCategoryPage;
