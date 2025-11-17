import { FaUser } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";

const data = {
  navMain: [
    {
      title: "User",
      url: "/dashboard",
      icon: FaUser,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/dashboard/user-list",
          permission: 'user.view'
        },
        {
          title: "Add",
          url: "/dashboard/user",
          permission: 'user.create'
        },
      ],
    },
    {
      title: "Services",
      url: "/dashboard",
      icon: MdCategory,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/dashboard/category-list",
          permission: 'category.view'
        },
        {
          title: "Add",
          url: "/dashboard/category",
          permission: 'category.create'
        },
      ],
    },
    {
      title: "Sub Services",
      url: "/dashboard",
      icon: MdCategory,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/dashboard/subcategory-list",
          permission: 'subcategory.view'
        },
        {
          title: "Add",
          url: "/dashboard/subcategory",
          permission: 'subcategory.create'
        },
      ],
    },
    {
      title: "Vendor",
      url: "/dashboard",
      icon: MdCategory,
      isActive: true,
      items: [
        {
          title: "Active Vendor List",
          url: "/dashboard/active-vendor",
          permission: 'vendor.list'
        },
        {
          title: "Pending Vendor List",
          url: "/dashboard/vendor-list",
          permission: 'vendor.approval'
        },
      ],
    },
    {
      title: "Booking",
      url: "/dashboard",
      icon: MdCategory,
      isActive: true,
      items: [
        {
          title: "Approval Booking List",
          url: "/dashboard/active-booking",
          permission: 'booking.list'
        },
        {
          title: "Pending Booking List",
          url: "/dashboard/pending-booking-list",
          permission: 'booking.approval'
        },
      ],
    },
    {
      title: "Blog",
      url: "/dashboard",
      icon: MdCategory,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/dashboard/blog-list",
          permission: 'blog.view'
        },
        {
          title: "Add",
          url: "/dashboard/blog",
          permission: 'blog.create'
        },
      ],
    },
  ],
};

export default data;