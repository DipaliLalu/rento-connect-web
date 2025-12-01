import { useNavigate } from "react-router-dom";
import { useGetSubCategoryWithSlug } from "../actions/subcategory";
import { Button } from "../components/ui/button";
import WhyHireSection from "../components/sections/why-hire-section";
import { getVendorInfo } from "../utils/vendor-utils";
import { Skeleton } from "../components/ui/skeleton";
import { useGetProductWithSlug } from "../actions/product";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

function ExpertsCategoryPage() {
  const categoryKey = "experts";
  const navigate = useNavigate();
  const { subcategory, isLoading } = useGetSubCategoryWithSlug(categoryKey);
  const { products } = useGetProductWithSlug(categoryKey);
  const user = getVendorInfo();
  const [expertsSearch, setExpertsSearch] = useState("");

  const handleRequestQuote = (data: any) => {
    if (!user) {
      navigate("/login");
    } else if (user?.role === "customer") {
      navigate("/request-quote", { state: { data } });
    } else {
      navigate("/login");
    }
  };

  // ✅ FILTER LOGIC (display_name પર)
  const filteredExperts = subcategory?.filter((item: any) =>
    item.display_name
      .toLowerCase()
      .includes(expertsSearch.toLowerCase())
  );
const canonical = `${import.meta.env.VITE_URL}${location.pathname}`;
  return (
    <>
     <Helmet>
                <title>Experts | Rento Connect</title>
                <meta name="description" content="Rento Connect Equipment Experts Mobility"></meta>
                <meta name="keywords" content="Rento Connect"></meta>
                <meta name="author" content="Rento Connect"></meta>
                <link rel="canonical" href={canonical} />

                <meta property="og:title" content="Experts | Rento Connect Equipment Experts Mobility" />
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
      <section className="relative bg-blue-900 text-primary-foreground py-20 md:py-32 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('https://placehold.co/1920x1080.png')",
          }}
        ></div>

        <div className="relative flex flex-col gap-8 justify-center items-center text-center">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
            Experts On-Demand
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
            Access a nationwide network of certified and experienced industrial professionals.
            From PLC programmers to safety officers, find the right expert for your project.
          </p>
        </div>

        {/* Search Section */}
        <div className="absolute bottom-[-5.5rem] sm:bottom-[-2rem] left-1/2 transform -translate-x-1/2 w-full px-4 md:px-10">
          <div className="mx-auto w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
            <div className="flex items-center flex-1 border-r border-gray-200 px-3 py-2 sm:px-4 sm:py-3">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <Input
                type="text"
                value={expertsSearch}
                onChange={(e) => setExpertsSearch(e.target.value)}
                placeholder="Search expert (e.g. Electrician, PLC Engineer)"
                className="border-none focus-visible:ring-0 text-gray-800 placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experts Cards */}
      <section className="relative py-20 md:py-32 px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {/* Skeleton Loading */}
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

          {/* ✅ Filtered Experts Result */}
          {filteredExperts && filteredExperts.length > 0 ? (
            filteredExperts.map((item: any) => {
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
                      alt={item.display_name}
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
                          ? `₹${matchedProduct.price_day}/day`
                          : `₹${item.price}/day`}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 mt-auto mb-4">
                    <Button
                      className="w-full bg-blue-900"
                      onClick={() =>
                        handleRequestQuote(item?.display_name)
                      }
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
                No experts found for your search.
              </p>
            )
          )}
        </div>
      </section>

      <WhyHireSection category={categoryKey} />
    </>
  );
}

export default ExpertsCategoryPage;
