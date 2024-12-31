import Layout from "../components/common/Layout";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteProduct, fetchProducts } from "../slices/productSlice";
import DataTable from "../constants/dataTablesUtils";
import Loader from "../components/common/Loader";
import NoDataFound from "../components/common/NoDataFound";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/common/Modal";
import { getImageUrl } from "../constants";

const ProductListPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isDelete, setIsDelete] = useState<string>();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (error) toast.error(error);

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
  if (!products.length)
    return (
      <Layout>
        <NoDataFound
          title="No Product Found"
          message="It seems like you haven't added any Products yet. Please add some to get started!"
        />
      </Layout>
    );

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
      <div className="content">
        <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
          <div>
            <h1>Product</h1>
            <p className="breadcrumbs">
              <span>
                <a href="index.html">Home</a>
              </span>
              <span>
                <i className="mdi mdi-chevron-right" />
              </span>
              Product
            </p>
          </div>
          <div>
            <Link to="/product-form" className="btn btn-primary">
              Add Product
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card card-default">
            <div className="card-body">
              <div className="table-responsive">
                <DataTable className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Purchased</th>
                      <th>Stock</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr>
                        <td>
                          <img
                            className="tbl-thumb"
                            src={getImageUrl(product.thumbnail)}
                            alt="Product Image"
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>
                          $
                          {product.discountPrice
                            ? product.discountPrice
                            : product.price}
                        </td>
                        <td>{product?.soldQuantity}</td>
                        <td>{product.stockQuantity}</td>
                        <td>{product.status.toUpperCase()}</td>
                        <td>
                          {product.createdAt &&
                            new Date(product.createdAt).toLocaleString()}
                        </td>
                        <td>
                          <div className="btn-group mb-1">
                            <Link
                              to={`/product-detail/${product?.slug}`}
                              className="btn btn-outline-success"
                            >
                              Info
                            </Link>
                            <button
                              type="button"
                              className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-display="static"
                            >
                              <span className="sr-only">Info</span>
                            </button>
                            <div className="dropdown-menu">
                              <Link
                                className="dropdown-item"
                                to={`/product-form/${product?.slug}`}
                              >
                                Edit
                              </Link>
                              <button
                                type="button"
                                className="dropdown-item"
                                onClick={() => setIsDelete(product.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default ProductListPage;
