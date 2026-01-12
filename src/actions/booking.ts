import { toast } from "react-toastify";
import axiosInstance, { endpoints, fetcher } from "../utils/axios";
import useSWR from "swr";
import { useMemo } from "react";
import type { Booking, BookingRemark } from "../types/booking";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// Accept FormData instead of customer
export async function registerBooking(data: FormData) {
  const url = endpoints.booking.register;
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

// list of vendor list
export function useGetBookings(searchFor?: string) {
  const url =
    searchFor === "create"
      ? `${endpoints.booking.list}?searchFor=${searchFor}`
      : endpoints.booking.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: Booking[];
  }>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    return {
      bookings: data?.data,
      isLoading,
      bookingsError: error,
      bookingsValidating: isValidating,
      bookingsEmpty: !isLoading,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// list of vendor list
export function useGetBookingList(searchFor?: string) {
  const url =
    searchFor === "create"
      ? `${endpoints.booking.bookinglist}?searchFor=${searchFor}`
      : endpoints.booking.bookinglist;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: Booking[];
  }>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    return {
      bookings: data?.data,
      isLoading,
      bookingsError: error,
      bookingsValidating: isValidating,
      bookingsEmpty: !isLoading,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// list of active vendor list
export function useGetActiveBookingList(searchFor?: string) {
  const url =
    searchFor === "create"
      ? `${endpoints.booking.bookingActiveList}?searchFor=${searchFor}`
      : endpoints.booking.bookingActiveList;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: Booking[];
  }>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    return {
      bookings: data?.data,
      isLoading,
      bookingsError: error,
      bookingsValidating: isValidating,
      bookingsEmpty: !isLoading,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// list of active vendor list
export function useGetCustomerBookingList(id: number) {
  const url = endpoints.booking.customerBooking(id);

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: Booking[];
  }>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    return {
      bookings: data?.data,
      isLoading,
      bookingsError: error,
      bookingsValidating: isValidating,
      bookingsEmpty: !isLoading,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}
// list of active vendor list
export function useGetCustomerBookinghistory(id: number) {
  const url = endpoints.booking.customerBookingHistory(id);

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: Booking[];
  }>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    return {
      bookings: data?.data,
      isLoading,
      bookingsError: error,
      bookingsValidating: isValidating,
      bookingsEmpty: !isLoading,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

export async function activeBooking(id: number, data: FormData) {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: endpoints.booking.activeBooking(id),
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": "rentosupersecretkey102"
      },
    });

    if (res?.data?.response === true) {
      toast.success(res.data.message || "Booking active successfully");
    } else {
      throw new Error(res?.data?.message || "active booking operation failed");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Unknown error";
    toast.error(`Failed to active booking: ${errorMessage}`);
    throw error;
  }
}

//single delete
export async function deleteBooking(id: number, data: { remark: string; reason: string }) {
  try {
    const res = await axiosInstance.delete(
      endpoints.booking.delete(id),
      {
        data, // ✅ JSON
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "rentosupersecretkey102"
        },
      }
    );

    if (res?.data?.response === true) {
      toast.success(res.data.message || "Booking deleted successfully");
    } else {
      throw new Error(res?.data?.message || "Delete failed");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Unknown error";
    toast.error(`Failed to delete booking: ${errorMessage}`);
    throw error;
  }
}

export function useGetBookingRemark(id: number | null) {
  const url = id ? endpoints.booking.bookingRemark(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    response: boolean;
    data: BookingRemark[];
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

export async function createBookingRemark(data: {
  booking_id: number;
  remark: string;
}) {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: endpoints.booking.bookingRemarkCreate,
      data,
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "rentosupersecretkey102"
      },
    });

    if (res?.data?.response === true) {
      // toast.success(res.data.message || "Booking remark added successfully");
    } else {
      throw new Error(res?.data?.message || "Failed to add booking remark");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Unknown error";
    toast.error(`Failed to add booking remark: ${errorMessage}`);
    throw error;
  }
}

// list of active vendor list
export function useGetCancelBookingList(searchFor?: string) {
  const url =
    searchFor === "create"
      ? `${endpoints.booking.Cancelbookinglist}?searchFor=${searchFor}`
      : endpoints.booking.Cancelbookinglist;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: Booking[];
  }>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    return {
      bookings: data?.data,
      isLoading,
      bookingsError: error,
      bookingsValidating: isValidating,
      bookingsEmpty: !isLoading,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}