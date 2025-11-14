import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetSubCategoryWithSlug } from "../actions/subcategory";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import WhyHireSection from "../components/sections/why-hire-section";
import { getVendorInfo } from "../utils/vendor-utils";
import { Skeleton } from "../components/ui/skeleton";
import { Search } from "lucide-react";
import { useGetProductWithSlug } from "../actions/product";

function EquipmentCategoryPage() {
    const categoryKey = "equipment";
    const navigate = useNavigate();
    const { subcategory, isLoading } = useGetSubCategoryWithSlug(categoryKey);
    const user = getVendorInfo();

    const { products } = useGetProductWithSlug(categoryKey);
    console.log(products)
    // 🔍 Local states for filters
    const [equipmentSearch, setEquipmentSearch] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const [filteredData, setFilteredData] = useState<any[]>([]);

    // Filter handler
    const handleSearch = () => {
        if (!subcategory) return;

        // 🧠 If both search boxes empty, show all
        if (!equipmentSearch.trim() && !locationSearch.trim()) {
            setFilteredData(subcategory);
            return;
        }

        const filtered = subcategory.filter((item: any) => {
            const matchesEquipment = item.subcategory_name
                .toLowerCase()
                .includes(equipmentSearch.toLowerCase());
            const matchesLocation = item.location
                ? item.location.toLowerCase().includes(locationSearch.toLowerCase())
                : true; // ignore location if not present
            return matchesEquipment && matchesLocation;
        });

        setFilteredData(filtered);
    };

    // Show all if no search text or filtered data
    const displayData =
        !equipmentSearch.trim() && !locationSearch.trim()
            ? subcategory
            : filteredData;


    const handleRequestQuote = (data: any) => {
        if (user == null) {
            navigate("/login");
        } else if (user?.role == "customer") {
            navigate("/request-quote", { state: { data } });
        } else {
            navigate("/login");
        }
    };
    // Auto filter when typing
    useEffect(() => {
        handleSearch();
    }, [equipmentSearch, locationSearch]);

    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-blue-900 text-primary-foreground py-20 md:py-32">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{
                        backgroundImage: "url('https://placehold.co/1920x1080.png')",
                    }}
                    data-ai-hint="industrial machinery"
                ></div>

                <div className="relative flex flex-col gap-8 justify-center items-center text-center px-5">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
                        Heavy Equipment for Rent
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
                        Find and rent the right heavy machinery for your project, anywhere
                        in India. Competitive pricing and verified vendors.
                    </p>
                </div>

                {/* 🔍 Search Section */}
                <div className="absolute bottom-[-5.5rem] sm:bottom-[-2rem] left-1/2 transform -translate-x-1/2 w-full px-4 md:px-10">
                    <div className="mx-auto w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">

                        {/* Equipment Search */}
                        <div className="flex items-center flex-1 border-b md:border-b-0 md:border-r border-gray-200 px-3 py-2 sm:px-4 sm:py-3">
                            <Search className="w-5 h-5 text-gray-500 mr-2" />
                            <Input
                                type="text"
                                value={equipmentSearch}
                                onChange={(e) => setEquipmentSearch(e.target.value)}
                                placeholder="Search for equipment (e.g., Crane, JCB)"
                                className="border-none focus-visible:ring-0 text-gray-800 placeholder:text-gray-400 text-sm sm:text-base"
                            />
                        </div>

                        {/* Location Search */}
                        <div className="flex items-center flex-1 border-b md:border-b-0 md:border-r border-gray-200 px-3 py-2 sm:px-4 sm:py-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-gray-500 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="10" r="3" />
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                            </svg>
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
                            <Button
                                onClick={handleSearch}
                                className="w-full md:w-auto px-6 py-3 sm:px-10 sm:py-5 text-sm sm:text-base rounded-md"
                            >
                                Search
                            </Button>
                        </div>
                    </div>
                </div>

            </section>

            {/* Equipment Cards */}
            <section className="relative py-28 md:py-36 px-5 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {isLoading && (
                        <>
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex flex-col w-full gap-5">
                                    <Skeleton className="h-52 rounded-t-xl" />
                                    <div className="space-y-3">
                                        <Skeleton className="h-4" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {displayData && displayData?.length > 0 ? (
                        displayData.map((item: any) => {
                            // 🔍 Find matching product for this subcategory
                            const matchedProduct = products?.find(
                                (p: any) => p.sub_category === item.slug
                            );

                            return (
                                <div
                                    key={item.subcategory_id}
                                    className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col overflow-hidden group hover:shadow-xl transition-shadow duration-300"
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
                                            {item.subcategory_name}
                                        </h3>
                                        <p className="text-muted-foreground">{item.description}</p>

                                        <div className="mt-4">
                                            <p className="text-sm font-semibold text-foreground">
                                                Starting from
                                            </p>
                                            <p className="text-lg font-bold text-primary">
                                                {matchedProduct
                                                    ? `₹${matchedProduct.price_day}/day`
                                                    : "₹5,000/day"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="px-5 mt-auto mb-4">
                                        <Button
                                            className="w-full bg-blue-900"
                                            onClick={() => handleRequestQuote(item?.subcategory_name)}
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
            </section>

            <WhyHireSection category={categoryKey} />
        </>
    );
}

export default EquipmentCategoryPage;
