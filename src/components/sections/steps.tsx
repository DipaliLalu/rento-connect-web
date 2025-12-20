import { LuCalendarCheck, LuHandshake, LuUserPlus } from "react-icons/lu";

function StepsSection() {
    return (
        <section className="flex flex-col gap-5 text-center mt-20 mb-6  px-10 py-20 bg-blue-900 text-primary-foreground">
            <h2 className="text-4xl font-bold tracking-tight ">Get Started in 3 Simple Steps</h2>
            <p className="">
                Our streamlined process makes finding industrial services faster than ever.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">

                {/* Dashed Connecting Line */}
                <div className="hidden md:flex absolute top-18 left-0 w-full items-center -translate-y-1/2 pointer-events-none z-0">
                    <div className="w-full border-t-2 border-dashed border-slate-200"></div>
                </div>

                {/* Step 1 */}
                <div className="relative flex flex-col items-center p-4">
                    <div className="flex items-center justify-center bg-background rounded-full p-4 mb-4 border-4 border-secondary z-10">
                        <div className="flex items-center justify-center h-16 w-16 bg-orange-100 rounded-full">
                            <LuUserPlus size={40} className="text-primary" />
                        </div>
                    </div>
                    <h3 className="font-headline text-xl font-semibold mb-2 ">Register &amp; Browse</h3>
                    <p className="">
                        Create your account as a customer or vendor and explore a vast marketplace of services.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="relative flex flex-col items-center p-4">
                    <div className="flex items-center justify-center bg-background rounded-full p-4 mb-4 border-4 border-secondary z-10">
                        <div className="flex items-center justify-center h-16 w-16 bg-orange-100 rounded-full">
                            <LuCalendarCheck size={40} className="text-primary" />
                        </div>
                    </div>
                    <h3 className="font-headline text-xl font-semibold mb-2 ">Book a Service</h3>
                    <p className="">
                        Select the equipment, expert, or mobility solution you need and submit your booking inquiry.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="relative flex flex-col items-center p-4">
                    <div className="flex items-center justify-center bg-background rounded-full p-4 mb-4 border-4 border-secondary z-10">
                        <div className="flex items-center justify-center h-16 w-16 bg-orange-100 rounded-full">
                            <LuHandshake size={40} className="text-primary" />
                        </div>
                    </div>

                    <h3 className="font-headline text-xl font-semibold mb-2 ">Connect &amp; Operate</h3>
                    <p className="">
                        Get matched with a verified provider, finalize the terms, and kickstart your operations seamlessly.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default StepsSection;
