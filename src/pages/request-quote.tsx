import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import RequestQuoteForm from "../components/sections/request-quote-form";

function RequestQuote() {
    const location = useLocation();
    const subcategoryname=location.state.data;
  return (
       <section className="flex flex-col gap-8 py-5 px-5 md:px-10">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="hover:text-blue-900 font-semibold">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold">Request for Quote</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <main className="md:w-[700px] 2xl:w-[950px] bg-white p-2 md:p-7 rounded-lg mx-auto flex flex-col gap-3 text-center">
                <Link to={"/"} className="flex items-center justify-center gap-2">
                    <img
                        src="/3D-Effects.png"
                        alt="logo"
                        className="object-contain"
                        width={70}
                        height={70}
                    />
                </Link>
                <h1 className="text-2xl text-blue-950 font-bold">Request for Quote</h1>
                <p className="text-muted-foreground">Please confirm your details and submit the request. Our team will get back to you shortly.</p>
                <RequestQuoteForm subcategory={subcategoryname}/>
            </main>

        </section>
  )
}

export default RequestQuote
