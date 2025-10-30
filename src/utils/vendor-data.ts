import { FaUser } from "react-icons/fa6";

const VendorData = {
  navMain: [
    {
      title: "Product",
      url: "/vendor-dashboard",
      icon: FaUser,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/vendor-dashboard",
        },
        {
          title: "Add",
          url: "/vendor-dashboard/product",
        },
      ],
    },
  ],
};

export default VendorData;