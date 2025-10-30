
import { toast } from "react-toastify";
import useSWR from "swr";
import { useMemo } from "react";
import axiosInstance, { endpoints, fetcher } from "../utils/axios";
import type { Permissions, Roles, User } from "../types/user";



// SWR Options for data fetching
const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// Accept FormData instead of User
export async function addUser(data: FormData) {
  const url = endpoints.users.add;

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
    toast.error(`Failed to add User: ${errorMessage}`);
    throw error; // Re-throw to allow caller to handle
  }
}

//update User
export async function updateUser(User_id: number, data: FormData) {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: endpoints.users.update(User_id),
      data,
      headers: {
        "Content-Type": "multipart/form-data",
         "X-API-KEY": "rentosupersecretkey102"
      },
    });

    if (res?.data?.status === true) {
      toast.success(res.data.message || "User updated successfully");
      return res.data;
    } else {
      throw new Error(res?.data?.message || "Update operation failed");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Unknown error";
    toast.error(`Failed to update User: ${errorMessage}`);
    throw error;
  }
}

// list of User
export function useGetUser(searchFor?: string) {
  const url =
    searchFor === "create"
      ? `${endpoints.users.list}?searchFor=${searchFor}`
      : endpoints.users.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: User[];
  }>(url, fetcher, swrOptions);
  const memoizedValue = useMemo(() => {
    return {
      User: data?.data,
      isLoading,
      UserError: error,
      UserValidating: isValidating,
      UserEmpty: !isLoading,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

//single delete
export async function deleteUser(id: number) {
  try {
    const res = await axiosInstance({
      method: "PUT",
      url: endpoints.users.delete(id),
    });

    if (res?.data?.status === true) {
      toast.success(res.data.message || "User delete successfully");
    } else {
      throw new Error(res?.data?.message || "Delete operation failed");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Unknown error";
    toast.error(`Failed to delete User: ${errorMessage}`);
    throw error;
  }
}

export function useGetRoles(searchFor?: string) {
  const url =
    searchFor === "create"
      ? `${endpoints.roles.list}?searchFor=${searchFor}`
      : endpoints.roles.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: Roles[];
  }>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    return {
      roles: data?.data,
      isLoading,
      UserError: error,
      UserValidating: isValidating,
      UserEmpty: !isLoading,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

export function useGetPermission(searchFor?: string) {
  const url =
    searchFor === "create"
      ? `${endpoints.permissions.list}?searchFor=${searchFor}`
      : endpoints.permissions.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<{
    data: Permissions[];
  }>(url, fetcher, swrOptions);
  const memoizedValue = useMemo(() => {
    return {
      Permissions: data?.data,
      isLoading,
      UserError: error,
      UserValidating: isValidating,
      UserEmpty: !isLoading,
      mutate,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

