import { motion } from "framer-motion";
import NoImageFound from "../../assets/img/not-image.png";
import { getImageUrl } from "../../constants";

type Props = {
  selectedCategory: any;
  closeModal: () => void;
};
const CategoryInfoModel = ({ selectedCategory, closeModal }: Props) => {
  return (
    <motion.div
      className="modal fade show"
      tabIndex={-1}
      aria-labelledby="categoryModalLabel"
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
            <h5 className="modal-title" id="categoryModalLabel">
              {selectedCategory.name} Details
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
              {" "}
              <div className="col-md-5">
                <img
                  src={getImageUrl(selectedCategory.imageUrl!) || NoImageFound}
                  alt={selectedCategory.name}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-7">
                <div className="mb-3">
                  <p>
                    <strong className="text-dark">Slug:</strong>{" "}
                    <span>{selectedCategory.slug}</span>
                  </p>
                </div>

                <div className="mb-3">
                  <p>
                    <strong className="text-dark">Status:</strong>{" "}
                    <span
                      className={`badge ${selectedCategory.status === "active" ? "bg-success" : "bg-danger"}`}
                    >
                      {selectedCategory.status.toUpperCase()}
                    </span>
                  </p>
                </div>
                <div className="mb-3">
                  <p>
                    <strong className="text-dark">Created At:</strong>{" "}
                    <span>
                      {new Date(selectedCategory.createdAt).toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="mb-3">
                  <p>
                    <strong className="text-dark">Updated At:</strong>{" "}
                    <span>
                      {new Date(selectedCategory.updatedAt).toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="mb-3">
                  <p className="d-flex ">
                    <strong className="text-dark">Category:</strong>

                    <span className="badge bg-primary ml-2">
                      {selectedCategory.mainCategory.name}
                    </span>
                  </p>
                </div>
              </div>
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

export default CategoryInfoModel;
