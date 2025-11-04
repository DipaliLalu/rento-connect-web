import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
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
        subject: z.string().min(3, {
            message: "Subject must be at least 3 characters.",
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
            subject: "",
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
        <div className="flex shadow-lg flex-col gap-3 bg-white p-5 rounded-2xl">
            <h2 className="text-2xl font-bold md:text-3xl mt-5 text-blue-950 text-shadow-team ">Send us a Message</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm text-slate-600 ps-2">Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        name="name"
                                        placeholder="Enter your name"
                                        className="bg-secondary"
                                    />

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
                                <FormLabel className="text-sm text-slate-600 ps-2">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='email'
                                        name="email"
                                        placeholder="Enter Email"
                                        className="bg-secondary"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm text-slate-600 ps-2">Subject</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        name="subject"
                                        placeholder="Subject"
                                        className="bg-secondary"
                                    />
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
                                <FormLabel className="text-sm text-slate-600 ps-2">Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        name="message"
                                        placeholder="Enter your message..."
                                        className="bg-secondary"
                                        rows={7}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="bg-blue-900 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-800 transition" disabled={isSubmitting ? true : false}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
                </form>
            </Form>
        </div>
    )
}

export default ContactusForm
