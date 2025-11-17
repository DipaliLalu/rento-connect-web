"use client";

import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { addProduct, updateProduct, useGetProduct } from "../../actions/product";
import type { Product } from "../../types/products";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import { getVendorInfo } from "../../utils/vendor-utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useGetSubCategoryWithSlug } from "../../actions/subcategory";


// Schema
const schema = z.object({
  product_id: z.string().optional(),
  category: z.string().optional(),
  sub_category: z.string().optional(),
  vendor_id: z.string().optional(),
  product_name: z.string().min(3, "Minimum 3 characters required"),
  price_day: z.coerce.number().min(1, "Price per day must be at least 1"),
  price_hour: z.coerce.number().min(1, "Price per hour must be at least 1"),
  description: z.string().min(3, "Minimum 3 characters required"),
  location: z.string().min(1, "Location is required"),
  product_image: z
    .any()
    .refine((file) => !file || file[0]?.type === "image/webp", {
      message: "Only WebP files allowed",
    })
    .refine((file) => !file || file[0]?.size <= 1024 * 1024, {
      message: "Image must be ≤ 1MB",
    })
    .optional(),
  metadata: z.string().min(2, "Enter metadata"),
  metatag: z.string().min(2, "Enter metatag"),
  active: z.string().default("1"),
});

type FormData = z.infer<typeof schema>;

function Product() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useGetProduct();
  const user = getVendorInfo();
  const { subcategory } = useGetSubCategoryWithSlug(user?.data?.category || 'equipment');
  const product: Product | undefined = location.state?.product;
  
  const defaultValues: FormData = {
    product_id: product?.product_id ?? undefined,
    vendor_id: product?.vendor_id ?? undefined,
    category: product?.category || user?.data?.category,
    sub_category: product?.sub_category || "",
    product_name: product?.product_name || "",
    price_day: Number(product?.price_day ?? 1),
    price_hour: Number(product?.price_hour ?? 1),
    description: product?.description || "",
    product_image: undefined,
    location: product?.location || user?.data?.location || '',
    active: product?.active ?? "1",
    metadata: product?.metadata || "",
    metatag: product?.metatag || "",
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting ,errors},
  } = form;
console.log(errors)
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    if (data.product_id)
      formData.append("product_id", data.product_id.toString());

    formData.append("vendor_id", user?.id ?? "");
    formData.append("location", user?.data?.location ?? "");
    formData.append("category", data.category ?? "");
    formData.append("sub_category", data.sub_category ?? "");

    formData.append("product_name", data.product_name);
    formData.append("price_hour", data.price_hour.toString());
    formData.append("price_day", data.price_day.toString());
    formData.append("description", data.description);
    formData.append("metadata", data.metadata);
    formData.append("metatag", data.metatag);
    formData.append("active", data.active);

    if (data.product_image) {
      formData.append("product_image", data.product_image[0]);
    }

    try {
      if (!product) {
        await addProduct(formData);
        await mutate();
      } else {
        await updateProduct(Number(product.product_id), formData);
        await mutate();
      }
      reset();
      if (fileInputRef.current) fileInputRef.current.value = "";
      navigate("/vendor-dashboard/product-list");
    } catch (err) {
      console.error("Failed to submit product:", err);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full p-10 rounded-xl flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold text-[var(--primary)]">
            {product ? "Edit Product" : "Create Product"}
          </h2>
          <FormField
            control={control}
            name="sub_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Sub Services</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);

                    // Find the selected subcategory
                    const selected = subcategory?.find((s) => s.slug === value);

                    // Update product_name automatically
                    if (selected) {
                      form.setValue("product_name", selected.subcategory_name || '');
                    }
                  }}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a sub service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Services</SelectLabel>
                      {subcategory?.map((data) => (
                        <SelectItem key={data.slug} value={data.slug || ""}>
                          {data.subcategory_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* product Name */}
          <FormField
            control={control}
            name="product_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input {...field} readOnly placeholder="Enter product name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/*Price Per Day  */}
          <FormField
            control={control}
            name="price_day"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Per Day</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={
                      typeof field.value === "number" || typeof field.value === "string"
                        ? field.value
                        : ""
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? undefined : Number(val));
                    }}
                    placeholder="Enter product price per day"
                  />

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Price Per Hour */}
          <FormField
            control={control}
            name="price_hour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Per Hour </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={
                      typeof field.value === "number" || typeof field.value === "string"
                        ? field.value
                        : ""
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? undefined : Number(val));
                    }}
                    placeholder="Enter product price per hour"
                  />

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Description */}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter product description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Image */}
          <FormField
            control={control}
            name="product_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/webp"
                    onChange={(e) => {
                      field.onChange(e.target.files)
                    }}
                    ref={(el) => {
                      field.ref(el);
                      fileInputRef.current = el;
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Metadata */}
          <FormField
            control={control}
            name="metadata"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metadata</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Short metadata..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Metatag */}
          <FormField
            control={control}
            name="metatag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metatag</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="SEO keyword" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Active Checkbox */}

          <FormField
            control={control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value == "1"}
                    onCheckedChange={(checked: boolean) =>
                      field.onChange(checked ? "1" : "0")
                    }
                  />
                </FormControl>
                <FormLabel>Active</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-1/3 self-center"
          >
            {isSubmitting ? "Submitting..." : product ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default Product;
