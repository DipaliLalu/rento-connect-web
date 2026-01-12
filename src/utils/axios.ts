import axios, { type AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http:/localhost:8080",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken"); // or localStorage.getItem
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default axiosInstance;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, {
      ...config, headers: {
        "x-api-key": "rentosupersecretkey102",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    login: "/login",
    logout: (id: number | null) => `/logout/${id}`,
    update: (id: number | null) => `/profile/${id}`,
  },
  users: {
    add: "/users",
    list: "/users",
    update: (id: number | null) => `/users/${id}`,
    delete: (id: number | null) => `/users/${id}`,
  },
  category: {
    add: "/categories",
    list: "/categories",
    update: (id: number | null) => `/categories/${id}`,
    delete: (id: number | null) => `/categories/${id}`,
  },
  subcategory: {
    add: "/subcategories",
    list: "/subcategories",
    listwithslug: (slug: any | null) => `/subcategoriesBySlug/${slug}`,
    Mobilitylistwithslug: `/mobilityBySlug`,
    update: (id: number | null) => `/subcategories/${id}`,
    delete: (id: number | null) => `/subcategories/${id}`,
  },
  permissions: {
    add: "/permissions",
    list: "/permissions",
    update: (id: number | null) => `/permissions/${id}`,
  },
  roles: {
    add: "/role",
    list: "/role",
    update: (id: number | null) => `/role/${id}`,
  },
  vendor: {
    register: "/vendor/register",
    login: "/vendor/login",
    vendotActiveList: `vendor/activelist`,
    vendorlist: "vendor/list",
    activeVendor: (id: number | null) => `/vendor/activate/${id}`,
    inActiveVendor: (id: number | null) => `/vendor/inactivate/${id}`,
    vendorRemark: (id: number | null) => `/vendorremark/${id}`
  },
  customer: {
    register: "/customer/register",
    list: (id: number | null) => `/customer/list/${id}`
  },
  booking: {
    register: "/booking",
    list: `booking-list`,
    bookingActiveList: "booking/activelist",
    bookinglist: "booking/list",
    activeBooking: (id: number | null) => `booking/activate/${id}`,
    customerBooking: (id: number | null) => `bookinglist/${id}`,
    customerBookingHistory: (id: number | null) => `bookinghistory/${id}`,
    delete: (id: number | null) => `booking/${id}`,
    bookingRemark: (id: number | null) => `/bookingremark/${id}`,
    bookingRemarkCreate: `bookingremark`,
    Cancelbookinglist: `booking-cancel-list`
  },
  product: {
    add: "/products",
    list: "/products",
    update: (id: number | null) => `/products/${id}`,
    delete: (id: number | null) => `/products/${id}`,
    listwithslug: (slug: any | null) => `/products/productBySlug/${slug}`,
  },
  blog: {
    add: "/blog",
    list: "/blog",
    blogList: "/blog/list",
    update: (id: number | null) => `/blog/${id}`,
    delete: (id: number | null) => `/blog/${id}`,
    nextPrevBlog: (id: number | null) => `/blog/next-prev/${id}`,
    relateBlog: (category: string, id?: number) =>
      id ? `/blog/related/${category}/${id}` : `/blog/related/${category}`,
  },
  contact: {
    sendmail: "/contact/send",
  },
  mobilitysubservices: {
    list: "/mobilitysubservices",
  },
};
