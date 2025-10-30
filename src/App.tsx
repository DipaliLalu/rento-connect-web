
// import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";
import ScrollToTop from "./components/scroll-to-top";
import PrivateRoute from "./components/private-route";
import NotFound from "./components/not-found";
import Layout from "./Layout";
import VendorPrivateRoute from "./components/vendor-private-route";

const Home = lazy(() => import("./pages/home"));
const CategoryPage = lazy(() => import('./pages/category'));
const VendorRegister = lazy(() => import("./pages/vendor-register"))
const Login = lazy(() => import("./admin/login"));
const SidebarLayout = lazy(() => import("./admin/sidebar/layout"));
const Profile = lazy(() => import("./admin/profile"));
const UserCreate = lazy(() => import("./admin/sidebar/user/user"));
const UserList = lazy(() => import('./admin/sidebar/user/user-list'));
const Category = lazy(() => import("./admin/sidebar/category/category"));
const CategoryList = lazy(() => import("./admin/sidebar/category/category-list"));
const SubCategory = lazy(() => import("./admin/sidebar/subcategory/subcategory"));
const SubCategoryList = lazy(() => import("./admin/sidebar/subcategory/subcategory-list"));
const ActiveVendorList = lazy(() => import("./admin/sidebar/vendor/active-vendorlist"));
const VendorList = lazy(() => import("./admin/sidebar/vendor/vendorlist"));
const VendorLogin = lazy(() => import('./pages/vendor-login'))
const VendorSidebarLayout = lazy(() => import('./vendor-panel/layout'));
const Product = lazy(() => import("./vendor-panel/product/product"));
const ProductList = lazy(() => import("./vendor-panel/product/product-list"));
const CustomerRegister = lazy(() => import("./pages/customer-register"));
const CustomerLayout=lazy(()=>import("./customer-panel/layout"));
const CustomerHomePage = lazy(() => import("./customer-panel/index"));
const RequestQuoteForm=lazy(()=>import("./pages/request-quote"));
const ActiveBookingList = lazy(() => import("./admin/sidebar/booking/approval-bookinglist"));
const PendingBookingList = lazy(() => import("./admin/sidebar/booking/bookinglist"));
const Booking=lazy(()=>import("./customer-panel/bookings-list"));

function App() {

  return (
    // <HelmetProvider>
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
        <Routes>
          <Route path="/admin-login" element={<Login />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/vendor-register" element={<VendorRegister />} />
            <Route path="/customer-register" element={<CustomerRegister />} />
            <Route path="/login" element={<VendorLogin />} />
            <Route path="/request-quote" element={<RequestQuoteForm />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<SidebarLayout />}>
              <Route index element={<UserList />} />
              <Route path="user" element={<UserCreate />} />
              <Route path="user-list" element={<UserList />} />
              <Route path="category" element={<Category />} />
              <Route path="category-list" element={<CategoryList />} />
              <Route path="subcategory" element={<SubCategory />} />
              <Route path="subcategory-list" element={<SubCategoryList />} />
              <Route path="active-vendor" element={<ActiveVendorList />} />
              <Route path="vendor-list" element={<VendorList />} />
              <Route path="active-booking" element={<ActiveBookingList />} />
              <Route path="pending-booking-list" element={<PendingBookingList />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<VendorPrivateRoute />}>
            <Route path="/vendor-dashboard" element={<VendorSidebarLayout />}>
              <Route index element={<ProductList />} />
              <Route path="product" element={<Product />} />
              <Route path="product-list" element={<ProductList />} />
            </Route>
            <Route element={<Layout />}>
              <Route path="/customer-dashboard" element={<CustomerLayout />}>
                <Route index element={<CustomerHomePage />} />
                 <Route path="booking" element={<Booking />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
    // </HelmetProvider>
  )
}

export default App
