import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import WhyHireSection from "../components/sections/why-hire-section";
import { useGetSubCategoryWithSlug } from "../actions/subcategory";
// import { useGetProductWithSlug } from "../actions/product";
import { getVendorInfo } from "../utils/vendor-utils";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function MobilityCategoryPage() {
  const categoryKey = "mobility";
  const navigate = useNavigate();
  const { subcategory, isLoading } = useGetSubCategoryWithSlug(categoryKey);
  // const { products } = useGetProductWithSlug(categoryKey);
  const user = getVendorInfo();

  const [searchTerm, setSearchTerm] = useState("");

  const handleRequestQuote = (data: any) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user?.role === "customer") {
      navigate("/request-quote", { state: { data } });
    } else {
      navigate("/login");
    }
  };

  // ✅ SEARCH FILTER (display_name & subcategory_name)
  const filteredSubcategory = subcategory?.filter((item: any) =>
    item.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subcategory_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-[#1E3A8A] text-white py-24 md:py-32 text-center">
        <div className="absolute inset-0 opacity-10 bg-[url('https://placehold.co/1920x1080')] bg-cover bg-center" />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Industrial Mobility Solutions
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-8">
            Reliable, scalable, and customized transport solutions for your workforce.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="absolute bottom-[-5.5rem] sm:bottom-[-2rem] left-1/2 transform -translate-x-1/2 w-full px-4 md:px-10">
          <div className="mx-auto w-full max-w-5xl flex bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
            <div className="flex items-center flex-1 px-4 py-3">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search mobility service..."
                className="border-none focus-visible:ring-0 text-black"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TAXI SERVICES */}
      <section className="py-20 md:py-28 bg-gray-50 px-5 md:px-10">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-10">
          Taxi Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading ? (
            [...Array(2)].map((_, i) => <Skeleton key={i} className="h-64" />)
          ) : (
            <>
              {filteredSubcategory
                ?.filter((s) => s.type === "taxi-services")
                .length === 0 && searchTerm ? (
                <p className="col-span-full text-center text-gray-500 text-lg">
                  No Taxi Services Found
                </p>
              ) : (
                filteredSubcategory
                  ?.filter((s) => s.type === "taxi-services")
                  .map((item) => (
                    <div
                      key={item.subcategory_id}
                      className="bg-white rounded-lg shadow p-5"
                    >
                      <img
                        src={`${import.meta.env.VITE_URL}/${item.subcategory_image}`}
                        className="h-56 w-full object-cover rounded"
                      />
                      <h3 className="text-lg font-semibold mt-4">
                        {item.display_name || item.subcategory_name}
                      </h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <Button
                        onClick={() => handleRequestQuote(item)}
                        className="mt-4 w-full bg-[#1E3A8A] text-white"
                      >
                        Request Quote
                      </Button>
                    </div>
                  ))
              )}
            </>
          )}
        </div>
      </section>

      {/* STAFF BUS SERVICES */}
      <section className="py-20 md:py-28 bg-white px-5 md:px-10">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-10">
          Staff Bus Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            [...Array(3)].map((_, i) => <Skeleton key={i} className="h-64" />)
          ) : (
            <>
              {filteredSubcategory
                ?.filter((s) => s.type === "staff-bus-services")
                .length === 0 && searchTerm ? (
                <p className="col-span-full text-center text-gray-500 text-lg">
                  No Staff Bus Services Found
                </p>
              ) : (
                filteredSubcategory
                  ?.filter((s) => s.type === "staff-bus-services")
                  .map((item) => (
                    <div
                      key={item.subcategory_id}
                      className="bg-white rounded-lg shadow p-5"
                    >
                      <img
                        src={`${import.meta.env.VITE_URL}/${item.subcategory_image}`}
                        className="h-48 w-full object-cover rounded"
                      />
                      <h3 className="text-lg font-semibold mt-4">
                        {item.display_name || item.subcategory_name}
                      </h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <Button
                        onClick={() => handleRequestQuote(item)}
                        className="mt-4 w-full bg-[#1E3A8A] text-white"
                      >
                        Request Quote
                      </Button>
                    </div>
                  ))
              )}
            </>
          )}
        </div>
      </section>

      <WhyHireSection category={categoryKey} />
    </>
  );
}
