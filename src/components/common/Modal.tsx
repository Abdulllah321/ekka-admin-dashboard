import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ModalProps {
  title: string; // Modal title
  children?: ReactNode; // Modal body content
  onSave?: () => void; // Optional save action
  saveButtonText?: string; // Text for the save button
  closeButtonText?: string; // Text for the close button
  show: boolean; // Control modal visibility
  onClose: () => void; // Function to close the modal
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onSave,
  saveButtonText = "Save changes",
  closeButtonText = "Close",
  show,
  onClose,
}) => {
  // Function to handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <>
      {show && (
        <motion.div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick} // Close modal when clicking outside
        >
          <motion.div
            className="modal-dialog"
            style={{
              background: "white",
              borderRadius: "8px",
              width: "500px",
              maxWidth: "90%",
              maxHeight: "90%",
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Modal Content */}
            <div
              className="modal-content"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Modal Header */}
              <div className="modal-header" style={{ padding: "1rem" }}>
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  className="close"
                  onClick={onClose}
                  style={{ border: "none", background: "transparent" }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {/* Modal Body */}
              <div
                className="modal-body"
                style={{
                  padding: "1rem",
                  overflowY: "auto", // Scrollable when content overflows
                  flex: 1,
                }}
              >
                {children}
              </div>
              {/* Modal Footer */}{" "}
              {onSave && (
                <div className="modal-footer" style={{ padding: "1rem" }}>
                  <button
                    type="button"
                    className="btn btn-secondary mr-2"
                    onClick={onClose}
                  >
                    {closeButtonText}
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onSave}
                  >
                    {saveButtonText}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
