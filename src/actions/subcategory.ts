
import { toast } from "react-toastify";
import useSWR from "swr";
import { useMemo } from "react";
import axiosInstance, { endpoints, fetcher } from "../utils/axios";
import type { MobilitySubCategory, SubCategory } from "../types/subcategory";


// SWR Options for data fetching
const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// Accept FormData instead of sub Category
export async function addSubCategory(data: FormData) {
  const url = endpoints.subcategory.add;

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
    toast.error(`Failed to add sub category: ${errorMessage}`);
    throw error; // Re-throw to allow caller to handle
  }
}

//update category
export async function updateSubCategory(category_id: number, data: FormData) {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: endpoints.subcategory.update(category_id),
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": "rentosupersecretkey102"
      },
    });

    if (res?.data?.response === true) {
      toast.success(res.data.message || "Sub Category updated successfully");
      return res.data;
    } else {
      throw new Error(res?.data?.message || "Update operation failed");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Unknown error";
    toast.error(`Failed to update sub category: ${errorMessage}`);
    throw error;
  }
}

// list of Category
export function useGetSubCategory(searchFor?: string) {
  const url =
    searchFor === "create"
      ? `${endpoints.subcategory.list}?searchFor=${searchFor}`
      : endpoints.subcategory.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: SubCategory[];
  }>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    return {
      subcategory: data?.data,
      isLoading,
      subcategoryError: error,
      subcategoryValidating: isValidating,
      subcategoryEmpty: !isLoading,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}
// list of Category
export function useGetMobilitySubCategory(searchFor?: string) {
  const url =
    searchFor === "create"
      ? `${endpoints.mobilitysubservices.list}?searchFor=${searchFor}`
      : endpoints.mobilitysubservices.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: MobilitySubCategory[];
  }>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    return {
      mobilitysubcategory: data?.data,
      isLoading,
      mobilitysubcategoryError: error,
      mobilitysubcategoryValidating: isValidating,
      mobilitysubcategoryEmpty: !isLoading,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

//single delete
export async function deleteSubCategory(id: number) {
  try {
    const res = await axiosInstance({
      method: "DELETE",
      url: endpoints.subcategory.delete(id),
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": "rentosupersecretkey102"
      },
    });

    if (res?.data?.response === true) {
      toast.success(res.data.message || "Sub Category delete successfully");
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

//get category with slug
export function useGetSubCategoryWithSlug(slug: string | null) {
  const url = slug
    ? endpoints.subcategory.listwithslug(slug)
    : endpoints.subcategory.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: SubCategory[];
  }>(url, fetcher);

  const memoizedValue = useMemo(() => {
    return {
      subcategory: data?.data,
      isLoading,
      subcategoryError: error,
      subcategoryValidating: isValidating,
      subcategoryEmpty: !isLoading && !data?.data?.length,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

