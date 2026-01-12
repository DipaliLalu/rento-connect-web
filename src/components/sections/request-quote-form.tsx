import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useGetCustomer } from "../../actions/customer";
import { getVendorInfo } from "../../utils/vendor-utils";
import { registerBooking } from "../../actions/booking";
import { Alert, AlertDescription } from "../ui/alert";
import { IoIosCloseCircleOutline } from "react-icons/io";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    contact: z.string().min(1, "Contact number is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    subcategory: z.string().min(1, "Subcategory is required"),
    category: z.string().min(1, "Category is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    location: z.string().min(1, "Location is required"),
    customer_id: z.string().min(1, "Customer ID is required"),
    gstin: z.string().min(1, "GSTIN is required"),
    description: z.string().min(3, "Minimum 3 characters required"),
});
type AlertType = "success" | "error";

export default function RequestQuoteForm({
    subcategory,
}: {
    subcategory: string;
}) {
    const user = getVendorInfo();
    const { customer } = useGetCustomer(Number(user?.id));
    const [alert, setAlert] = useState<{
        message: string;
        type: AlertType;
    } | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            contact: "",
            email: "",
            subcategory: subcategory || "",
            category: "",
            location: "",
            description: "",
            customer_id: "",
            gstin: "",
        },
    });

    const { reset, formState } = form;

    // ✅ Auto-fill form when customer data is fetched
    useEffect(() => {
        if (customer) {
            reset({
                name: customer.name || "",
                contact: customer.contact || "",
                email: customer.email || "",
                subcategory: subcategory || "",
                location: customer.location || "",
                description: "",
                customer_id: customer.id || "",
                gstin: customer.gstin || "",
                category: customer.category || "",
            });
        }
    }, [customer, reset, subcategory]);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });

            const res = await registerBooking(formData);
            setAlert({
                message: res.message,
                type: "success",
            });
            reset();
        } catch (err: any) {
            console.error("Failed to submit customer:", err);
            setAlert({
                message: err?.message || "Login failed",
                type: "error",
            });
        }
    };

    return (
        <Form {...form}>
            {alert?.message ? (
                <Alert variant={alert.type === "error" ? "destructive" : "default"} className="shadow-md">
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={() => {
                            setAlert(null)
                            reset();
                        }}
                        className="absolute md:-top-28 -top-24 rounded-full right-1 text-xl"
                        aria-label="Close"
                    >
                        <IoIosCloseCircleOutline className='cursor-pointer text-slate-800' size={28} />
                    </button>

                    <AlertDescription className={`capitalize font-semibold text-lg ${alert.type === "error" ? "text-red-700" : "text-green-700"}`}>
                        {alert?.message}
                    </AlertDescription>
                </Alert>
            ) : (
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 px-1 sm:px-6 md:px-8"
                >
                    {/* Category */}
                    <FormField
                        control={form.control}
                        name="subcategory"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-muted-foreground">
                                    Service / Equipment
                                </FormLabel>
                                <FormControl className="w-full">
                                    <Input
                                        className="bg-gray-100 dark:bg-gray-800"
                                        {...field}
                                        readOnly
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground">
                                    Full Name / Company Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-gray-100 dark:bg-gray-800"
                                        placeholder="Enter your full name or company name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Contact + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="contact"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">
                                        Contact Number
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-gray-100 dark:bg-gray-800"
                                            placeholder="Enter your contact number"
                                            {...field}
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
                    </div>

                    {/* Location */}
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground">
                                    Service Location Coverage (States / Cities)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-gray-100 dark:bg-gray-800"
                                        placeholder="Enter city or location"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">
                                        Start Date
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            className="bg-gray-100 dark:bg-gray-800"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">End Date</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-gray-100 dark:bg-gray-800"
                                            type="date"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground">
                                    Brief us about your requirements
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="bg-gray-100 dark:bg-gray-800"
                                        placeholder="Enter brief description for your requirement"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col items-center justify-between gap-2">
                        <Button
                            type="submit"
                            className="w-full sm:w-auto bg-blue-900"
                            disabled={formState.isSubmitting}
                        >
                            {formState.isSubmitting ? "Submitting..." : "Submit Request"}
                        </Button>
                    </div>
                </form>)}
        </Form>
    );
}
