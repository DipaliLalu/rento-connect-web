import { useNavigate } from "react-router-dom";
import { useGetSubCategoryWithSlug } from "../actions/subcategory";
import { Button } from "../components/ui/button";
import WhyHireSection from "../components/sections/why-hire-section";
import { getVendorInfo } from "../utils/vendor-utils";
import { Skeleton } from "../components/ui/skeleton";
import { useGetProductWithSlug } from "../actions/product";

function ExpertsCategoryPage() {
  const categoryKey = "experts";
  const navigate = useNavigate();
  const { subcategory, isLoading } = useGetSubCategoryWithSlug(categoryKey);
  const { products } = useGetProductWithSlug(categoryKey);
  const user = getVendorInfo();

  const handleRequestQuote = (data: any) => {
    if (!user) {
      navigate("/login");
    } else if (user?.role === "customer") {
      navigate("/request-quote", { state: { data } });
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-primary-foreground py-20 md:py-32 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('https://placehold.co/1920x1080.png')",
          }}
          data-ai-hint="industrial machinery"
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

        <Button
          className="px-6 py-5 rounded-md mt-6"
          onClick={() => navigate("/services")}
        >
          Find an Expert
        </Button>
      </section>

      {/* Experts Cards */}
      <section className="relative py-20 md:py-32 px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Skeleton Loading */}
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

          {/* Cards */}
          {subcategory?.map((item) => {
            // ✅ Find product where sub_category === subcategory.slug
            const matchedProduct = products?.find(
              (p: any) => p.sub_category === item.slug
            );

            return (
              <div
                key={item.subcategory_id}
                className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-48 w-full">
                  <img
                    src={`${import.meta.env.VITE_URL}/${item.subcategory_image}`}
                    alt={item.subcategory_name}
                    loading="lazy"
                    className="transition-transform duration-300 group-hover:scale-110 w-full h-full object-cover"
                  />
                </div>

                {/* Title + Description */}
                <div className="flex flex-col gap-2 py-4 p-5 flex-1">
                  <h3 className="font-semibold tracking-tight font-headline text-xl text-blue-950">
                    {item.subcategory_name}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>

                  {/* ✅ Dynamic price from product */}
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

                {/* Request Quote Button */}
                <div className="px-5 mt-auto mb-4">
                  <Button
                    className="w-full bg-blue-900"
                    onClick={() =>
                      handleRequestQuote(item?.subcategory_name)
                    }
                  >
                    Request Quote
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <WhyHireSection category={categoryKey} />
    </>
  );
}

export default ExpertsCategoryPage;
