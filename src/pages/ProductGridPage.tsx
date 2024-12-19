import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { deleteProduct, fetchProducts } from "../slices/productSlice";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import NoDataFound from "../components/common/NoDataFound";
import toast from "react-hot-toast";
import { IMAGE_BASE_URL } from "../constants";
import Image from "../assets/img/products/p1.jpg";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/common/Modal";

const ProductGridPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const navigate = useNavigate();

  const [isDelete, setIsDelete] = useState<string>();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle error
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Filter, sort, and paginate products
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "priceLowHigh") return a.price - b.price;
      if (sortBy === "priceHighLow") return b.price - a.price;
      if (a.createdAt && b.createdAt)
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      return 0;
    });

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Loader />
      </div>
    );
  }

  if (!products.length) {
    return (
      <Layout>
        <NoDataFound
          title="No Products Found"
          message="It seems like you haven't added any products yet. Please add some to get started!"
        />
      </Layout>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteProduct(id));
      setIsDelete("");
      toast.success("Category Deleted Successfully");
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <Layout>
      <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
        <div>
          <h1>Products</h1>
          <p className="breadcrumbs">
            <Link to="/">Home</Link> <span>&gt;</span> Products
          </p>
        </div>
        <Link to="/product-form" className="btn btn-primary">
          Add Product
        </Link>
      </div>
      <div className="card card-default">
        <div className="card-header d-flex justify-content-between">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="form-control w-25"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
        </div>

        <div className="card-body">
          <div className="row">
            {paginatedProducts.map((product) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
                <div className="card-wrapper">
                  <div className="card-container">
                    <div className="card-top">
                      <img
                        className="card-image"
                        src={IMAGE_BASE_URL + product.thumbnail || Image}
                        alt={product.name}
                      />
                    </div>
                    <div className="card-bottom">
                      <h3>{product.name}</h3>
                      <p>
                        $
                        {product.discountPrice
                          ? product.discountPrice
                          : product.price}
                      </p>
                    </div>
                    <div className="card-action">
                      <div
                        className="card-edit"
                        onClick={() => navigate(`/product-form/${product.id}`)}
                      >
                        <i className="mdi mdi-circle-edit-outline" />
                      </div>
                      <div
                        className="card-preview"
                        onClick={() =>
                          navigate(`/product-detail/${product.id}`)
                        }
                      >
                        <i className="mdi mdi-eye-outline" />
                      </div>
                      <div
                        className="card-remove"
                        onClick={() => setIsDelete(`${product.id}`)}
                      >
                        <i className="mdi mdi mdi-delete-outline" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <nav>
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <button className="page-link">Previous</button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  <button className="page-link">{i + 1}</button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <button className="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>{" "}
      <AnimatePresence>
        {isDelete && (
          <Modal
            title="Delete Product"
            show={isDelete !== ""}
            onClose={() => setIsDelete("")}
          >
            <div className="modal-body">
              Are you sure you want to delete this Product?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setIsDelete("")}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(isDelete)}
              >
                Delete
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ProductGridPage;
