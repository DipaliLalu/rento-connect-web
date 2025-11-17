import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LuTrendingUp, LuPackageCheck, LuBanknote, LuMap, LuLaptop, LuBriefcase } from "react-icons/lu";
import { LuLayoutGrid, LuShieldCheck, LuClock, LuGlobe, LuHeadset, LuLock, LuFileText, LuStar, LuFileClock } from "react-icons/lu";

export default function WhyChooseSection() {
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

                <Tabs defaultValue="vendor" className="w-full">
                    <TabsList className="h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full max-w-md mx-auto grid-cols-2">
                        <TabsTrigger value="customer">For Customers</TabsTrigger>
                        <TabsTrigger value="vendor">For Vendors</TabsTrigger>
                    </TabsList>

                    <TabsContent value="customer" className="mt-2">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-6">
                            <div className="p-6">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                                    <li className="flex items-start space-x-3">
                                        <LuLayoutGrid size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">Single-window Industrial service Solution</p>
                                    </li>

                                    <li className="flex items-start space-x-3">
                                        <LuShieldCheck size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">Verified Vendors</p>
                                    </li>

                                    <li className="flex items-start space-x-3">
                                        <LuClock size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">Fast Matching</p>
                                    </li>

                                    <li className="flex items-start space-x-3">
                                        <LuGlobe size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">Pan-India Reach</p>
                                    </li>

                                    <li className="flex items-start space-x-3">
                                        <LuHeadset size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">24/7 Support</p>
                                    </li>

                                    {/* <li className="flex items-start space-x-3">
                                        <LuBarChart2 size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">Centralized Management</p>
                                    </li> */}

                                    <li className="flex items-start space-x-3">
                                        <LuLock size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">Secure Payments</p>
                                    </li>

                                    <li className="flex items-start space-x-3">
                                        <LuFileText size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">Transparent Pricing</p>
                                    </li>

                                    <li className="flex items-start space-x-3">
                                        <LuStar size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">Performance Ratings</p>
                                    </li>

                                    <li className="flex items-start space-x-3">
                                        <LuFileClock size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">Flexible Terms</p>
                                    </li>

                                </ul>
                            </div>

                        </div>
                    </TabsContent>

                    <TabsContent value="vendor" className="mt-2">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-6">
                            <div className="p-6">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                                    {/* 1 */}
                                    <li className="flex items-start space-x-3">
                                        <LuBriefcase size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">Direct Access to Industrial Clients</p>
                                    </li>

                                    {/* 2 */}
                                    <li className="flex items-start space-x-3">
                                        <LuTrendingUp size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">Grow Your Business</p>
                                    </li>

                                    {/* 3 */}
                                    <li className="flex items-start space-x-3">
                                        <LuPackageCheck size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">Maximize Asset Utilization</p>
                                    </li>

                                    {/* 4 */}
                                    <li className="flex items-start space-x-3">
                                        <LuBanknote size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">Transparent Payments for Vendors</p>
                                    </li>

                                    {/* 5 */}
                                    <li className="flex items-start space-x-3">
                                        <LuMap size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">Expand Your Reach</p>
                                    </li>

                                    {/* 6 */}
                                    <li className="flex items-start space-x-3">
                                        <LuLaptop size={24} className="text-[var(--primary)]" />
                                        <p className="font-medium">Simple Digital Experience</p>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section >
    )
}
