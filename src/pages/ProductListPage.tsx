import { Link } from "react-router-dom";
import Layout from "../components/common/Layout";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../slices/productSlice";

const ProductListPage = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
              {" "}
              Add Porduct
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card card-default">
            <div className="card-body">
              <div className="table-responsive">
                <table
                  id="responsive-data-table"
                  className="table"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Offer</th>
                      <th>Purchased</th>
                      <th>Stock</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img
                          className="tbl-thumb"
                          src="assets/img/products/p1.jpg"
                          alt="Product Image"
                        />
                      </td>
                      <td>Baby shoes</td>
                      <td>$20</td>
                      <td>25% OFF</td>
                      <td>61</td>
                      <td>5421</td>
                      <td>ACTIVE</td>
                      <td>2021-10-30</td>
                      <td>
                        <div className="btn-group mb-1">
                          <button
                            type="button"
                            className="btn btn-outline-success"
                          >
                            Info
                          </button>
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
                            <a className="dropdown-item" href="#">
                              Edit
                            </a>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListPage;
