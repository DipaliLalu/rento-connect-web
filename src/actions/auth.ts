import axiosInstance, { endpoints } from "../utils/axios";

import { toast } from "react-toastify";
import useSWR from "swr";

import type { NavigateFunction } from "react-router-dom";
import { getUserInfo, removeToken, setSession } from "../utils/utils";
import type { AdminLogin, Profile } from "../types/admin-login";

// admin login
export async function loginAdmin(reportData: AdminLogin) {
  const url = endpoints.auth.login;
  try {
    const res = await axiosInstance.post(url, reportData, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "rentosupersecretkey102"
      }
    });
    if (res?.data?.status === true) {
      const token = res.data.token;
      setSession(token);
      toast.success(res.data.message || "Login successfully");
    }
  } catch (error: any) {
    toast.error(`Failed Login: ${error?.res?.data || error.message}`);
  }
}

//admin logout
export async function logoutAdmin(
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
      removeToken();
      toast.success(res.data.message || "Logout successfully");
      navigate("/login");
    } else {
      toast.error(res?.data?.message || "Logout failed");
    }
  } catch (error: any) {
    toast.error(`Logout failed: ${error?.response?.data?.message || error.message}`);
  }
}


//update admin
export async function updateAdmin(id: number, data: Profile) {
  const url = endpoints.auth.update(id);
  try {
    const res = await axiosInstance.put(url, data);
    if (res?.data?.status === true) {
      const token = res.data.token;
      setSession(token);
      toast.success(res.data.message || "Profile update successfully");
    }
  } catch (error: any) {
    toast.error(`Failed update profile: ${error?.res?.data || error.message}`);
  }
}

//user detail
export function useGetLoginUser() {
  const { data } = useSWR("user-info", () => getUserInfo(), {
    revalidateOnFocus: false,
  });
  return {
    user: data
  };
}

