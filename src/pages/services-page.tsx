import { useNavigate } from "react-router-dom";
import { useGetCategory } from "../actions/category";


function ServicesPage() {
      const { category = [] } = useGetCategory();
  const navigate=useNavigate();
  const handleClick = (slug:any) => {
    navigate(`/category?type=${slug}`)
  }
    return (
        <>
            <section className="relative bg-blue-900 text-primary-foreground py-20 md:py-24">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{
                        backgroundImage: "url('https://placehold.co/1920x1080.png')",
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
                            className="bg-white rounded-xl shadow-md border p-6 flex flex-col items-center text-center hover:shadow-xl transition hover:-translate-y-2 cursor-pointer"
                            onClick={() => handleClick(data?.slug)}
                        >
                            {/* Icon / Image */}
                            <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full mb-4">
                                <img
                                    src={`${import.meta.env.VITE_URL}/${data.category_image}`}
                                    alt={data.category_name}
                                    className="w-10 h-10 object-contain"
                                />
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
