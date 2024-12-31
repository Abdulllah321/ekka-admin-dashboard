import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoupon,
  fetchCoupons,
} from "../../slices/couponSlice";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import NoDataFound from "../common/NoDataFound";
import { AnimatePresence } from "framer-motion"; // Import Framer Motion
import CouponInfoModel from "./CouponInfoModel";
import Modal from "../common/Modal";
import Form from "./CouponForm";
import DataTable from "../../constants/dataTablesUtils";

const CouponDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const { coupons, error, loading } = useSelector(
    (state: RootState) => state.coupons
  );

  const [selectedCoupon, setSelectedCoupon] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<string>();

  useEffect(() => {
    dispatch(fetchCoupons());
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

  if (!coupons.length)
    return (
      <NoDataFound
        title="No Coupons Found"
        message="It seems like you haven't added any coupons yet. Please add some to get started!"
      />
    );

  const handleInfoClick = (coupon: any) => {
    setIsEditing(false);
    setSelectedCoupon(coupon);
  };

  const closeModal = () => {
    setIsEditing(false);
    setSelectedCoupon(null);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    setSelectedCoupon(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCoupon(id));
      setIsDelete("");

      toast.success("Coupon Deleted Successfully");
    } catch (error) {
      toast.error("Failed to delete coupon");
    }
  };

  return (
    <div className="col-xl-8 col-lg-12">
      <div className="ec-coupon-list card card-default">
        <div className="card-body">
          <div className="table-responsive">
            <DataTable className="table">
              <thead>
                <tr>
                  <th>S. no</th>
                  <th>Code</th>
                  <th>Description</th>
                  <th>Discount</th>
                  <th>Discount Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon, index) => (
                  <tr key={coupon.id}>
                    <td># {index + 1}</td>
                    <td>{coupon.code}</td>
                    <td>{coupon.description}</td>
                    <td>{coupon.discountAmount}</td>
                    <td>{coupon.discountType}</td>
                    <td>{new Date(coupon.startDate).toLocaleDateString()}</td>
                    <td>{new Date(coupon.endDate).toLocaleDateString()}</td>
                    <td>{coupon.status.toUpperCase()}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => handleInfoClick(coupon)}
                        >
                          Info
                        </button>{" "}
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
                          <span
                            className="dropdown-item"
                            onClick={() => {
                              setSelectedCoupon(coupon);
                              setIsEditing(true);
                            }}
                            data-toggle="modal"
                            data-target={`#${coupon.id}`}
                          >
                            Edit
                          </span>
                          <span
                            className="dropdown-item"
                            onClick={() => setIsDelete(coupon.id)}
                          >
                            Delete
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
      <AnimatePresence>
        {/* Modal for Coupon Details */}
        {selectedCoupon && !isEditing && (
          <CouponInfoModel
            selectedCoupon={selectedCoupon}
            closeModal={closeModal}
          />
        )}
        {selectedCoupon && isEditing && (
          <Modal title="Edit Coupon" show={isEditing} onClose={closeModal}>
            <Form
              isEditing={true}
              onSubmit={handleUpdate}
              couponData={selectedCoupon}
            />
          </Modal>
        )}
        {isDelete && (
          <Modal
            title="Delete Coupon"
            show={isDelete !== ""}
            onClose={() => setIsDelete("")}
          >
            <div className="modal-body">
              Are you sure you want to delete this coupon?
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
    </div>
  );
};

export default CouponDetails;
