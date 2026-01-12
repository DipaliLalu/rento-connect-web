import { Link } from "react-router-dom";
import { useGetBlogsWithPagination } from "../actions/blog"
import DOMPurify from "dompurify";
import { Skeleton } from "../components/ui/skeleton";
import { MdDateRange } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { Input } from "../components/ui/input";

function BlogListPage() {
    const h1Ref = useRef<HTMLHtmlElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const { blogs, isLoading, pager } = useGetBlogsWithPagination(currentPage, search);
    const totalPages = pager?.totalPages ?? 1;
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= (pager?.totalPages ?? 1)) {
            setCurrentPage(page);
            // Scroll to h1
            if (h1Ref.current) {
                h1Ref.current.scrollIntoView({ behavior: "smooth" });
            }
        }
    };
    useEffect(() => {
        const t = setTimeout(() => {
            setCurrentPage(1);
        }, 500);

        return () => clearTimeout(t);
    }, [search]);


    return (
        <>
            <section className="relative bg-blue-900 text-primary-foreground py-20 md:h-92">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
                    style={{
                        backgroundImage: "url('/1250_368/Industry-Blog-&-Tips.png')",
                    }}
                    data-ai-hint="industrial machinery"
                ></div>
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative flex flex-col gap-5 justify-center items-center text-center top-[100px] md:top-1/2 left-1/2 -translate-1/2">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
                        Industry Blog & Tips
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg md:text-xl">
                        Useful content and insights for businesses and equipment owners in the industrial sector.
                    </p>
                </div>
                {/* Search Section */}
                <div className="absolute bottom-[-5.5rem] sm:bottom-[-2rem] left-1/2 transform -translate-x-1/2 w-full px-4 md:px-10">
                    <div className="mx-auto w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden border-2 border-orange-500">
                        <div className="flex items-center flex-1 border-r border-gray-200 px-3 py-2 sm:px-4 sm:py-3 group">
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
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search blog by title"
                                className="border-none focus-visible:ring-0 text-gray-800 placeholder:text-gray-400"
                            />
                        </div>

                    </div>
                </div>
            </section>
            <section className="relative py-20 md:py-18 px-5 md:px-10" ref={h1Ref}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                                className="bg-white rounded-2xl transition-all duration-500 overflow-hidden flex flex-col group border-orange-500 hover:border-blue-500 border-2 hover:-translate-y-2 "
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
                                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> */}
                                </div>

                                {/* Content Section */}
                                <div className="flex flex-col p-6 flex-1">
                                    {/* Author + Date */}
                                    <div className="flex items-center justify-between text-gray-600 text-sm mb-3">
                                        <div className="flex items-center gap-2">
                                            <MdDateRange className="text-[var(--brand-color)]" />
                                            <span>
                                                {item.created_at
                                                    ? new Date(item.created_at)
                                                        .toLocaleDateString("en-GB")
                                                        .replace(/\//g, "-")
                                                    : "-"}
                                            </span>


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
                                            state={{
                                                item: item,
                                            }}
                                            className="inline-flex items-center gap-2 text-blue-800 font-semibold text-sm group-hover:gap-3 hover:underline transition-all duration-300"
                                        >
                                            Read More
                                            <FaArrowRight className="mt-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-18">

                        {/* ⬅ PREVIOUS */}
                        {currentPage !== 1 && <Button
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            variant="custom"
                        >
                            <FaAnglesLeft />
                        </Button>}

                        {/* PAGE NUMBERS */}
                        {Array.from({ length: totalPages }, (_, i) => {
                            const pageNumber = i + 1;
                            const isActive = currentPage === pageNumber;

                            return (
                                <Button
                                    key={pageNumber}
                                    size="sm"
                                    onClick={() => handlePageChange(pageNumber)}
                                    variant={"custom"}
                                    data-active={isActive ? "true" : "false"}
                                >
                                    {pageNumber}
                                </Button>
                            );
                        })}

                        {/* ➡ NEXT */}
                        <Button
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            variant="custom"
                        >
                            <FaAnglesRight />
                        </Button>
                    </div>
                )}
            </section>
        </>
    )
}

export default BlogListPage
