import { Link } from "react-router-dom";
import { useGetBlogs } from "../actions/blog"
import DOMPurify from "dompurify";
import { Skeleton } from "../components/ui/skeleton";
import { FiUser } from "react-icons/fi";
import { MdDateRange } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

function BlogListPage() {
    const { blogs, isLoading } = useGetBlogs();

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

                <div className="relative flex flex-col gap-5 justify-center items-center text-center">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
                        Industry Blog & Tips
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
                        Useful content and insights for businesses and equipment owners in the industrial sector.
                    </p>
                </div>
            </section>
            <section className="relative py-20 md:py-32 px-5 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading && (
                        <>
                            <div className="flex flex-col w-full gap-5">
                                <Skeleton className="h-52 rounded-t-xl" />
                                <div className="space-y-3">
                                    <Skeleton className="h-4" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-5">
                                <Skeleton className="h-52 rounded-t-xl" />
                                <div className="space-y-3">
                                    <Skeleton className="h-4" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-5">
                                <Skeleton className="h-52 rounded-t-xl" />
                                <div className="space-y-3">
                                    <Skeleton className="h-4" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                        </>
                    )}
                    {blogs?.map((item) => {
                        const cleanHTML = DOMPurify.sanitize(item.description || "");
                        const truncatedText =
                            cleanHTML.length > 100 ? cleanHTML.slice(0, 200) + "..." : cleanHTML
                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group"
                            >
                                {/* Image Section */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={`${import.meta.env.VITE_URL}/${item.image}`}
                                        alt={item?.title || "blog image"}
                                        loading="lazy"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                {/* Content Section */}
                                <div className="flex flex-col p-6 flex-1">
                                    {/* Author + Date */}
                                    <div className="flex items-center justify-between text-gray-600 text-sm mb-3">
                                        <div className="flex items-center gap-2">
                                            <FiUser className="text-[var(--brand-color)]" />
                                            <span className="font-medium">Rento Connect</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MdDateRange className="text-[var(--brand-color)]" />
                                            <span>{item.created_at}</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-headline text-xl font-semibold text-blue-950 group-hover:text-[var(--brand-color)] transition-colors duration-300 mb-2">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        className="text-gray-600 text-sm leading-relaxed line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: truncatedText }}
                                    ></p>

                                    {/* Read More */}
                                    <div className="mt-4">
                                        <Link
                                            to={`/blogdetail`}
                                            state={item}
                                            className="inline-flex items-center gap-2 text-blue-800 font-semibold text-sm group-hover:gap-3 hover:underline transition-all duration-300"
                                        >
                                            Read More
                                           <FaArrowRight className="mt-1"/>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default BlogListPage
