import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb'

function WelcomePage() {
    return (
        <section className="">
            <div className="flex flex-col gap-5 py-5 px-5 md:px-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="hover:text-blue-900 font-semibold">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-semibold">Admin Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-blue-950">Welcome, Admin!</h1>
                    <p className="text-muted-foreground">Manage your rentals, expert hires, and mobility solutions.</p>
                </div>
                <img src="3D-Effects.png" alt="logo image" className='object-contain' />
            </div>
        </section>
    )
}

export default WelcomePage
