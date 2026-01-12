import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
const whyChooseCustomer = [
    {
        title: "Single-window Industrial service Solution",
        img1: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Single-window-Industrial-service-Solution1.png",
        img2: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Single-window-Industrial-service-Solution2.png",
        alt: "Single-window Industrial service Solution",
    },
    {
        title: "Verified Vendors",
        img1: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Verified-Vendors1.png",
        img2: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Verified-Vendors2.png",
        alt: "Verified Vendors",
    },
    {
        title: "Fast Matching",
        img1: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Fast-Matching1.png",
        img2: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Fast-Matching2.png",
        alt: "Fast Matching",
    },
    {
        title: "Pan-India Reach",
        img1: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Pan-India-Reach1.png",
        img2: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Pan-India-Reach2.png",
        alt: "Pan-India Reach",
    },
    {
        title: "24/7 Support",
        img1: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/24+7-Support1.png",
        img2: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/24+7-Support2.png",
        alt: "24/7 Support",
    },
    {
        title: "Secure Payments",
        img1: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Secure-Payments1.png",
        img2: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Secure-Payments2.png",
        alt: "Secure Payments",
    },
    {
        title: "Transparent Pricing",
        img1: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Transparent-Pricing1.png",
        img2: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Transparent-Pricing2.png",
        alt: "Transparent Pricing",
    },
    {
        title: "Performance Ratings",
        img1: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Performance-Ratings1.png",
        img2: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Performance-Ratings2.png",
        alt: "Performance Ratings",
    },
    {
        title: "Flexible Terms",
        img1: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Flexible-Terms1.png",
        img2: "/Rento_Website/1_Home_Page/Why Choose Rento Connect/For Customers/Flexible-Terms2.png",
        alt: "Flexible Terms",
    },
];
const whyChooseVendors = [
    {
        title: "Direct Access to Industrial Clients",
        img1: "Rento_Website/1_Home_Page/Why Choose Rento Connect/For Vendors/Direct-Access-to-Industrial-Clients1.png",
        img2: "Rento_Website/1_Home_Page/Why Choose Rento Connect/For Vendors/Direct-Access-to-Industrial-Clients2.png",
        alt: "Direct Access to Industrial Clients",
    },
    {
        title: "Grow Your Business",
        img1: "Rento_Website/1_Home_Page/Why Choose Rento Connect/For Vendors/Grow-Your-Business1.png",
        img2: "Rento_Website/1_Home_Page/Why Choose Rento Connect/For Vendors/Grow-Your-Business2.png",
        alt: "Grow Your Business",
    },
    {
        title: "Maximize Asset Utilization",
        img1: "Rento_Website/1_Home_Page/Why Choose Rento Connect/For Vendors/Maximize-Asset-Utilization1.png",
        img2: "Rento_Website/1_Home_Page/Why Choose Rento Connect/For Vendors/Maximize-Asset-Utilization2.png",
        alt: "Maximize Asset Utilization",
    },
    {
        title: "Transparent Payments for Vendors",
        img1: "Rento_Website/1_Home_Page/Why Choose Rento Connect/For Vendors/Transparent-Payments-for-Vendors1.png",
        img2: "Rento_Website/1_Home_Page/Why Choose Rento Connect/For Vendors/Transparent-Payments-for-Vendors2.png",
        alt: "Transparent Payments for Vendors",
    },
    {
        title: "Expand Your Reach",
        img1: "Rento_Website/1_Home_Page/Why Choose Rento Connect/For Vendors/Expand-Your-Reach1.png",
        img2: "Rento_Website/1_Home_Page/Why Choose Rento Connect/For Vendors/Expand-Your-Reach2.png",
        alt: "Expand Your Reach",
    },
    {
        title: "Simple Digital Experience",
        img1: "Rento_Website/1_Home_Page/Why Choose Rento Connect/For Vendors/Simple-Digital-Experience1.png",
        img2: "Rento_Website/1_Home_Page/Why Choose Rento Connect/For Vendors/Simple-Digital-Experience2.png",
        alt: "Simple Digital Experience",
    },
];

export default function WhyChooseSection() {
    const tabButton =
        "rounded-md px-4 py-2 text-sm font-medium border-2 border-orange-500 text-orange-600 bg-white hover:bg-blue-900 hover:text-white data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=active]:border-blue-900 data-[state=active]:hover:bg-orange-600";

    return (
        <section className="py-16 md:py-10 md:px-10 px-4 mb-10">
            <div className="">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-blue-950">
                        Why Choose Rento Connect?
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        We empower both businesses seeking services and vendors offering them.
                    </p>
                </div>

                <Tabs defaultValue="customer" className="w-full">
                    <TabsList className="h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full max-w-md mx-auto grid-cols-2 gap-3">
                        <TabsTrigger value="customer" className={tabButton}>For Customers</TabsTrigger>
                        <TabsTrigger value="vendor" className={tabButton}>For Vendors</TabsTrigger>
                    </TabsList>

                    <TabsContent value="customer" className="mt-2">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-6">
                            <div className="p-6">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {whyChooseCustomer.map((item, index) => (
                                        <li key={index} className="flex items-center space-x-3 group">
                                            <div className="relative w-12 h-12">
                                                {/* Normal image */}
                                                <img
                                                    src={item.img1}
                                                    alt={item.alt}
                                                    className="absolute inset-0 w-12 h-12 object-contain 
                                                        border-2 border-blue-900 rounded-full
                                                        transition-all duration-200 
                                                        group-hover:hidden group-hover:scale-90"
                                                />

                                                {/* Hover image */}
                                                <img
                                                    src={item.img2}
                                                    alt={item.alt}
                                                    className="absolute inset-0 w-12 h-12 object-contain 
                                                        border-2 border-orange-600 rounded-full
                                                       hidden scale-90
                                                        transition-all duration-200 
                                                        group-hover:block group-hover:scale-105"
                                                />
                                            </div>

                                            <p className="font-medium">{item.title}</p>
                                        </li>

                                    ))}
                                </ul>
                            </div>

                        </div>
                    </TabsContent>

                    <TabsContent value="vendor" className="mt-2">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-6">
                            <div className="p-6">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {whyChooseVendors.map((item, index) => (
                                        <li key={index} className="flex items-center space-x-3 group">
                                            <div className="relative w-12 h-12">
                                                {/* Normal image */}
                                                <img
                                                    src={item.img1}
                                                    alt={item.alt}
                                                    className="absolute inset-0 w-12 h-12 object-contain 
                                                        border-2 border-blue-900 rounded-full
                                                        transition-all duration-200 
                                                        group-hover:hidden group-hover:scale-90"
                                                />

                                                {/* Hover image */}
                                                <img
                                                    src={item.img2}
                                                    alt={item.alt}
                                                    className="absolute inset-0 w-12 h-12 object-contain 
                                                        border-2 border-orange-600 rounded-full
                                                       hidden scale-90
                                                        transition-all duration-200 
                                                        group-hover:block group-hover:scale-105"
                                                />
                                            </div>

                                            <p className="font-medium">{item.title}</p>
                                        </li>

                                    ))}
                                </ul>

                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section >
    )
}
