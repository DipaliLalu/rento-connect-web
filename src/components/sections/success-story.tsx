import { LuHardHat, LuWrench, LuZap } from "react-icons/lu"

function SuccessStorySection() {
    return (
        <section className="flex flex-col gap-5 text-center py-20 bg-[var(--color-muted-foreground)]/10">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-blue-950">Our Success Stories</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground px-5">
               See how we've delivered critical solutions for our partners across various industries.
            </p>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6 px-4 md:px-10">
             
                    <div
                        className="bg-white rounded-xl shadow-md border p-6 flex flex-col items-center text-center hover:shadow-xl transition hover:-translate-y-2 cursor-pointer"
                    >
                        {/* Icon / Image */}
                        <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full mb-4">
                           <LuWrench size={40} className="text-[var(--primary)]" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-blue-950">
                            Auto Plant Maintenance (Ahmedabad)
                        </h3>

                        {/* Description */}
                        <p className="text-[var(--color-muted-foreground)] mt-2">
                           Deployed 4 expert technicians and 2 forklifts within 24 hours.
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-xl shadow-md border p-6 flex flex-col items-center text-center hover:shadow-xl transition hover:-translate-y-2 cursor-pointer"
                    >
                        {/* Icon / Image */}
                        <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full mb-4">
                          <LuHardHat size={40} className="text-[var(--primary)]" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-blue-950">
                           Factory Expansion Project (Rajkot)
                        </h3>

                        {/* Description */}
                        <p className="text-[var(--color-muted-foreground)] mt-2">
                           Provided crane and hydra services with certified operators for 3 weeks.
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-xl shadow-md border p-6 flex flex-col items-center text-center hover:shadow-xl transition hover:-translate-y-2 cursor-pointer"
                    >
                        {/* Icon / Image */}
                        <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full mb-4">
                          <LuZap size={40} className="text-[var(--primary)]" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-blue-950">
                            Emergency Shutdown (Dahej)
                        </h3>

                        {/* Description */}
                        <p className="text-[var(--color-muted-foreground)] mt-2">
                           Expert boiler mechanic and utility specialist hired on urgent basis.
                        </p>
                    </div>
                
            </div>
        </section>
    )
}

export default SuccessStorySection
