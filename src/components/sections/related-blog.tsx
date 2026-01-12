import DOMPurify from "dompurify";
import { useGetRelatedBlogs } from "../../actions/blog";
import { Skeleton } from "../ui/skeleton";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

interface RelatedBlogProps {
    category?: string;
    blogid?: number;
}

function RelatedBlog({ category, blogid }: RelatedBlogProps) {
    const { blogs, isLoading } = useGetRelatedBlogs(category, blogid);

    if (!category) return null;

    return (
        <section className="relative py-20 md:py-18 px-5 md:px-10">
            <h2 className="md:text-4xl text-2xl font-bold text-blue-950 mb-8 text-center">
                Related Blogs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* 🔄 Loading */}
                {isLoading &&
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex flex-col w-full gap-5">
                            <Skeleton className="h-52 rounded-t-xl" />
                            <div className="space-y-3">
                                <Skeleton className="h-4" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </div>
                    ))}

                {/* ❌ Empty State */}
                {!isLoading && blogs?.length === 0 && (
                    <p className="col-span-full text-center text-gray-500">
                        No related blogs found.
                    </p>
                )}

                {/* ✅ Blogs */}
                {blogs?.map((item) => {
                    const cleanHTML = DOMPurify.sanitize(item.description || "");
                    const truncatedText =
                        cleanHTML.length > 200
                            ? cleanHTML.slice(0, 200) + "..."
                            : cleanHTML;

                    return (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl transition-all duration-500 overflow-hidden flex flex-col group border-orange-500 hover:border-blue-500 border-2 hover:-translate-y-2"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={`${import.meta.env.VITE_URL}/${item.image}`}
                                    alt={item.title || ""}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col p-6 flex-1">
                                <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                                    <MdDateRange className="text-[var(--brand-color)]" />
                                    <span>
                                        {item.created_at
                                            ? new Date(item.created_at)
                                                .toLocaleDateString("en-GB")
                                                .replace(/\//g, "-")
                                            : "-"}
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold text-blue-950 group-hover:text-[var(--brand-color)] mb-2">
                                    {item.title}
                                </h3>

                                <p
                                    className="text-gray-600 text-sm line-clamp-3"
                                    dangerouslySetInnerHTML={{ __html: truncatedText }}
                                />

                                <Link
                                    to="/blogdetail"
                                    onClick={() => {
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        });
                                    }}
                                    state={{
                                        item: item,
                                    }}
                                    className="mt-4 inline-flex items-center gap-2 text-blue-800 font-semibold text-sm hover:underline"
                                >
                                    Read More <FaArrowRight />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default RelatedBlog;
