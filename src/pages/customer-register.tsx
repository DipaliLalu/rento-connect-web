
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb'
import CustomerRegistrationForm from '../components/sections/customer-register-form'
import { Helmet } from 'react-helmet-async'

function CustomerRegister() {
    const canonical = `${import.meta.env.VITE_URL}${location.pathname}`;
    return (
        <>
         <Helmet>
                <title>Customer Register | Rento Connect</title>
                <meta name="description" content="Rento Connect Equipment Experts Mobility"></meta>
                <meta name="keywords" content="Rento Connect"></meta>
                <meta name="author" content="Rento Connect"></meta>
                <link rel="canonical" href={canonical} />

                <meta property="og:title" content="Customer Register | Rento Connect Equipment Experts Mobility" />
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
        <section className="flex flex-col gap-8 py-5 px-5 md:px-10">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="hover:text-blue-900 font-semibold">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold">Customer Registration</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <main className="relative md:w-[700px] 2xl:w-[950px] bg-white p-2 md:p-7 rounded-lg mx-auto flex flex-col gap-3 text-center">
                <Link to={"/"} className="flex items-center justify-center gap-2">
                    <img
                        src="/3D-Effects.png"
                        alt="logo"
                        className="object-contain"
                        width={70}
                        height={70}
                    />
                </Link>
                <h1 className="text-2xl text-blue-950 font-bold">Customer Registration Form</h1>
                <p className="text-muted-foreground">Please fill out the form below to register as a customer.</p>
                <CustomerRegistrationForm />
            </main>

        </section>
        </>
    )
}

export default CustomerRegister
