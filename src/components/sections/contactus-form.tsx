import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendMail } from '../../actions/contact';

function ContactusForm() {
    const FormSchema = z.object({
        name: z.string().min(3, {
            message: "Username must be at least 3 characters.",
        }),
        email: z
            .email()
            .min(3, {
                message: "Email must be at least 3 characters.",
            }),
        phoneno: z.string().min(10, {
            message: "phoneno must be at least 10 characters.",
        }),
        message: z.string().min(5, {
            message: "Message must be at least 5 characters.",
        })

    });

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneno: "",
            message: "",
        },
    });

    const {
        reset,
        formState: { isSubmitting },
    } = form;

    const onSubmit = async (data: any) => {
        try {
            console.log('data:', data)
            await sendMail(data);
            reset();
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div className="flex shadow-lg flex-col gap-3 p-5 rounded-2xl bg-blue-900">
            <h2 className="text-2xl font-bold md:text-[31px] mt-5 text-shadow-team text-center text-white">Let's Discuss Your Requirements!</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel className="text-sm text-slate-600 ps-2">Name</FormLabel> */}
                                <FormControl>
                                    <div className="relative group">
                                        <Input
                                            {...field}
                                            name="name"
                                            placeholder="Enter your name"
                                            className="bg-secondary p-5"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7">
                                            <img
                                                src="/Rento_Website/Social Media/User1.png"
                                                alt="User icon default"
                                                className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-200 group-hover:opacity-0"
                                            />
                                            <img
                                                src="/Rento_Website/Social Media/User2.png"
                                                alt="User icon hover"
                                                className="w-full h-full object-contain absolute top-0 left-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                            />
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phoneno"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel className="text-sm text-slate-600 ps-2">Phone</FormLabel> */}
                                <FormControl>
                                    <div className="relative group">
                                        <Input
                                            {...field}
                                            type='tel'
                                            name="phone"
                                            placeholder="Enter Phone Number"
                                            className="bg-secondary p-5"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7">
                                            <img
                                                src="/Rento_Website/Social Media/Call1.png"
                                                alt="Call icon default"
                                                className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-200 group-hover:opacity-0"
                                            />
                                            <img
                                                src="/Rento_Website/Social Media/Call2.png"
                                                alt="Call icon hover"
                                                className="w-full h-full object-contain absolute top-0 left-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                            />
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel className="text-sm text-slate-600 ps-2">Email</FormLabel> */}
                                <FormControl>
                                    <div className="relative group">
                                        <Input
                                            {...field}
                                            type='email'
                                            name="email"
                                            placeholder="Enter Email"
                                            className="bg-secondary p-5"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7">
                                            <img
                                                src="/Rento_Website/Social Media/Mail1.png"
                                                alt="Mail icon default"
                                                className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-200 group-hover:opacity-0"
                                            />
                                            <img
                                                src="/Rento_Website/Social Media/Mail2.png"
                                                alt="Mail icon hover"
                                                className="w-full h-full object-contain absolute top-0 left-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                            />
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel className="text-sm text-slate-600 ps-2">Message</FormLabel> */}
                                <FormControl>
                                    <div className="relative group">
                                        <Textarea
                                            {...field}
                                            name="message"
                                            placeholder="Enter your message..."
                                            className="bg-secondary"
                                            rows={7}
                                        />
                                        {/* Fixed icon position regardless of textarea height */}
                                        <div className="pointer-events-none absolute right-3 top-3 w-7 h-7 group-hover:opacity-100">
                                            <div className="relative w-full h-full">
                                                <img
                                                    src="/Rento_Website/Social Media/Edit1.png"
                                                    alt="User icon default"
                                                    className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-200 group-hover:opacity-0"
                                                />
                                                <img
                                                    src="/Rento_Website/Social Media/Edit2.png"
                                                    alt="User icon hover"
                                                    className="w-full h-full object-contain absolute top-0 left-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="px-6 py-3 w-fit mx-auto" variant={"custom"} disabled={isSubmitting ? true : false}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
                </form>
            </Form>
        </div>
    )
}

export default ContactusForm
