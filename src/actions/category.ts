
import { toast } from "react-toastify";
import useSWR from "swr";
import { useMemo } from "react";
import axiosInstance, { endpoints, fetcher } from "../utils/axios";
import type { Category } from "../types/category";


// SWR Options for data fetching
const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// Accept FormData instead of Category
export async function addCategory(data: FormData) {
  const url = endpoints.category.add;

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
    toast.error(`Failed to add category: ${errorMessage}`);
    throw error; // Re-throw to allow caller to handle
  }
}

//update category
export async function updateCategory(category_id: number, data: FormData) {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: endpoints.category.update(category_id),
      data,
      headers: {
        "Content-Type": "multipart/form-data",
         "X-API-KEY": "rentosupersecretkey102"
      },
    });

    if (res?.data?.response === true) {
      toast.success(res.data.message || "Category updated successfully");
      console.log('update data:',res.data.data);
      return res.data;
    } else {
      throw new Error(res?.data?.message || "Update operation failed");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Unknown error";
    toast.error(`Failed to update category: ${errorMessage}`);
    throw error;
  }
}

// list of Category
export function useGetCategory(searchFor?: string) {
  const url =
    searchFor === "create"
      ? `${endpoints.category.list}?searchFor=${searchFor}`
      : endpoints.category.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: Category[];
  }>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    return {
      category: data?.data,
      isLoading,
      categoryError: error,
      categoryValidating: isValidating,
      categoryEmpty: !isLoading,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

//single delete
export async function deleteCategory(id: number) {
  try {
    const res = await axiosInstance({
      method: "PUT",
      url: endpoints.category.delete(id),
    });

    if (res?.data?.status === true) {
      toast.success(res.data.message || "Category delete successfully");
    } else {
      throw new Error(res?.data?.message || "Delete operation failed");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Unknown error";
    toast.error(`Failed to delete category: ${errorMessage}`);
    throw error;
  }
}
