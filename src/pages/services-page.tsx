import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { category } from "../components/sections/services";


function ServicesPage() {
    
    const navigate = useNavigate();
    const handleClick = (slug: any) => {
        navigate(`/category?type=${slug}`)
    }
    const canonical = `${import.meta.env.VITE_URL}${location.pathname}`;
    return (
        <>
            <Helmet>
                <title>Services | Rento Connect</title>
                <meta name="description" content="Rento Connect Equipment Experts Mobility"></meta>
                <meta name="keywords" content="Rento Connect"></meta>
                <meta name="author" content="Rento Connect"></meta>
                <link rel="canonical" href={canonical} />

                <meta property="og:title" content="Services | Rento Connect Equipment Experts Mobility" />
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
            <section className="relative bg-blue-900 text-primary-foreground py-20 md:py-46">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{
                        backgroundImage: "url('/Rento_Website/1_Home_Page/Main_Banner Our Core Services.png')",
                    }}
                    data-ai-hint="industrial machinery"
                ></div>

                <div className="relative flex flex-col gap-8 justify-center items-center text-center">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
                        Our Core Services
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
                        Everything you need for your industrial operations, all in one place.
                    </p>
                </div>
            </section>
            <section className="py-20">
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6 px-4 md:px-10">
                    {category.map((data) => (
                        <div
                            key={data.category_id}
                            className="group bg-white rounded-xl shadow-md border p-6 flex flex-col items-center text-center hover:shadow-xl transition hover:-translate-y-2 cursor-pointer hover:border-2 hover:border-blue-900 duration-500"
                            onClick={() => handleClick(data?.slug)}
                        >
                            {/* Icon / Image */}
                            <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full mb-4 border-2 border-blue-900 group-hover:border-orange-600">
                                <div className="group">
                                    <img
                                        src={data.category_image}
                                        alt={data.category_name}
                                        className="w-20 h-20 object-contain group-hover:hidden duration-500 "
                                    />

                                    <img
                                        src={data.category_hover_image}
                                        alt={data.category_name}
                                        className="w-20 h-20 object-contain hidden group-hover:block duration-500"
                                    />
                                </div>

                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-blue-950">
                                {data.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[var(--color-muted-foreground)] mt-2">
                                {data.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default ServicesPage
