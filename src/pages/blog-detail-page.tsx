import { Link, useLocation } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";
import RelatedBlog from "../components/sections/related-blog";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { useGetNextPrevBlogs } from "../actions/blog";

export default function BlogDetailPage() {
  const location = useLocation();
  const blog = location.state;
  const { next, prev } = useGetNextPrevBlogs(blog.item.id);

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Blog not found
      </div>
    );
  }

  const cleanHTML = DOMPurify.sanitize(blog.item.description || "");
  const canonical = `${import.meta.env.VITE_URL}${location.pathname}`;
  return (
    <>
      <Helmet>
        <title>Blog Detail Page | Rento Connect</title>
        <meta name="description" content="Rento Connect Equipment Experts Mobility"></meta>
        <meta name="keywords" content="Rento Connect"></meta>
        <meta name="author" content="Rento Connect"></meta>
        <link rel="canonical" href={canonical} />

        <meta property="og:title" content="Blog Detail Page | Rento Connect Equipment Experts Mobility" />
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
      <div className="bg-gray-50 text-gray-900 py-10 md:py-14 px-5 md:px-10">

        <section className="mx-auto px-10">

          {/* Blog Image */}
          <div className="rounded-xl overflow-hidden shadow-md mb-10">
            <img
              src={`${import.meta.env.VITE_URL}/${blog.item.image}`}
              alt={blog.item.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Author + Date */}
          <div className="flex items-center gap-5 text-gray-600 mb-5">
            <div className="flex items-center gap-2">
              <MdDateRange className="text-[var(--brand-color)]" />
              <span> {blog.item.created_at
                ? new Date(blog.item.created_at)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, "-")
                : "-"}</span>
            </div>
          </div>
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-blue-950 mb-8">
            {blog.item.title}
          </h1>

          {/* Blog Content */}
          <article
            className="prose prose-lg prose-blue max-w-none leading-relaxed text-gray-800"
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
          ></article>

          {/* Back Link
          <div>
            <Link
              to="/blog"
              className="inline-flex gap-3 text-blue-900 items-center hover:underline font-medium mt-5"
            >
              <GoArrowLeft />
              Back to all posts
            </Link>
          </div> */}
        </section>
        <hr className="border-[1.3px] mx-10 mt-5" />
        <section className="flex md:gap-5 items-center  mb-4 mx-4 md:mx-24 flex-col md:flex-row">
          <h3 className="text-2xl font-semibold text-blue-950 mt-3">Share</h3>
          <li className="flex items-center gap-3 mt-4 flex-wrap">
            {/* Facebook */}
            <div className="group cursor-pointer">
              <img
                src="/Rento_Website/Social Media/Facebook1.png"
                alt="Facebook"
                className="w-10 h-10 object-contain border-2 border-blue-900 rounded-full group-hover:hidden transition"
              />
              <img
                src="/Rento_Website/Social Media/Facebook2.png"
                alt="Facebook"
                className="w-10 h-10 object-contain hidden border-2 border-orange-600 rounded-full group-hover:block transition"
              />
            </div>

            {/* Twitter */}
            <div className="group cursor-pointer">
              <img
                src="/Rento_Website/Social Media/Tweeter1.png"
                alt="Twitter"
                className="w-10 h-10 object-contain border-2 border-blue-900 rounded-full group-hover:hidden transition"
              />
              <img
                src="/Rento_Website/Social Media/Tweeter2.png"
                alt="Twitter"
                className="w-10 h-10 object-contain hidden border-2 border-orange-600 rounded-full group-hover:block transition"
              />
            </div>

            {/* Instagram */}
            <div className="group cursor-pointer">
              <img
                src="/Rento_Website/Social Media/Instagram1.png"
                alt="Instagram"
                className="w-10 h-10 object-contain border-2 border-blue-900 rounded-full group-hover:hidden transition"
              />
              <img
                src="/Rento_Website/Social Media/Instagram2.png"
                alt="Instagram"
                className="w-10 h-10 object-contain hidden border-2 border-orange-600 rounded-full group-hover:block transition"
              />
            </div>

            {/* LinkedIn */}
            <div className="group cursor-pointer">
              <img
                src="/Rento_Website/Social Media/Linkdin1.png"
                alt="LinkedIn"
                className="w-10 h-10 object-contain border-2 border-blue-900 rounded-full group-hover:hidden transition"
              />
              <img
                src="/Rento_Website/Social Media/Linkdin2.png"
                alt="LinkedIn"
                className="w-10 h-10 object-contain hidden border-2 border-orange-600 rounded-full group-hover:block transition"
              />
            </div>

            {/* YouTube */}
            <div className="group cursor-pointer">
              <img
                src="/Rento_Website/Social Media/Youtube1.png"
                alt="YouTube"
                className="w-10 h-10 object-contain border-2 border-blue-900 rounded-full group-hover:hidden transition"
              />
              <img
                src="/Rento_Website/Social Media/Youtube2.png"
                alt="YouTube"
                className="w-10 h-10 object-contain hidden border-2 border-orange-600 rounded-full group-hover:block transition"
              />
            </div>
          </li>
        </section>
        <hr className="border-[1.3px] mx-10 mb-3" />
        <RelatedBlog category={blog.item.category} blogid={blog.item.id} />
      </div>
      {prev && (
        <div className="fixed bottom-8 left-0 z-50 group">
          {/* ORANGE BUTTON */}
          <Link to={`/blogdetail`}
            state={{
              item: prev,
            }}
             className="bg-orange-500 px-3 py-6 flex justify-center items-center cursor-pointer rounded-tr-sm rounded-br-sm group-hover:rounded-none">
            <FaAnglesLeft className="text-white text-xl" />
          </Link>

          {/* HOVER CONTENT */}
          <div
            className="
                absolute left-full bottom-0
                w-70 h-[68px]
                shadow-xl
                opacity-0 translate-x-[-9px]
                group-hover:opacity-100 group-hover:translate-x-0
                transition-all duration-500
                rounded-tr-sm rounded-br-sm
                pointer-events-none group-hover:pointer-events-auto
                bg-orange-500 text-white
                flex items-center
              ">
            <div className="flex gap-3">
              <img
                src={`${import.meta.env.VITE_URL}/${prev.image}`}
                alt={prev.title || ""}
                className="w-16 h-[68px] object-cover"
              />

              <div className="flex flex-col gap-1 justify-center">
                <div className="font-semibold text-[13px] line-clamp-2">
                  {prev.title}
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <MdDateRange />
                  <span> {prev.created_at
                    ? new Date(prev.created_at)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")
                    : "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {next && (
        <div className="fixed bottom-8 right-0 z-50 group">
          {/* ORANGE BUTTON */}
          <Link to={`/blogdetail`}
            state={{
              item: next,
            }} className="bg-orange-500 px-3 py-6 flex justify-center items-center cursor-pointer rounded-tl-sm rounded-bl-sm group-hover:rounded-none">
            <FaAnglesRight className="text-white text-xl" />
          </Link>

          {/* HOVER CONTENT */}
          <div
            className="
        absolute right-full bottom-0
        w-70 h-[68px]
        shadow-xl
        opacity-0 translate-x-[9px]
        group-hover:opacity-100 group-hover:translate-x-0
        transition-all duration-500
        rounded-tl-sm rounded-bl-sm
        pointer-events-none group-hover:pointer-events-auto
        bg-orange-500 text-white
        flex
      "
          >
            {/* CONTENT — PELA */}
            <div className="flex flex-col justify-center px-3 flex-1">
              <div className="font-semibold text-[13px] line-clamp-2">
                {next.title}
              </div>

              <div className="flex items-center gap-1 text-xs mt-1">
                <MdDateRange />
                <span>
                  {next.created_at
                    ? new Date(next.created_at)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")
                    : "-"}
                </span>
              </div>
            </div>

            {/* IMAGE — LAST, BUTTON NI BAJU MA */}
            <img
              src={`${import.meta.env.VITE_URL}/${next.image}`}
              alt={next.title || ""}
              className="w-[68px] h-full object-cover"
            />
          </div>
        </div>
      )}


    </>
  );
}
