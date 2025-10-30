import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetSubCategoryWithSlug } from "../actions/subcategory";
import { useGetCategory } from "../actions/category";
import { Button } from "../components/ui/button";
import WhyHireSection from "../components/sections/why-hire-section";
import { getVendorInfo } from "../utils/vendor-utils";


function CategoryPage() {
    const [searchParams] = useSearchParams();
    const navigate=useNavigate();
    const categoryFromURL = searchParams.get("type");
    const { subcategory } = useGetSubCategoryWithSlug(categoryFromURL);
    const { category } = useGetCategory();
    const filterCategory = category?.find((data) => data.slug == categoryFromURL);
    const validCategories = ["equipment", "experts", "mobility"] as const;
    const user=getVendorInfo();
   
    const categoryKey =
        categoryFromURL && validCategories.includes(categoryFromURL as any)
            ? (categoryFromURL as typeof validCategories[number])
            : "equipment"; // default fallback

    const handleRequestQuote=(data:any)=>{
        if(user == null){
            navigate('/login');
        }
        if(user?.role == 'customer'){
            navigate('/request-quote',{state :{data}});
        }else{
            navigate('/login');
        }
    }

    return (
        <>
            <section className="relative bg-blue-900 text-primary-foreground py-20 md:py-32">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{
                        backgroundImage: "url('https://placehold.co/1920x1080.png')",
                    }}
                    data-ai-hint="industrial machinery"
                ></div>

                <div className="relative flex flex-col gap-8 justify-center items-center text-center">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
                        {filterCategory?.heading}
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
                        {filterCategory?.description}
                    </p>
                </div>
            </section>

            <section className="relative py-20 md:py-32 px-5 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {subcategory?.map((item) => (
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
                                <div className="mt-4">
                                    <p className="text-sm font-semibold text-foreground">Starting from</p>
                                    <p className="text-lg font-bold text-primary">₹5,000/day</p>
                                </div>
                            </div>

                            {/* Request Quote Button at bottom */}
                            <div className="px-5 mt-auto mb-4">
                                <Button className="w-full bg-blue-900" onClick={()=> handleRequestQuote(item?.subcategory_name)}>
                                        Request Quote
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <WhyHireSection category={categoryKey} />
        </>
    )
}

export default CategoryPage
