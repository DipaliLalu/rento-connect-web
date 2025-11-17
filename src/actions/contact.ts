
import { toast } from "react-toastify";
import axiosInstance, { endpoints } from "../utils/axios";

// Accept FormData instead of Category
export async function sendMail(data: FormData) {
  const url = endpoints.contact.sendmail;

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
    if (res?.data?.result === "success") {
      toast.success("Suucessfully send message");
      return res.data;
    } else {
      throw new Error(res?.data?.message || "Operation failed");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Unknown error";
    toast.error(`Failed to submit: ${errorMessage}`);
    throw error; // Re-throw to allow caller to handle
  }
}