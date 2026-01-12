function SuccessStorySection() {
    return (
        <section className="flex flex-col gap-5 text-center py-20 bg-blue-900 text-primary-foreground">
            <h2 className="font-headline text-3xl md:text-4xl font-bold ">Our Success Stories</h2>
            <p className="max-w-2xl mx-auto  px-5">
                See how we've delivered critical solutions for our partners across various industries.
            </p>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6 px-4 md:px-10">

                <div
                    className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition duration-500 hover:-translate-y-2 cursor-pointer group hover:border-orange-600 border-2 "
                >
                    {/* Icon / Image */}
                    <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full mb-4 overflow-hidden group-hover:border-2 group-hover:border-orange-600">
                        <img
                            src="/Rento_Website/1_Home_Page/Our Success Stories/Auto-Plant-Maintenance1.png"
                            alt={'Auto-Plant-Maintenance'}
                            className="w-20 h-20 object-contain group-hover:hidden duration-500 border-2 border-blue-900 rounded-full"
                        />
                        <img
                            src="/Rento_Website/1_Home_Page/Our Success Stories/Auto-Plant-Maintenance2.png"
                            alt={'Auto-Plant-Maintenance'}
                                  className="w-20 h-20 object-contain hidden group-hover:block  rounded-full transform transition-transform ease-in-out scale-110 duration-500"
                        />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-muted-foreground">
                        Auto Plant Maintenance (Ahmedabad)
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--color-muted-foreground)] mt-2">
                        Deployed 4 expert technicians and 2 forklifts within 24 hours.
                    </p>
                </div>
                <div
                    className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition duration-500 hover:-translate-y-2 cursor-pointer group hover:border-orange-600 border-2 "
                >
                    {/* Icon / Image */}
                    <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full mb-4 overflow-hidden group-hover:border-2 group-hover:border-orange-600">
                          <img
                            src="/Rento_Website/1_Home_Page/Our Success Stories/Factory-Expansion-Project1.png"
                            alt={'Factory-Expansion-Project'}
                            className="w-20 h-20 object-contain group-hover:hidden duration-500 border-2 border-blue-900 rounded-full"
                        />
                        <img
                            src="/Rento_Website/1_Home_Page/Our Success Stories/Factory-Expansion-Project2.png"
                            alt={'Factory-Expansion-Project'}
                                className="w-20 h-20 object-contain hidden group-hover:block  rounded-full transform transition-transform ease-in-out scale-110 duration-500"
                        />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-muted-foreground">
                        Factory Expansion Project (Rajkot)
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--color-muted-foreground)] mt-2">
                        Provided crane and hydra services with certified operators for 3 weeks.
                    </p>
                </div>
                <div
                    className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition duration-500 hover:-translate-y-2 cursor-pointer group hover:border-orange-600 border-2 "
                >
                    {/* Icon / Image */}
                    <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full mb-4 overflow-hidden group-hover:border-2 group-hover:border-orange-600">
                          <img
                            src="/Rento_Website/1_Home_Page/Our Success Stories/Emergency-Shutdown1.png"
                            alt={'Emergency-Shutdown'}
                            className="w-20 h-20 object-contain group-hover:hidden duration-500 border-2 border-blue-900 rounded-full"
                        />
                        <img
                            src="/Rento_Website/1_Home_Page/Our Success Stories/Emergency-Shutdown2.png"
                            alt={'Emergency-Shutdown'}
                            className="w-20 h-20 object-contain hidden group-hover:block  rounded-full transform transition-transform ease-in-out scale-110 duration-500"
                        />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-muted-foreground">
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
