
import { toast } from "react-toastify";
import useSWR from "swr";
import { useMemo } from "react";
import axiosInstance, { endpoints, fetcher } from "../utils/axios";
import type { Product } from "../types/products";


// SWR Options for data fetching
const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// Accept FormData instead of Product
export async function addProduct(data: FormData) {
  const url = endpoints.product.add;

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
    toast.error(`Failed to add Product: ${errorMessage}`);
    throw error; // Re-throw to allow caller to handle
  }
}

//update Product
export async function updateProduct(id: number, data: FormData) {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: endpoints.product.update(id),
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": "rentosupersecretkey102"
      },
    });

    if (res?.data?.response === true) {
      toast.success(res.data.message || "Product updated successfully");
      console.log('update data:', res.data.data);
      return res.data;
    } else {
      throw new Error(res?.data?.message || "Update operation failed");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Unknown error";
    toast.error(`Failed to update product: ${errorMessage}`);
    throw error;
  }
}

// list of Product
export function useGetProduct(searchFor?: string) {
  const url =
    searchFor === "create"
      ? `${endpoints.product.list}?searchFor=${searchFor}`
      : endpoints.product.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: Product[];
  }>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    return {
      products: data?.data,
      isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

//single delete
export async function deleteProduct(id: number) {
  try {
    const res = await axiosInstance({
      method: "DELETE",
      url: endpoints.product.delete(id),
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": "rentosupersecretkey102"
      },
    });

    if (res?.data?.response === true) {
      toast.success(res.data.message || "Product delete successfully");
    } else {
      throw new Error(res?.data?.message || "Delete operation failed");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Unknown error";
    toast.error(`Failed to delete product: ${errorMessage}`);
    throw error;
  }
}
