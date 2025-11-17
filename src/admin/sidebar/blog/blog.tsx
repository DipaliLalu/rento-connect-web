"use client";

import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { addBlog, updateBLog, useGetBlogs } from "../../../actions/blog";
import type { Blogs } from "../../../types/blogs";
import TextEditor from "../../../components/text-editor";

// Schema
const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Minimum 3 characters required"),
  description: z.string().min(3, "Minimum 3 characters required"),
  image: z
    .any()
    .refine((file) => !file || (file instanceof FileList && file.length > 0), {
      message: "Image is required for new blog",
    })
    .refine((file) => !file || file[0]?.type === "image/webp", {
      message: "Only WebP files allowed",
    })
    .refine((file) => !file || file[0]?.size <= 1024 * 1024, {
      message: "Image must be ≤ 1MB",
    }),
  metadata: z.string().min(2, "Enter metadata"),
  metatag: z.string().min(2, "Enter metatag"),
  active: z.string().default("1"),
});

type FormData = z.infer<typeof schema>;

function Blog() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useGetBlogs();

  const blog: Blogs | undefined = location.state?.blog;
  const defaultValues: FormData = {
    id: blog?.id ?? undefined,
    title: blog?.title || "",
    description: blog?.description || "",
    image: undefined,
    metadata: blog?.metadata || "",
    metatag: blog?.metatag || "",
    active: blog?.active ?? "1",
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

    if (data.id) {
      formData.append("blog_id", data.id);
    }

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("active", data.active);
    formData.append("metadata", data.metadata);
    formData.append("metatag", data.metatag);
    if (data.image) formData.append("image", data.image[0]);

    try {
      if (!blog) {
        await addBlog(formData);
      } else {
        await updateBLog(Number(blog.id), formData);
      }
      await mutate();
      reset();
      if (fileInputRef.current) fileInputRef.current.value = "";
      navigate("/dashboard/blog-list");
    } catch (err) {
      console.error("Failed to submit games:", err);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full p-10 rounded-xl flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold text-primary">
            {blog ? "Edit Blog" : "Create Blog"}
          </h2>

          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter blog title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Description</FormLabel>
                <FormControl>
                  <TextEditor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Icon (WebP)</FormLabel>
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

          <FormField
            control={control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? "1" : "0")
                    }
                  />
                </FormControl>
                <FormLabel>Status</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-1/3 self-center"
          >
            {isSubmitting
              ? "Submitting..."
              : blog
                ? "Update Blog"
                : "Create Blog"}
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default Blog;
