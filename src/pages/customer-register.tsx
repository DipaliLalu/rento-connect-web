
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb'
import CustomerRegistrationForm from '../components/sections/customer-register-form'

function CustomerRegister() {
    return (
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
                <h1 className="text-2xl text-blue-950 font-bold">Customer Registration Form</h1>
                <p className="text-muted-foreground">Please fill out the form below to register as a customer.</p>
                <CustomerRegistrationForm />
            </main>

        </section>
    )
}

export default CustomerRegister
