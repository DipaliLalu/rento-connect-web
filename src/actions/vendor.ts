
import { toast } from "react-toastify";
import axiosInstance, { endpoints, fetcher } from "../utils/axios";
import { useMemo } from "react";
import useSWR from "swr";
import type { Vendor, VendorRemark } from "../types/vendor";
import { removeVendorToken, setVendorSession } from "../utils/vendor-utils";
import { type NavigateFunction } from "react-router-dom";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// Accept FormData instead of vendor
export async function registerVendor(data: FormData) {
  const url = endpoints.vendor.register;

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
    toast.error(`Failed to registre vendor: ${errorMessage}`);
    throw error;
  }
}

// list of vendor list
export function useGetVendorList(searchFor?: string) {
  const url =
    searchFor === "create"
      ? `${endpoints.vendor.vendorlist}?searchFor=${searchFor}`
      : endpoints.vendor.vendorlist;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: Vendor[];
  }>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    return {
      vendor: data?.data,
      isLoading,
      vendorError: error,
      vendorValidating: isValidating,
      vendorEmpty: !isLoading,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// list of active vendor list
export function useGetActiveVendorList(category?: string) {
  const url = category
    ? `${endpoints.vendor.vendotActiveList}?category=${category}`
    : endpoints.vendor.vendotActiveList;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: Vendor[];
  }>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    return {
      vendor: data?.data,
      isLoading,
      vendorError: error,
      vendorValidating: isValidating,
      vendorEmpty: !isLoading,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

export async function activeVendor(id: number, remark: string) {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: endpoints.vendor.activeVendor(id),
      data: {
        remark: remark,
      },
      headers: {
        "X-API-KEY": "rentosupersecretkey102"
      },
    });

    if (res?.data?.response === true) {
      toast.success(res.data.message || "Vendor active successfully");
    } else {
      throw new Error(res?.data?.message || "Vendor active vendor operation failed");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Unknown error";
    toast.error(`Failed to active vendor: ${errorMessage}`);
    throw error;
  }
}

export async function inActiveVendor(id: number, remark: string) {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: endpoints.vendor.inActiveVendor(id),
      data: {
        remark: remark,
      },
      headers: {
        "X-API-KEY": "rentosupersecretkey102"
      },
    });

    if (res?.data?.response === true) {
      toast.success(res.data.message || "Vendor inactive successfully");
    } else {
      throw new Error(res?.data?.message || "Vendor inactive vendor operation failed");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Unknown error";
    toast.error(`Failed to inactivate vendor: ${errorMessage}`);
    throw error;
  }
}

//vendor login
export async function loginVendor(data: FormData, navigate: NavigateFunction) {
  const url = endpoints.vendor.login;
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
      toast.success(res.data.message);
      const token = res.data.token;
      setVendorSession(token);
      if (res?.data?.role === "customer") {
        navigate('/customer-dashboard')
      } else {
        navigate('/vendor-dashboard');
      }
      return res.data;
    } else {
      toast.success(res.data.message);
      throw new Error(res?.data?.message || "Operation failed");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Unknown error";
    toast.error(`Failed to login: ${errorMessage}`);
    throw error;
  }
}


export async function logoutVendor(
  id: number | null,
  navigate: NavigateFunction
) {
  const url = endpoints.auth.logout(id);

  try {
    const res = await axiosInstance.put(
      url, // URL
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "rentosupersecretkey102",
        },
      }
    );

    if (res?.data?.status === true) {
      removeVendorToken();
      toast.success(res.data.message || "Logout successfully");
      navigate("/login");
    } else {
      toast.error(res?.data?.message || "Logout failed");
    }
  } catch (error: any) {
    toast.error(`Logout failed: ${error?.response?.data?.message || error.message}`);
  }
}

export function useGetVendorRemark(id: number | null) {
  const url = id ? endpoints.vendor.vendorRemark(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    response: boolean;
    data: VendorRemark[];
  }>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    const remarks = data?.data ?? [];

    return {
      vendorRemark: remarks,
      isLoading,
      vendorRemarkError: error,
      vendorRemarkValidating: isValidating,
      vendorRemarkEmpty: !isLoading && remarks.length === 0,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

