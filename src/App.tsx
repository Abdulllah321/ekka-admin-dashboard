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
          <Route path="/product-detail/:id" element={<ProductDetailPage />} />
          <Route path="/coupons" element={<CouponsPage />} />
        </Routes>
      </Suspense>{" "}
    </div>
  );
}

export default App;
