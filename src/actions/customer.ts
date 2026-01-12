import { toast } from "react-toastify";
import axiosInstance, { endpoints, fetcher } from "../utils/axios";
import useSWR from "swr";
import { useMemo } from "react";
import type { Customer } from "../types/customer";

// SWR Options for data fetching
const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// Accept FormData instead of customer
export async function registerCustomer(data: FormData) {
    const url = endpoints.customer.register;
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
        if (res?.data?.response === true) {
            // toast.success(res.data.message);
            return res.data;
        } else {
            throw new Error(res?.data?.message || "Operation failed");
        }
    } catch (error: any) {
        const errorMessage =
            error?.response?.data?.message || error.message || "Unknown error";
        toast.error(`Failed to registre customer: ${errorMessage}`);
        throw error;
    }
}

// list of Product
export function useGetCustomer(id: number) {
  // ✅ Better naming for clarity
  const url = endpoints.customer.list(id);

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    response: boolean;
    customer: Customer;
  }>(id ? url : null, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    return {
      customer: data?.customer ?? null,
      isLoading,
      customerError: error,
      customerValidating: isValidating,
      customerEmpty: !isLoading && !data?.customer,
      mutate,
    };
  }, [data?.customer, error, isLoading, isValidating]);

  return memoizedValue;
}

