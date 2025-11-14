import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useGetCategory } from "../../actions/category";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Link } from "react-router-dom";
import { registerCustomer } from "../../actions/customer";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    contact: z
        .string()
        .min(1, "Contact number is required")
        .regex(/^[0-9]{10}$/, "Contact number must be exactly 10 digits"),
    alternativecontact: z.string().optional(),
    email: z.string().email("Invalid email"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(10, "Password must not exceed 10 characters")
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/, "Password must include letters and numbers"),
    category: z.string().min(1, "Catgory is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().min(1, "Pincode is required"),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Business address is required"),
    gstin: z.string().min(1, "GSTIN is required"),
    location: z.string().min(1, "Location is required"),
    service_frequency: z.enum(["one-time", "recurring", "project-based"]),
});

export default function CustomerRegistrationForm() {
    const { category } = useGetCategory();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            contact: "",
            alternativecontact: "",
            email: "",
            password: "",
            category: category?.[0]?.slug || "",
            address: "",
            pincode: "",
            state: "",
            city: "",
            gstin: "",
            location: "",
            service_frequency: "one-time",
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
                const value = data[key as keyof typeof data];
                if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            }

            await registerCustomer(formData);
            reset();
        } catch (err) {
            console.error("Failed to submit customer:", err);
        }
    };


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 px-1 sm:px-6 md:px-8"
            >
                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-muted-foreground">Full Name / Company Name</FormLabel>
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
                                <FormLabel className="text-muted-foreground">Contact Number</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-gray-100 dark:bg-gray-800"
                                        placeholder="Enter your contact number"
                                        {...field}
                                        max={10}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="alternativecontact"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground">Alternative Contact</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-gray-100 dark:bg-gray-800"
                                        placeholder="Optional"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border p-3 rounded-lg">
                    {/* Address */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground">Company Address</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="bg-gray-100 dark:bg-gray-800 h-48"
                                        placeholder="Enter full company address"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">City</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-gray-100 dark:bg-gray-800"
                                            placeholder="Enter your city"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">State</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-gray-100 dark:bg-gray-800"
                                            placeholder="Enter your state"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pincode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">Pincode</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-gray-100 dark:bg-gray-800"
                                            placeholder="Enter your pincode"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* GST + Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category */}
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-muted-foreground">Type of Service</FormLabel>
                                <FormControl className="w-full">
                                    <Select
                                        onValueChange={(value) => field.onChange(value)}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="border">
                                            <SelectValue placeholder="Choose a service" />
                                        </SelectTrigger>
                                        <SelectContent className="w-full">
                                            <SelectGroup>
                                                <SelectLabel>Type of Services</SelectLabel>
                                                {category?.map((data) => (
                                                    <SelectItem key={data.slug} value={data.slug || ""}>
                                                        {data.category_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                    <Input className="bg-gray-100 dark:bg-gray-800" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                {/* Availability */}
                <FormField
                    control={form.control}
                    name="service_frequency"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-muted-foreground">Service Frequency</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="flex flex-wrap gap-4"
                                >
                                    <FormItem className="flex items-center">
                                        <FormControl>
                                            <RadioGroupItem value="one-time" />
                                        </FormControl>
                                        <FormLabel className="font-normal">One-time</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center">
                                        <FormControl>
                                            <RadioGroupItem value="recurring" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Recurring</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center">
                                        <FormControl>
                                            <RadioGroupItem value="project-based" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Project-based</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="gstin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-muted-foreground">GSTIN / PAN</FormLabel>
                            <FormControl>
                                <Input className="bg-gray-100 dark:bg-gray-800" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col items-center justify-between gap-2">
                    <Button type="submit" className="w-full sm:w-auto bg-blue-900" disabled={isSubmitting ? true : false}>
                        {isSubmitting ? "Submitting..." : "Register as Customer"}
                    </Button>
                    <p className="text-center text-sm sm:text-left">
                        Already have an account?{" "}
                        <Link to="/login" className="underline">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </Form>

    );
}
