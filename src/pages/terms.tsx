
function TermsPage() {
    return (
        <>
            <section className="relative bg-blue-900 text-primary-foreground py-20 md:py-32">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{
                        backgroundImage: "url('https://placehold.co/1920x1080.png')",
                    }}
                    data-ai-hint="industrial machinery"
                ></div>

                <div className="relative flex flex-col gap-5 justify-center items-center text-center">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
                        Terms of Service
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
                        Please read our terms and conditions carefully.
                    </p>
                </div>
            </section>
            <section className="flex flex-col px-4 py-10 sm:px-8 max-w-5xl md:mx-auto bg-white rounded-2xl shadow-sm gap-5 my-14 mx-2">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                    Terms of Service
                </h2>

                <div className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    This is a placeholder for your Terms of Service. You should replace this with your actual terms.

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </section>
        </>
    )
}

export default TermsPage
