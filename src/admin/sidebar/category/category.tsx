"use client";

import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { addCategory, updateCategory, useGetCategory } from "../../../actions/category";
import type { Category } from "../../../types/category";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { useGetLoginUser } from "../../../actions/auth";

// Schema
const schema = z.object({
  category_id: z.string().optional(),
  category_name: z.string().min(3, "Minimum 3 characters required"),
  title: z.string().min(3, "Minimum 3 characters required"),
  heading: z.string().min(3, "Minimum 3 characters required"),
  description: z.string().min(3, "Minimum 3 characters required"),
  category_image: z
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

function Category() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useGetCategory();
  const { user } = useGetLoginUser();

  const category: Category | undefined = location.state?.category;
  const defaultValues: FormData = {
    category_id: category?.category_id ?? undefined,
    category_name: category?.category_name || "",
    title: category?.title || "",
    heading: category?.heading || "",
    description: category?.description || "",
    metadata: category?.metadata || "",
    metatag: category?.metatag || "",
    category_image: undefined,
    active: category?.active ?? "1",
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
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    if (data.category_id)
      formData.append("category_id", data.category_id.toString());

    formData.append("category_name", data.category_name);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("heading", data.heading);
    formData.append("active", data.active);
    formData.append("created_by", user?.data.username || "");
    if (data.category_image) {
      formData.append("category_image", data.category_image[0]);
    }

    formData.append("metadata", data.metadata);
    formData.append("metatag", data.metatag);

    try {
      if (!category) {
        await addCategory(formData);
        await mutate();
      } else {
        await updateCategory(Number(category.category_id), formData);
        await mutate();
      }
      reset();
      if (fileInputRef.current) fileInputRef.current.value = "";
      navigate("/dashboard/category-list");
    } catch (err) {
      console.error("Failed to submit category:", err);
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
            {category ? "Edit Category" : "Create Category"}
          </h2>

          {/* Category Name */}
          <FormField
            control={control}
            name="category_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter category name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Category Name */}
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter category title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Category Heading */}
          <FormField
            control={control}
            name="heading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Heading</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter category heading" />
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
                <FormLabel>Category Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter category description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Image */}
          <FormField
            control={control}
            name="category_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/webp"
                    onChange={(e) => {console.log('image',e.target.files)
                      field.onChange(e.target.files)}}
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
            {isSubmitting ? "Submitting..." : category ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default Category;
