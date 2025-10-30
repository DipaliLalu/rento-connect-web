import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { loginVendor } from '../actions/vendor';


const formSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Min 6 characters"),

});
function VendorLogin() {
const navigate=useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const {
        reset,
        formState: { isSubmitting },
    } = form;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const formData = new FormData();

            // Append all fields
            for (const key in data) {
                if (data[key as keyof typeof data] !== undefined && data[key as keyof typeof data] !== null) {
                    formData.append(key, data[key as keyof typeof data]);
                }
            }
            await loginVendor(formData,navigate);
            reset();
        } catch (err) {
            console.error("Failed to login:", err);
        }
    };

    return (
        <section className="flex flex-col gap-8 py-5 px-5 md:px-10">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="hover:text-blue-900 font-semibold">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold">Login</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <main className="md:w-[500px] 2xl:w-[950px] bg-white p-2 md:p-7 rounded-lg mx-auto flex flex-col gap-3 text-center">
                <Link to={"/"} className="flex items-center justify-center gap-2">
                    <img
                        src="/3D-Effects.png"
                        alt="logo"
                        className="object-contain"
                        width={70}
                        height={70}
                    />
                </Link>
                <h1 className="text-2xl text-blue-950 font-bold">Login</h1>
                <p className="text-muted-foreground">Enter your details to login to your account</p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 px-1 sm:px-6 md:px-8"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-gray-100 dark:bg-gray-800"
                                            placeholder="m@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="bg-gray-100 dark:bg-gray-800"
                                            placeholder="Enter password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col items-center justify-between gap-2">
                            <Button type="submit" className="w-full bg-blue-900" disabled={isSubmitting ? true : false}>
                                {isSubmitting ? "Submitting..." : "Login"}
                            </Button>
                            <p className="text-center text-sm sm:text-left">
                                Don't have an account?{" "}
                            </p>
                            <div className="flex items-center justify-between gap-2">
                                <Link to={'/customer-register'} className='text-blue-800 underline'>Sign up as a Customer</Link> <span className='text-muted-foreground'>or</span> <Link to={'/vendor-register'} className='text-blue-800 underline'>
                                    Sign up as a Vendor</Link>
                            </div>
                            <p className='flex flex-col gap-1 justify-center items-center text-muted-foreground text-[13px]'><span>Hint:</span>
                                You can create a new account through the sign up page.
                                To create an admin, manually set the 'role' field to 'admin' and 'status' to 'approved' for a user in your Firestore 'users' collection.</p>
                        </div>
                    </form>
                </Form>
            </main>
        </section>
    )
}

export default VendorLogin
