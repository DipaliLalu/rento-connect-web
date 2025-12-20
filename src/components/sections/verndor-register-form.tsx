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
import { registerVendor } from "../../actions/vendor";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { IoIosCloseCircleOutline } from "react-icons/io";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    contact: z.string().min(1, "Contact number is required").regex(/^[0-9]{10}$/, "Contact number must be exactly 10 digits"),
    alternativecontact: z.string().regex(/^[0-9]{10}$/, "Contact number must be exactly 10 digits").optional(),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(6, "Min 6 characters"),
    category: z.string().min(1, "Service is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().min(1, "Pincode is required"),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Business address is required"),
    gstin: z.string().min(1, "GSTIN is required"),
    experience: z.string().min(1, "Experience is required"),
    location: z.string().min(1, "Location is required"),
    availability: z.enum(["full-time", "part-time", "on-call"]),
    id_proof: z
        .any()
        .refine(
            (file) =>
                (file instanceof FileList && file.length > 0) ||
                (file instanceof File),
            { message: "Id Proof is required" }
        ),

});

export default function VendorRegistrationForm() {
    const { category } = useGetCategory();
    const [message, setMessage] = useState<object | null>(null);
    // const [slug,] = useState<string | null>(category?.[0]?.slug || null);
    // const { subcategory } = useGetSubCategoryWithSlug(slug);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            contact: "",
            alternativecontact: "",
            email: "",
            password: "",
            category: category?.[0]?.slug,
            address: "",
            pincode: "",
            state: "",
            city: "",
            gstin: "",
            experience: "",
            location: "",
            availability: "full-time",
            id_proof: undefined,
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
            await registerVendor(formData);
            reset();
            setMessage(null);
        } catch (err: any) {
            console.error("Failed to submit vendor:", err);
            setMessage(err?.message);
        }
    };


    return (
        <Form {...form}>
            {message ? (
                <Alert variant="destructive" className='shadow-md'>
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={() => {
                            setMessage(null)
                            reset();
                        }}
                        className="absolute md:-top-36 -top-44 min-[375px]:-top-40 rounded-full right-1 text-xl"
                        aria-label="Close"
                    >
                        <IoIosCloseCircleOutline className='cursor-pointer text-slate-800' size={28} />
                    </button>
                    {Object.entries(message).map(([key, value]) => (
                        <AlertDescription key={key} className="capitalize font-semibold text-lg">
                            {value}
                        </AlertDescription>
                    ))}
                </Alert>
            ) : (
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
                                        <SelectTrigger>
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
                            /><FormField
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
                        <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">Years of Experience</FormLabel>
                                    <FormControl>
                                        <Input className="bg-gray-100 dark:bg-gray-800" {...field} />
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
                                    <Input className="bg-gray-100 dark:bg-gray-800" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Availability */}
                    <FormField
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground">Availability</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        className="flex flex-wrap gap-4"
                                    >
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <RadioGroupItem value="full-time" />
                                            </FormControl>
                                            <FormLabel className="font-normal">Full-time</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <RadioGroupItem value="part-time" />
                                            </FormControl>
                                            <FormLabel className="font-normal">Part-time</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <RadioGroupItem value="on-call" />
                                            </FormControl>
                                            <FormLabel className="font-normal">On-call</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* File Upload */}
                    <FormField
                        control={form.control}
                        name="id_proof"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground">Upload Documents</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        className="bg-gray-100 dark:bg-gray-800"
                                        onChange={(e) => field.onChange(e.target.files?.[0])}
                                    />
                                </FormControl>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Upload License, Certificates, ID Proof etc.
                                </p>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col items-center justify-between gap-2">
                        <Button type="submit" className="w-full sm:w-auto bg-blue-900" disabled={isSubmitting ? true : false}>
                            {isSubmitting ? "Submitting..." : "Register as Vendor"}
                        </Button>
                        <p className="text-center text-sm sm:text-left">
                            Already have an account?{" "}
                            <Link to="/login" className="underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            )}
        </Form>

    );
}
