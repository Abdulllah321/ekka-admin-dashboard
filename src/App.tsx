import React, { Suspense, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { checkUser } from "./slices/authSlice";
import Loader from "./components/common/Loader";
import axios from "axios";

// Dynamically import pages using React.lazy
const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const CategoryPage = React.lazy(() => import("./pages/CategoryPage"));
const SubCategoryPage = React.lazy(() => import("./pages/SubCategoryPage"));
const BannerPage = React.lazy(() => import("./pages/BannerPage"));
const ProductFormPage = React.lazy(() => import("./pages/ProductFormPage"));
const ProductListPage = React.lazy(() => import("./pages/ProductListPage"));
const ProductGridPage = React.lazy(() => import("./pages/ProductGridPage"));
const ProductDetailPage = React.lazy(() => import("./pages/ProductDetailPage"));
const CouponsPage = React.lazy(() => import("./pages/CouponsPage"));
const OrdersPage = React.lazy(() => import("./pages/OrdersPage"));
const OrderDetailPage = React.lazy(() => import("./pages/OrderDetailPage"));
const ReviewsPage = React.lazy(() => import("./pages/ReviewsPage"));
const ReviewInfoPage = React.lazy(() => import("./pages/ReviewInfoPage"));
const VendorListPage = React.lazy(() => import("./pages/vendor/list"));
const UsersPage = React.lazy(() => import("./pages/UsersPage"));
const VendorProfilePage = React.lazy(
  () => import("./pages/vendor/VendorProfilePage")
);

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  if (loading)
    return (
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
    );
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

  if (!loading && !isAuthenticated) navigate("/auth/admin/login");

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/admin/login" element={<LoginPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/sub-category" element={<SubCategoryPage />} />
          <Route path="/banners" element={<BannerPage />} />
          <Route path="/product-form" element={<ProductFormPage />} />
          <Route path="/product-form/:id" element={<ProductFormPage />} />
          <Route path="/product-list" element={<ProductListPage />} />
          <Route path="/product-grid" element={<ProductGridPage />} />
          <Route path="/product-detail/:slug" element={<ProductDetailPage />} />
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order/:id" element={<OrderDetailPage />} />
          <Route path="/review-list" element={<ReviewsPage />} />
          <Route path="/review-info/:id" element={<ReviewInfoPage />} />
          <Route path="/vendors" element={<VendorListPage />} />
          <Route path="/vendors/:id" element={<VendorProfilePage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Suspense>{" "}
    </div>
  );
}

export default App;
