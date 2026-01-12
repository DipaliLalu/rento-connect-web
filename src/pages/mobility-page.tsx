import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import WhyHireSection from "../components/sections/why-hire-section";
import { useGetMobilityWithSlug } from "../actions/subcategory";
// import { useGetProductWithSlug } from "../actions/product";
import { getVendorInfo } from "../utils/vendor-utils";
import { Input } from "../components/ui/input";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

export default function MobilityCategoryPage() {
  const categoryKey = "mobility";
  const navigate = useNavigate();
  const taxiRef = useRef<HTMLHeadingElement>(null);
  const busRef = useRef<HTMLHeadingElement>(null);
  const [taxiPage, setTaxiPage] = useState<number>(1);
  const [busPage, setBusPage] = useState(1);
  const { subcategory: taxiData, isLoading: taxiLoading, pager: taxiPager } = useGetMobilityWithSlug(categoryKey, taxiPage, "taxi-services");
console.log(taxiData,taxiPager)
  const {
    subcategory: busData,
    isLoading: busLoading,
    pager: busPager,
  } = useGetMobilityWithSlug(categoryKey, busPage, "staff-bus-services");

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
  // 🔹 SAME pagination handler as Experts
  const handlePageChange = (
    page: number,
    lastPage: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    ref: React.RefObject<HTMLHeadingElement | null>
  ) => {
    if (page >= 1 && page <= lastPage) {
      setPage(page);
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  // ✅ SEARCH FILTER (display_name & subcategory_name)
  // 🔹 Search filter (client-side on current page)
  const filteredSubcategory = (data: any[] | undefined) =>
    (data || [])?.filter(
      (item) =>
        item.display_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.subcategory_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  const canonical = `${import.meta.env.VITE_URL}${location.pathname}`;
  return (
    <>
      <Helmet>
        <title>Mobility | Rento Connect</title>
        <meta name="description" content="Rento Connect Equipment Experts Mobility"></meta>
        <meta name="keywords" content="Rento Connect"></meta>
        <meta name="author" content="Rento Connect"></meta>
        <link rel="canonical" href={canonical} />

        <meta property="og:title" content="Mobility | Rento Connect Equipment Experts Mobility" />
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
      {/* HERO SECTION */}
      <section className="relative bg-[#1E3A8A] text-white py-24 md:h-96 text-center">
        {/* 🔹 Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="/Rento_Website/4_Mobility/Your Partner in Workforce Mobility.mp4"
            type="video/mp4"
          />
        </video>

        {/* 🔹 Overlay (same opacity like earlier bg image) */}
        <div className="absolute inset-0 bg-black/20"></div>
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
          <div className="mx-auto w-full max-w-5xl flex bg-white rounded-lg shadow-xl overflow-hidden  border-2 border-orange-500">
            <div className="flex items-center flex-1 px-4 py-3 group">
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
      <section className="py-20 md:py-18 bg-gray-50 px-5 md:px-10">
        <h2 ref={taxiRef} className="text-3xl font-bold text-blue-900 text-center mb-10">
          Taxi Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {taxiLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col w-full gap-5">
                <Skeleton className="h-52 rounded-t-xl" />
                <div className="space-y-3">
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))
          ) : (
            <>
              {filteredSubcategory(taxiData)
                .length === 0 && searchTerm ? (
                <p className="col-span-full text-center text-gray-500 text-lg">
                  No Taxi Services Found
                </p>
              ) : (
                filteredSubcategory(taxiData)?.map((item: any) => (
                  <div
                    key={item.subcategory_id}
                    className="rounded-lg border-2 bg-card text-card-foreground shadow-sm flex flex-col overflow-hidden group transition hover:-translate-y-2 hover:border-2 hover:border-blue-900 duration-500 border-orange-500"
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
                          {`₹${item.price_perhour}/hour`}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {`₹${item.price_perday}/day`}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 mt-auto mb-4">
                      <Button
                        className="w-full"
                        variant={"custom"}
                        onClick={() =>
                          handleRequestQuote(item?.display_name)
                        }
                      >
                        Request Quote
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
        {/* Pagination Controls */}
        {/* TAXI PAGINATION */}
        {taxiPager && taxiPager.last_page > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
             {taxiPage !== 1 && <Button
              size="sm"
              variant="custom"
              disabled={taxiPage === 1}
              onClick={() =>
                handlePageChange(
                  taxiPage - 1,
                  taxiPager.last_page,
                  setTaxiPage,
                  taxiRef
                )
              }
            >
              <FaAnglesLeft />
            </Button>}

            {Array.from({ length: taxiPager.last_page }, (_, i) => (
              <Button
                key={i}
                size="sm"
                variant="custom"
                data-active={taxiPage === i + 1}
                onClick={() =>
                  handlePageChange(
                    i + 1,
                    taxiPager.last_page,
                    setTaxiPage,
                    taxiRef
                  )
                }
              >
                {i + 1}
              </Button>
            ))}

            <Button
              size="sm"
              variant="custom"
              disabled={taxiPage === taxiPager.last_page}
              onClick={() =>
                handlePageChange(
                  taxiPage + 1,
                  taxiPager.last_page,
                  setTaxiPage,
                  taxiRef
                )
              }
            >
              <FaAnglesRight />
            </Button>
          </div>
        )}
      </section>

      {/* STAFF BUS SERVICES */}
      <section className="py-20 md:py-20 bg-white px-5 md:px-10">
        <h2 ref={busRef} className="text-3xl font-bold text-blue-900 text-center mb-10">
          Staff Bus Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {busLoading ? (
           [...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col w-full gap-5">
                <Skeleton className="h-52 rounded-t-xl" />
                <div className="space-y-3">
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))
          ) : (
            <>
              {filteredSubcategory(busData)
                .length === 0 && searchTerm ? (
                <p className="col-span-full text-center text-gray-500 text-lg">
                  No Staff Bus Services Found
                </p>
              ) : (
                filteredSubcategory(busData)
                  .map((item) => (
                    <div
                      key={item.subcategory_id}
                      className="rounded-lg border-2 bg-card text-card-foreground shadow-sm flex flex-col overflow-hidden group transition hover:-translate-y-2 hover:border-2 hover:border-blue-900 duration-500 border-orange-500"
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
                            {`₹${item.price_perhour}/hour`}
                          </p>
                          <p className="text-lg font-bold text-primary">
                            {`₹${item.price_perday}/day`}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 mt-auto mb-4">
                        <Button
                          className="w-full"
                          variant={"custom"}
                          onClick={() =>
                            handleRequestQuote(item?.display_name)
                          }
                        >
                          Request Quote
                        </Button>
                      </div>
                    </div>
                  ))
              )}
            </>
          )}
        </div>
        {/* BUS PAGINATION */}
         {busPager&& busPager?.last_page > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
          {busPage === 1 && <Button
              size="sm"
              variant="custom"
              disabled={busPage === 1}
              onClick={() =>
                handlePageChange(
                  busPage - 1,
                  busPager.last_page,
                  setBusPage,
                  busRef
                )
              }
            >
              <FaAnglesLeft />
            </Button>}

            {Array.from({ length: busPager.last_page }, (_, i) => (
              <Button
                key={i}
                size="sm"
                variant="custom"
                data-active={busPage === i + 1}
                onClick={() =>
                  handlePageChange(
                    i + 1,
                    busPager.last_page,
                    setBusPage,
                    busRef
                  )
                }
              >
                {i + 1}
              </Button>
            ))}

            <Button
              size="sm"
              variant="custom"
              disabled={busPage === busPager.last_page}
              onClick={() =>
                handlePageChange(
                  busPage + 1,
                  busPager.last_page,
                  setBusPage,
                  busRef
                )
              }
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
