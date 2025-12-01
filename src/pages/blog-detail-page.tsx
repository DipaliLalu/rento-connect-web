import { Link, useLocation } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { MdDateRange } from "react-icons/md";
import DOMPurify from "dompurify";
import { GoArrowLeft } from "react-icons/go";
import { Helmet } from "react-helmet-async";

export default function BlogDetailPage() {
  const location = useLocation();
  const blog = location.state;

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Blog not found
      </div>
    );
  }

  const cleanHTML = DOMPurify.sanitize(blog.description || "");
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
      <div className="bg-gray-50 text-gray-900py-10 md:py-14 px-5 md:px-10">
        {/* Header Section */}
        <div className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          <span className="mx-1">›</span>
          <Link to="/blog" className="hover:underline">
            Blog
          </Link>{" "}
          <span className="mx-1">›</span>
          <span className="font-medium text-gray-800">{blog.title}</span>
        </div>
        <section className="max-w-5xl mx-auto px-5">

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-blue-950 mb-5">
            {blog.title}
          </h1>
          {/* Author + Date */}
          <div className="flex items-center gap-5 text-gray-600 mb-10">
            <div className="flex items-center gap-2">
              <FiUser className="text-[var(--brand-color)]" />
              <span className="font-medium">Rento Connect</span>
            </div>
            <div className="flex items-center gap-2">
              <MdDateRange className="text-[var(--brand-color)]" />
              <span>{blog.created_at}</span>
            </div>
          </div>

          {/* Blog Image */}
          <div className="rounded-xl overflow-hidden shadow-md mb-10">
            <img
              src={`${import.meta.env.VITE_URL}/${blog.image}`}
              alt={blog.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Blog Content */}
          <article
            className="prose prose-lg prose-blue max-w-none leading-relaxed text-gray-800"
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
          ></article>

          {/* Back Link */}
          <div>
            <Link
              to="/blog"
              className="inline-flex gap-3 text-blue-900 items-center hover:underline font-medium"
            >
              <GoArrowLeft />
              Back to all posts
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
