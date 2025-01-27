import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/common/Layout";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { getOrderById, OrderStatus } from "../slices/orderSlice";
import { useParams } from "react-router";
import Loader from "../components/common/Loader";
import NoDataFound from "../components/common/NoDataFound";
import { getImageUrl, getPrice } from "../constants";

const OrderDetailPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams() as { id: string };
  const { currentOrder, loading } = useSelector(
    (state: RootState) => state.orders
  );


  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch]);

  if (loading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  if (!currentOrder)
    return (
      <Layout>
        <NoDataFound
          title="Order not found"
          message="No order found with the provided ID."
          buttonLink="/orders"
          buttonText="Go to Orders"
        />
      </Layout>
    );

  return (
    <Layout>
      <div className="breadcrumb-wrapper breadcrumb-wrapper-2">
        <h1>Order Detail</h1>
        <p className="breadcrumbs">
          <span>
            <Link to={`/`}>Home</Link>
          </span>
          <span>
            <i className="mdi mdi-chevron-right" />
          </span>
          Orders
        </p>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="ec-odr-dtl card card-default">
            <div className="card-header card-header-border-bottom d-flex justify-content-between">
              <h2 className="ec-odr">
                Order Detail
                <br />
                <span className="small">Order ID: #{currentOrder?.id}</span>
              </h2>
            </div>
            <div className="card-body">
              <div className="row" style={{ rowGap: "1rem" }}>
                <div className="col-xl-3 col-lg-6">
                  <address className="info-grid">
                    <div className="info-title">
                      <strong>Customer:</strong>
                    </div>
                    <br />
                    <div className="info-content">
                      {currentOrder?.user?.firstName}{" "}
                      {currentOrder?.user?.lastName}
                      <br />
                      {currentOrder.user?.email}
                      <br />
                      <abbr title="Phone">Phone: </abbr>
                      {currentOrder.user?.phoneNumber}
                    </div>
                  </address>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <address className="info-grid">
                    <div className="info-title">
                      <strong>Shipped To:</strong>
                    </div>
                    <br />
                    <div className="info-content">
                      <span
                        className="badge badge-primary"
                        style={{
                          float: "right",
                        }}
                      >
                        {currentOrder.selectedAddress?.addressType}
                      </span>
                      {currentOrder.selectedAddress?.firstName}{" "}
                      {currentOrder.selectedAddress?.lastName}
                      <br />
                      {currentOrder.selectedAddress?.street},{" "}
                      {currentOrder.selectedAddress?.city},{" "}
                      {currentOrder.selectedAddress?.state},{" "}
                      {currentOrder.selectedAddress?.postalCode},{" "}
                      {currentOrder.selectedAddress?.country}
                    </div>
                  </address>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <address className="info-grid">
                    <div className="info-title">
                      <strong>Payment Method:</strong>
                    </div>
                    <br />
                    <div className="info-content">
                      {currentOrder.selectedPaymentMethod}
                    </div>
                  </address>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <address className="info-grid">
                    <div className="info-title">
                      <strong>Order Date:</strong>
                    </div>
                    <br />
                    <div className="info-content">
                      {new Date(currentOrder.createdAt!)?.toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </div>
                  </address>
                </div>

                {currentOrder.orderComment && (
                  <div className="col-xl-3 col-lg-6">
                    <address className="info-grid">
                      <div className="info-title">
                        <strong>Extra Message:</strong>
                      </div>
                      <br />
                      <div className="info-content">
                        {currentOrder.orderComment}
                      </div>
                    </address>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h3 className="tbl-title">PRODUCT SUMMARY</h3>
                  <div className="table-responsive">
                    <table className="table table-striped o-tbl">
                      <thead>
                        <tr className="line">
                          <td>
                            <strong>#</strong>
                          </td>
                          <td className="text-center">
                            <strong>IMAGE</strong>
                          </td>
                          <td className="text-center">
                            <strong>PRODUCT</strong>
                          </td>
                          <td className="text-center">
                            <strong>PRICE/UNIT</strong>
                          </td>
                          <td className="text-right">
                            <strong>QUANTITY</strong>
                          </td>
                          <td className="text-right">
                            <strong>SUBTOTAL</strong>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {currentOrder.orderItems?.map((order, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                className="product-img"
                                src={getImageUrl(order.product?.thumbnail!)}
                                alt=""
                              />
                            </td>
                            <td>
                              <strong>{order.product?.name}</strong>
                              <br />
                              {order.product?.shortDesc}
                            </td>
                            <td className="text-center">
                              ${getPrice(order.product!)}
                            </td>
                            <td className="text-center">{order.quantity}</td>
                            <td className="text-right">${order.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Tracking Detail */}
          <div className="card mt-4 trk-order">
            <div className="p-4 text-center text-white text-lg bg-dark rounded-top">
              <span className="text-uppercase">Tracking Order No - </span>
              <span className="text-medium">{currentOrder.id}</span>
            </div>
            <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
              <div className="w-100 text-center py-1 px-2">
                <span className="text-medium">Status:</span>
                {currentOrder.status?.toUpperCase()}
              </div>
              <div className="w-100 text-center py-1 px-2">
                <span className="text-medium">Expected Date:</span>{" "}
                {new Date(
                  currentOrder.expectedDeliveryDate!
                )?.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <div className="card-body">
              <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                {[
                  OrderStatus.pending,
                  OrderStatus.processing,
                  OrderStatus.outForDelivery,
                  OrderStatus.shipped,
                  OrderStatus.delivered,
                ].map((status, index, statuses) => (
                  <div
                    key={status}
                    className={
                      "step " +
                      (statuses.indexOf(currentOrder.status!) >= index
                        ? "completed"
                        : "")
                    }
                  >
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        {status === OrderStatus.pending && (
                          <i className="mdi mdi-cart" />
                        )}
                        {status === OrderStatus.processing && (
                          <i className="mdi mdi-tumblr-reblog" />
                        )}
                        {status === OrderStatus.outForDelivery && (
                          <i className="mdi mdi-gift" />
                        )}
                        {status === OrderStatus.shipped && (
                          <i className="mdi mdi-truck-delivery" />
                        )}
                        {status === OrderStatus.delivered && (
                          <i className="mdi mdi-hail" />
                        )}
                      </div>
                    </div>
                    <h4 className="step-title">{status}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailPage;
