import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import WhyHireSection from "../components/sections/why-hire-section";
import { useGetSubCategoryWithSlug } from "../actions/subcategory";
import { useGetProductWithSlug } from "../actions/product";
import { getVendorInfo } from "../utils/vendor-utils";

export default function MobilityCategoryPage() {
  const categoryKey = "mobility";
  const navigate = useNavigate();
  const { subcategory, isLoading } = useGetSubCategoryWithSlug(categoryKey);
  const { products } = useGetProductWithSlug(categoryKey);
  const user = getVendorInfo();

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
            On-demand taxis and contract-based buses.
          </p>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-5 text-lg rounded-md"
            onClick={() => navigate("/services")}
          >
            Request a Quote
          </Button>
        </div>
      </section>

      {/* TAXI SERVICES */}
      <section className="py-20 md:py-28 bg-gray-50 px-5 md:px-10">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl">
              🚗
            </div>
          </div>
          <h2 className="text-3xl font-bold text-blue-900 mb-2">Taxi Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Well-maintained vehicles with professional drivers for staff pick-up and
            drop, shift changes, and field operations.
          </p>
        </div>

        <div className="mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading ? (
            <>
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col w-full gap-5">
                  <Skeleton className="h-52 rounded-t-xl" />
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </div>
              ))}
            </>
          ) : (
            <>
              {subcategory
                ?.filter((s) => s.type === "taxi-services")
                .map((item) => (
                  <div
                    key={item.subcategory_id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all flex flex-col"
                  >
                    <img
                      src={`${import.meta.env.VITE_URL}/${item.subcategory_image}`}
                      alt={item.subcategory_name}
                      className="w-full h-60 object-cover"
                    />
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">
                          {item.subcategory_name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-2">
                          {item.description}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleRequestQuote(item)}
                        className="mt-4 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white w-full"
                      >
                        Request Quote
                      </Button>
                    </div>
                  </div>
                ))}

              {products
                ?.filter((p) => p.category === categoryKey)
                .map((product) => (
                  <div
                    key={product.product_id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all flex flex-col"
                  >
                    <img
                      src={`${import.meta.env.VITE_URL}/${product.product_image}`}
                      alt={product.product_name}
                      className="w-full h-60 object-cover"
                    />
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">
                          {product.product_name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-2">
                          {product.description}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleRequestQuote(product)}
                        className="mt-4 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white w-full"
                      >
                        Request Quote
                      </Button>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </section>

      {/* STAFF BUS SERVICES */}
      <section className="py-20 md:py-28 bg-white px-5 md:px-10">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl">
              🚌
            </div>
          </div>
          <h2 className="text-3xl font-bold text-blue-900 mb-2">Staff Bus Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our fleet includes a variety of buses suited for daily employee commutes
            or long-term industrial transport contracts.
          </p>
        </div>

        <div className="mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col w-full gap-5">
                  <Skeleton className="h-40 rounded-t-xl" />
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </div>
              ))}
            </>
          ) : (
            <>
              {subcategory
                ?.filter((s) => s.type === "staff-bus-services")
                .map((item) => (
                  <div
                    key={item.subcategory_id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all flex flex-col"
                  >
                    <img
                      src={`${import.meta.env.VITE_URL}/${item.subcategory_image}`}
                      alt={item.subcategory_name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">
                          {item.subcategory_name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-2">
                          {item.description}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleRequestQuote(item)}
                        className="mt-4 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white w-full"
                      >
                        Request Quote
                      </Button>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </section>

      {/* WHY HIRE SECTION */}
      <WhyHireSection category={categoryKey} />
    </>
  );
}
