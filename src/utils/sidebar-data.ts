
const data = {
  navMain: [
    {
      title: "User",
      url: "/dashboard",
      icon: "/Rento/User.png",
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
      icon: '/Rento/Services.png',
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
      icon: '/Rento/SubServices.png',
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
      icon: '/Rento/Vendor.png',
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
      icon: '/Rento/Booking.png',
      isActive: true,
      items: [
        {
          title: "Confirmed Booking List",
          url: "/dashboard/confirm-booking",
          permission: 'booking.list'
        },
        {
          title: "Pending Booking List",
          url: "/dashboard/pending-booking-list",
          permission: 'booking.approval'
        },
        {
          title: "Cancelled Booking List",
          url: "/dashboard/cancelled-booking-list",
          permission: 'booking.cancel'
        },
      ],
    },
    {
      title: "Blog",
      url: "/dashboard",
      icon: '/Rento/Blog.png',
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