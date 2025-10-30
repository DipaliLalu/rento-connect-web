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
          url: "/dashboard",
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
          permission: 'subcategory.view'
        },
        {
          title: "Pending Approval Vendor",
          url: "/dashboard/vendor-list",
          permission: 'subcategory.view'
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
          permission: 'subcategory.view'
        },
        {
          title: "Pending Approval Booking",
          url: "/dashboard/pending-booking-list",
          permission: 'subcategory.view'
        },
      ],
    },
  ],
};

export default data;