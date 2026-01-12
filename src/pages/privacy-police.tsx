import { Helmet } from "react-helmet-async";

function PrivacyPolice() {
    const canonical = `${import.meta.env.VITE_URL}${location.pathname}`;
    return (
        <>
         <Helmet>
                <title>Privacy Police | Rento Connect</title>
                <meta name="description" content="Rento Connect Equipment Experts Mobility"></meta>
                <meta name="keywords" content="Rento Connect"></meta>
                <meta name="author" content="Rento Connect"></meta>
                <link rel="canonical" href={canonical} />

                <meta property="og:title" content="Privacy Police | Rento Connect Equipment Experts Mobility" />
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
            <section className="relative bg-blue-900 text-primary-foreground py-20 md:h-92">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{
                        backgroundImage: "url('/1250_368/Privacy-Policy.png')",
                    }}
                    data-ai-hint="industrial machinery"
                ></div>

                <div className="relative flex flex-col gap-5 justify-center items-center text-center top-1/2 left-1/2 -translate-1/2">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
                    Privacy Policy
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg md:text-xl font-bold">
                       Your privacy is important to us.
                    </p>
                </div>
            </section>

            <section className="flex flex-col px-4 py-10 sm:px-8 max-w-5xl md:mx-auto bg-white rounded-2xl shadow-sm gap-5 my-5 mx-2">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                    Privacy Policy
                </h2>

                <div className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    This is a placeholder for your Privacy Policy. You should replace this with your actual policy.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </section>
        </>
    );
}

export default PrivacyPolice;
