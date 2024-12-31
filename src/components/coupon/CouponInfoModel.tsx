import { motion } from "framer-motion";

type DiscountType = "percentage" | "fixed";

type Coupon = {
  id: string;
  code: string;
  description?: string;
  discountAmount: number;
  discountType: DiscountType;
  startDate: Date;
  endDate: Date;
  status: "active" | "inactive" | "expired";
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
};

type Props = {
  selectedCoupon: Coupon;
  closeModal: () => void;
};

const CouponInfoModel = ({ selectedCoupon, closeModal }: Props) => {
  const {
    code,
    description,
    discountAmount,
    discountType,
    startDate,
    endDate,
    status,

    imageUrl,
  } = selectedCoupon;

  return (
    <motion.div
      className="modal fade show"
      tabIndex={-1}
      aria-labelledby="couponModalLabel"
      aria-hidden="true"
      style={{
        display: "block",
        position: "fixed",
        inset: 0,
        zIndex: 1050,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      exit={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="couponModalLabel">
              Coupon Details
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {imageUrl && (
                <div className="col-md-4">
                  <img src={imageUrl} alt={code} className="img-fluid" />
                </div>
              )}
              <div className="col-md-8">
                <div className="mb-3">
                  <p>
                    <strong className="text-dark">Code:</strong>{" "}
                    <span>{code}</span>
                  </p>
                </div>
                <div className="mb-3">
                  <p>
                    <strong className="text-dark">Discount Amount:</strong>{" "}
                    <span>{discountAmount}</span>
                  </p>
                </div>
                <div className="mb-3">
                  <p>
                    <strong className="text-dark">Discount Type:</strong>{" "}
                    <span>{discountType}</span>
                  </p>
                </div>
                <div className="mb-3">
                  <p>
                    <strong className="text-dark">Status:</strong>{" "}
                    <span
                      className={`badge ${
                        status === "active"
                          ? "bg-success"
                          : status === "inactive"
                            ? "bg-warning"
                            : "bg-danger"
                      }`}
                    >
                      {status.toUpperCase()}
                    </span>
                  </p>
                </div>
                <div className="mb-3">
                  <p>
                    <strong className="text-dark">Start Date:</strong>{" "}
                    <span>{new Date(startDate).toLocaleString()}</span>
                  </p>
                </div>
                <div className="mb-3">
                  <p>
                    <strong className="text-dark">End Date:</strong>{" "}
                    <span>{new Date(endDate).toLocaleString()}</span>
                  </p>
                </div>
              </div>
              {description && (
                <div className="mb-3">
                  <p>
                    <strong className="text-dark">Description:</strong>{" "}
                    <span>{description}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CouponInfoModel;
