import { toast } from "react-toastify";
import useSWR from "swr";
import { useMemo } from "react";
import axiosInstance, { endpoints, fetcher } from "../utils/axios";
import type { Blogs } from "../types/blogs";

// SWR Options for data fetching
const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
};

// Accept FormData instead of Blogs
export async function addBlog(data: FormData) {
    const url = endpoints.blog.add;

    try {
        const res = await axiosInstance({
            method: "POST",
            url,
            data,
            headers: {
                "Content-Type": "multipart/form-data",
                 "X-API-KEY": "rentosupersecretkey102"
            },
        });

        if (res?.data?.status === true) {
            toast.success(res.data.message);
            return res.data;
        } else {
            throw new Error(res?.data?.message || "Operation failed");
        }
    } catch (error: any) {
        const errorMessage =
            error?.response?.data?.message || error.message || "Unknown error";
        toast.error(`Failed to add blog: ${errorMessage}`);
        throw error; // Re-throw to allow caller to handle
    }
}

//update blogs
export async function updateBLog(blog_id: number, data: FormData) {
    try {
        const res = await axiosInstance({
            method: "POST",
            url: endpoints.blog.update(blog_id),
            data,
            headers: {
                "Content-Type": "multipart/form-data",
                 "X-API-KEY": "rentosupersecretkey102"
            },
        });

        if (res?.data?.status === true) {
            toast.success(res.data.message);
            console.log('update data:', res.data.data);
            return res.data;
        } else {
            throw new Error(res?.data?.message || "Update operation failed");
        }
    } catch (error: any) {
        const errorMessage =
            error?.response?.data?.message || error.message || "Unknown error";
        toast.error(`Failed to update blog: ${errorMessage}`);
        throw error;
    }
}

// list of blogs
export function useGetBlogs(searchFor?: string) {
    const url =
        searchFor === "create"
            ? `${endpoints.blog.list}?searchFor=${searchFor}`
            : endpoints.blog.list;

    const { data, isLoading, error, isValidating, mutate } = useSWR<{
        data: Blogs[];
    }>(url, fetcher, swrOptions);

    const memoizedValue = useMemo(() => {

        return {
            blogs: data?.data,
            isLoading,
            blogsValidating: isValidating,
            blogsEmpty: !isLoading,
            blogsError: error,
            mutate,
        };
    }, [data?.data, error, isLoading, isValidating]);

    return memoizedValue;
}

//single delete
export async function deleteBlog(blog_id: number) {
    try {
        const res = await axiosInstance({
            method: "DELETE",
            url: endpoints.blog.delete(blog_id),
        });

        if (res?.data?.status === true) {
            toast.success(res.data.message || "Blog delete successfully");
        } else {
            throw new Error(res?.data?.message || "Delete operation failed");
        }
    } catch (error: any) {
        const errorMessage =
            error?.response?.data?.message || error.message || "Unknown error";
        toast.error(`Failed to delete Blog: ${errorMessage}`);
        throw error;
    }
}

