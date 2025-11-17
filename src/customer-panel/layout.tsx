// src/layouts/CustomerLayout.jsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../components/ui/breadcrumb";
import { Outlet } from "react-router-dom";

export default function CustomerLayout() {
  return (
    <section className="flex flex-col gap-8">
      {/* ✅ Shared breadcrumb and header */}
      <div className="flex flex-col gap-1 py-5 px-5 md:px-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/customer-dashboard" className="hover:text-blue-900 font-semibold">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">Customer Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Welcome, Customer!</h1>
          <p className="text-muted-foreground">Manage your rentals, expert hires, and mobility solutions.</p>
        </div>
      </div>

      {/* ✅ Child page renders here */}
      <Outlet />
    </section>
  );
}
