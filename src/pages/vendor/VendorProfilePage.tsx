import  { useEffect } from "react";
import Layout from "../../components/common/Layout";
import { Link, useParams } from "react-router";
import {  useAppDispatch, useAppSelector } from "../../store";
import { fetchStoreById } from "../../slices/storeSlice";
import { getImageUrl } from "../../constants";
import Loader from "../../components/common/Loader";
import { FaEye } from "react-icons/fa";

const VendorProfilePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { storeDetails, loading } = useAppSelector((state) => state.store);

  useEffect(() => {
    if (id) dispatch(fetchStoreById(id));
  }, [dispatch, id]);

  console.log(storeDetails);

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
  if (!storeDetails) return null;
  return (
    <Layout>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>Vendor Profile</h1>
            <p className="breadcrumbs">
              <span>
                <a href="index.html">Home</a>
              </span>
              <span>
                <i className="mdi mdi-chevron-right" />
              </span>
              Profile
            </p>
          </div>
          <div>
            <a href="vendor-list.html" className="btn btn-primary">
              Edit
            </a>
          </div>
        </div>
        <div className="card bg-white profile-content ec-vendor-profile">
          <div className="row">
            <div className="col-lg-4 col-xl-3">
              <div className="profile-content-left profile-left-spacing">
                <div className="ec-disp">
                  <div className="text-center widget-profile px-0 border-0">
                    <div className="card-img mx-auto rounded-circle">
                      <img
                        src={getImageUrl(storeDetails?.logo!)}
                        alt="Store logo"
                      />
                    </div>
                    <div className="card-body">
                      <h4 className="py-2 text-dark">{storeDetails?.name}</h4>
                      <p>{storeDetails?.contactEmail}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="text-center pb-4">
                      <h6 className="text-dark pb-2">
                        {storeDetails?.products?.length || 0}
                      </h6>
                      <p>Products</p>
                    </div>
                    <div className="text-center pb-4">
                      <h6 className="text-dark pb-2">
                        {storeDetails?.orders?.length || 0}
                      </h6>
                      <p>Orders</p>
                    </div>
                    <div className="text-center pb-4">
                      <h6 className="text-dark pb-2">
                        {storeDetails?.coupons?.length || 0}
                      </h6>
                      <p>Coupons</p>
                    </div>
                  </div>
                </div>
                <hr className="w-100" />
                <div className="contact-info pt-4">
                  <h5 className="text-dark">Contact Information</h5>
                  <p className="text-dark font-weight-medium pt-24px mb-2">
                    Email Address
                  </p>
                  <p>{storeDetails?.owner?.email || "N/A"}</p>
                  <p className="text-dark font-weight-medium pt-24px mb-2">
                    Phone Number
                  </p>
                  <p>{storeDetails?.contactPhone || "N/A"}</p>
                  <p className="text-dark font-weight-medium pt-24px mb-2">
                    Address
                  </p>
                  <p>{storeDetails?.address || "N/A"}</p>
                  <p className="text-dark font-weight-medium pt-24px mb-2">
                    Social Profile
                  </p>
                  <p className="social-button">
                    {storeDetails?.socialLinks?.facebook && (
                      <a
                        href={storeDetails.socialLinks.facebook}
                        className="mb-1 btn btn-outline btn-facebook rounded-circle"
                      >
                        <i className="mdi mdi-facebook" />
                      </a>
                    )}
                    {storeDetails?.socialLinks?.twitter && (
                      <a
                        href={storeDetails.socialLinks.twitter}
                        className="mb-1 btn btn-outline btn-twitter rounded-circle"
                      >
                        <i className="mdi mdi-twitter" />
                      </a>
                    )}
                    {storeDetails?.socialLinks?.linkedin && (
                      <a
                        href={storeDetails.socialLinks.linkedin}
                        className="mb-1 btn btn-outline btn-linkedin rounded-circle"
                      >
                        <i className="mdi mdi-linkedin" />
                      </a>
                    )}
                    {storeDetails?.socialLinks?.youtube && (
                      <a
                        href={storeDetails.socialLinks.youtube}
                        className="mb-1 btn btn-outline btn-youtube rounded-circle"
                      >
                        <i className="mdi mdi-youtube" />
                      </a>
                    )}
                  </p>
                </div>
                <hr className="w-100" />
                <div className="policies">
                  <h5 className="text-dark">Shipping Policies</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: storeDetails?.shippingPolicies || "Not available",
                    }}
                  />
                  <h5 className="text-dark pt-4">Return Policies</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: storeDetails?.returnPolicies || "Not available",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-xl-9">
              <div className="profile-content-right profile-right-spacing py-5">
                <ul
                  className="nav nav-tabs px-3 px-xl-5 nav-style-border"
                  id="myProfileTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="profile-tab"
                      storeDetails-bs-toggle="tab"
                      storeDetails-bs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="true"
                    >
                      Profile
                    </button>
                  </li>
                </ul>
                <div className="tab-content px-3 px-xl-5" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="tab-widget mt-5">
                      {/* Widgets Row */}
                      <div className="row">
                        {[
                          {
                            icon: "mdi-account-outline",
                            bgColor: "bg-primary",
                            count: storeDetails.rating,
                            label: "New Users",
                          },
                          {
                            icon: "mdi-cart-outline",
                            bgColor: "bg-warning",
                            count: storeDetails.orders.length || 0,
                            label: "Orders Placed",
                          },
                          {
                            icon: "mdi-diamond-stone",
                            bgColor: "bg-success",
                            count: `$${storeDetails.orders.reduce((sum, order) => sum + order.totalAmount, 0)}`,
                            label: "Total Sales",
                          },
                        ].map((widget, index) => (
                          <div className="col-xl-4" key={index}>
                            <div className="media widget-media p-3 bg-white border">
                              <div
                                className={`icon rounded-circle mr-3 ${widget.bgColor}`}
                              >
                                <i
                                  className={`mdi ${widget.icon} text-white`}
                                />
                              </div>
                              <div className="media-body align-self-center">
                                <h4 className="text-primary mb-2">
                                  {widget.count}
                                </h4>
                                <p>{widget.label}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Products Section */}
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="card card-default mb-24px">
                            <div className="card-header justify-content-between mb-1">
                              <h2>Products</h2>
                            </div>
                            <div className="card-body pt-0 pb-0 table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {storeDetails.products.length > 0 ? (
                                    storeDetails.products.map(
                                      (product, index) => (
                                        <tr key={index}>
                                          <td>{product.id}</td>
                                          <td>{product.name}</td>
                                          <td>
                                            {product.mainCategoryId || "N/A"}
                                          </td>
                                          <td>${product.price}</td>
                                          <td>{product.stockQuantity}</td>
                                          <td>
                                            <span
                                              className={`badge badge-${
                                                product.status === "active"
                                                  ? "success"
                                                  : "danger"
                                              }`}
                                            >
                                              {product.status}
                                            </span>
                                          </td>
                                          <td>
                                            <Link
                                              to={`/product-detail/${product.slug}`}
                                              className="btn btn-sm btn-primary btn-outline rounded-circle"
                                            >
                                              <FaEye />
                                            </Link>
                                          </td>
                                        </tr>
                                      )
                                    )
                                  ) : (
                                    <tr>
                                      <td colSpan={6} className="text-center">
                                        No products available
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recent Orders Section */}
                      <div className="row">
                        <div className="col-12 mb-24px">
                          <div
                            className="card card-default card-table-border-none ec-tbl"
                            id="recent-orders"
                          >
                            <div className="card-header justify-content-between">
                              <h2>Recent Orders</h2>
                            </div>
                            <div className="card-body pt-0 pb-0 table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Order ID</th>
                                    <th>Total Amount</th>
                                    <th>Payment Method</th>
                                    <th>Delivery Status</th>
                                    <th>Expected Delivery</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {storeDetails.orders.length > 0 ? (
                                    storeDetails.orders.map((order, index) => (
                                      <tr key={index}>
                                        <td>{order.id}</td>
                                        <td>${order.totalAmount}</td>
                                        <td>{order.selectedPaymentMethod}</td>
                                        <td>
                                          <span
                                            className={`badge badge-${
                                              order.status === "delivered"
                                                ? "success"
                                                : order.status === "pending"
                                                  ? "warning"
                                                  : "danger"
                                            }`}
                                          >
                                            {order.status}
                                          </span>
                                        </td>
                                        <td>
                                          {new Date(
                                            order.expectedDeliveryDate!
                                          ).toDateString()}
                                        </td>
                                        <td>
                                          <Link
                                            to={`/order/${order.id}`}
                                            className="btn btn-sm btn-primary btn-outline rounded-circle"
                                          >
                                            <FaEye />
                                          </Link>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan={5} className="text-center">
                                        No recent orders available
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Coupons Section */}
                      <div className="row">
                        <div className="col-12">
                          <div className="card card-default card-table-border-none ec-tbl">
                            <div className="card-header justify-content-between">
                              <h2>Coupons</h2>
                            </div>
                            <div className="card-body pt-0 pb-0 table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Coupon Code</th>
                                    <th>Discount</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {storeDetails.coupons.length > 0 ? (
                                    storeDetails.coupons.map(
                                      (coupon, index) => (
                                        <tr key={index}>
                                          <td>{coupon.code}</td>
                                          <td>
                                            {coupon.discountAmount}
                                            {coupon.discountType ===
                                            "percentage"
                                              ? "%"
                                              : "$"}
                                          </td>
                                          <td>
                                            {new Date(
                                              coupon.startDate
                                            ).toDateString()}
                                          </td>
                                          <td>
                                            {new Date(
                                              coupon.endDate
                                            ).toDateString()}
                                          </td>
                                          <td>
                                            <span
                                              className={`badge badge-${
                                                coupon.status === "active"
                                                  ? "success"
                                                  : "danger"
                                              }`}
                                            >
                                              {coupon.status}
                                            </span>
                                          </td>
                                        </tr>
                                      )
                                    )
                                  ) : (
                                    <tr>
                                      <td colSpan={5} className="text-center">
                                        No coupons available
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VendorProfilePage;
