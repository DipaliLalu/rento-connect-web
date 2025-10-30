"use client";

import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { useGetLoginUser } from "../../../actions/auth";
import {
  addSubCategory,
  updateSubCategory,
  useGetSubCategory,
} from "../../../actions/subcategory";
import type { SubCategory } from "../../../types/subcategory";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useGetCategory } from "../../../actions/category";

// ✅ Zod Schema
const schema = z.object({
  subcategory_id: z.string().optional(),
  category_slug: z.string().min(1, "Select a category"),
  subcategory_name: z.string().min(3, "Minimum 3 characters required"),
  heading: z.string().min(3, "Minimum 3 characters required"),
  description: z.string().min(3, "Minimum 3 characters required"),
  subcategory_image: z
    .any()
    .refine((file) => !file || (file instanceof FileList && file.length > 0), {
      message: "Image is required for new subcategories",
    })
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

function SubCategoryForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useGetSubCategory();
  const { user } = useGetLoginUser();
  const { category } = useGetCategory();

  const subcategory: SubCategory | undefined = location.state?.subcategory;

  const defaultValues: FormData = {
    subcategory_id: subcategory?.subcategory_id ?? undefined,
    subcategory_name: subcategory?.subcategory_name || "",
    category_slug: subcategory?.category_slug || "",
    heading: subcategory?.heading || "",
    description: subcategory?.description || "",
    metadata: subcategory?.metadata || "",
    metatag: subcategory?.metatag || "",
    subcategory_image: undefined,
    active: subcategory?.active?.toString() ?? "1",
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

    if (data.subcategory_id)
      formData.append("subcategory_id", data.subcategory_id);

    formData.append("category_slug", data.category_slug);
    formData.append("subcategory_name", data.subcategory_name);
    formData.append("heading", data.heading);
    formData.append("description", data.description);
    formData.append("metadata", data.metadata);
    formData.append("metatag", data.metatag);
    formData.append("active", data.active);
    formData.append("created_by", user?.data.username || "");

    if (data.subcategory_image && data.subcategory_image.length > 0) {
      formData.append("subcategory_image", data.subcategory_image[0]);
    }

    try {
      if (!subcategory) {
        await addSubCategory(formData);
      } else {
        await updateSubCategory(Number(subcategory.subcategory_id), formData);
      }
      await mutate();
      reset();
      if (fileInputRef.current) fileInputRef.current.value = "";
      navigate("/dashboard/subcategory-list");
    } catch (err) {
      console.error("Failed to submit subcategory:", err);
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
            {subcategory ? "Edit Subcategory" : "Create Subcategory"}
          </h2>

          {/* Category Select */}
          <FormField
            control={control}
            name="category_slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Category</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {category?.map((data) => (
                        <SelectItem
                          key={data.slug}
                          value={data.slug || ""}
                        >
                          {data.category_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subcategory Name */}
          <FormField
            control={control}
            name="subcategory_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter subcategory name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Heading */}
          <FormField
            control={control}
            name="heading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heading</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter heading" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image */}
          <FormField
            control={control}
            name="subcategory_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory Image (WebP)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/webp"
                    onChange={(e) => field.onChange(e.target.files)}
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
                  <Input {...field} placeholder="Enter metadata" />
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
                  <Input {...field} placeholder="Enter metatag" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Active */}
          <FormField
            control={control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={(checked: boolean) =>
                      field.onChange(checked ? "1" : "0")
                    }
                  />
                </FormControl>
                <FormLabel>Active</FormLabel>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-1/3 self-center"
          >
            {isSubmitting ? "Submitting..." : subcategory ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default SubCategoryForm;
