import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/common/Layout";
import DataTable from "../constants/dataTablesUtils";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import {
  getAllOrders,
  OrderStatus,
  updateOrderStatus,
} from "../slices/orderSlice";
import { getImageUrl } from "../constants";
import Loader from "../components/common/Loader";
import OrderStatusTd from "../components/order/OrderStatusTd";
import { Link, useNavigate } from "react-router";

const OrdersPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { orders, error, loading } = useSelector(
    (state: RootState) => state.orders
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (loading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <div>Error: {error}</div>
      </Layout>
    );

  return (
    <Layout>
      <div className="breadcrumb-wrapper breadcrumb-wrapper-2">
        <h1>Orders</h1>
        <p className="breadcrumbs">
          <span>
            <a href="index.html">Home</a>
          </span>
          <span>
            <i className="mdi mdi-chevron-right" />
          </span>
          Orders
        </p>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card card-default">
            <div className="card-body">
              <div className="table-responsive">
                <DataTable className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item</th>
                      <th>Name</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Price</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr className="border" key={order.id}>
                        <td>{order.id?.slice(0, 5) + "..."}</td>
                        <td>
                          {order?.orderItems?.map((orderItem) => (
                            <img
                              className="product-img tbl-img"
                              src={getImageUrl(orderItem?.product?.thumbnail!)}
                              alt="product"
                            />
                          ))}
                        </td>
                        <td>
                          {order?.orderItems?.map((orderItem) => (
                            <>{orderItem.product?.name}, </>
                          ))}
                        </td>
                        <td>
                          <strong>
                            {order.selectedAddress?.firstName +
                              " " +
                              order.selectedAddress?.lastName}
                          </strong>
                          <br />
                          {order.selectedAddress?.street}
                        </td>
                        <td>{order.orderItems?.length}</td>
                        <td>${order.totalAmount}</td>
                        <td>{order.isPaid ? "PAID" : "UNPAID"}</td>
                        <OrderStatusTd order={order} dispatch={dispatch} />
                        <td>
                          {new Date(order.createdAt!)?.toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </td>
                        <td>
                          <div className="btn-group mb-1">
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              onClick={() => navigate(`/order/${order.id}`)}
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
                              <Link
                                to={`/order/${order.id}`}
                                className="dropdown-item"
                              >
                                Detail
                              </Link>
                              <span
                                className="dropdown-item"
                                onClick={async () => {
                                  const confirmDelete = window.confirm(
                                    "Are you sure you want to cancel this order?"
                                  );
                                  if (confirmDelete) {
                                    dispatch(
                                      updateOrderStatus({
                                        orderId: order.id!,
                                        status: OrderStatus.cancelled,
                                      })
                                    );
                                  }
                                }}
                              >
                                Cancel
                              </span>
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
    </Layout>
  );
};

export default OrdersPage;
