import { useState } from "react";
import { Order, OrderStatus, updateOrderStatus } from "../../slices/orderSlice";
import { AppDispatch } from "../../store";
import toast from "react-hot-toast";

const OrderStatusTd = ({
  order,
  dispatch,
}: {
  order: Order;
  dispatch: AppDispatch;
}) => {
  const [isStatusEdit, setIsStatusEdit] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(order.status!);

  const getBadgeColor = (status: OrderStatus): string => {
    switch (status) {
      case OrderStatus.pending:
        return "badge-warning";
      case OrderStatus.processing:
        return "badge-info";
      case OrderStatus.outForDelivery:
        return "badge-primary";
      case OrderStatus.shipped:
        return "badge-secondary";
      case OrderStatus.delivered:
        return "badge-success";
      case OrderStatus.cancelled:
        return "badge-danger";
      default:
        return "badge-light";
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    try {
      await dispatch(updateOrderStatus({orderId, status: newStatus}))
    } catch (error) {
      console.error("Failed to update order status", error);
      toast.error("Failed to update order status"); 
    }
  };

  return (
    <td onDoubleClick={() => setIsStatusEdit(true)}>
      <span className={`mb-2 mr-2 badge ${getBadgeColor(order.status!)}`}>
        {isStatusEdit ? (
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value as OrderStatus)}
            onBlur={() => {
              handleUpdateOrderStatus(order.id!, orderStatus);
              setIsStatusEdit(false);
            }}
            autoFocus
          >
            <option value={OrderStatus.pending}>Pending</option>
            <option value={OrderStatus.processing}>Processing</option>
            <option value={OrderStatus.outForDelivery}>Out for Delivery</option>
            <option value={OrderStatus.shipped}>Shipped</option>
            <option value={OrderStatus.delivered}>Delivered</option>
          </select>
        ) : (
          order.status
        )}
      </span>
    </td>
  );
};

export default OrderStatusTd;
