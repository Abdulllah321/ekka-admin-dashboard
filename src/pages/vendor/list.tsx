import { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import axios from "axios";
import { Store } from "../../utils/types";
import VendorCards from "../../components/Store/VendorCard";

const List = () => {
  const [vendors, setVendors] = useState<Store[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Store | null>(null);

  const fetchVendors = async () => {
    const response = await axios.get("/stores");
    setVendors(response.data.data);
  };
  useEffect(() => {
    fetchVendors();
  }, []);

  const handleViewDetails = (vendor: Store) => {
    setSelectedVendor(vendor);
  };

  return (
    <Layout>
      <div className="ec-content-wrapper ec-vendor-wrapper">
        <div className="content">
          <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
            <div>
              <h1>Vendor Card</h1>
              <p className="breadcrumbs">
                <span>
                  <a href="index.html">Home</a>
                </span>
                <span>
                  <i className="mdi mdi-chevron-right" />
                </span>{" "}
                Vendor
              </p>
            </div>
          </div>
          <div className="card card-default p-4 ec-card-space">
            <VendorCards
              setSelectedVendor={setSelectedVendor}
              vendors={vendors}
            />
          </div>
          {/* Dynamic Contact Modal */}
          <div
            className="modal fade"
            id="modal-contact"
            tabIndex={-1}
            role="dialog"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header justify-content-end border-bottom-0">
                  <button
                    type="button"
                    className="btn-close-icon"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="mdi mdi-close" />
                  </button>
                </div>
                {selectedVendor && (
                  <div className="modal-body pt-0">
                    <div className="row no-gutters">
                      <div className="col-md-6">
                        <div className="profile-content-left px-4">
                          <div className="text-center widget-profile px-0 border-0">
                            <div className="card-img mx-auto rounded-circle">
                              <img
                                src={selectedVendor.logo}
                                alt={selectedVendor.name}
                              />
                            </div>
                            <div className="card-body">
                              <h4 className="py-2 text-dark">
                                {selectedVendor.name}
                              </h4>
                              <p>{selectedVendor.contactEmail}</p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="text-center pb-4">
                              <h6 className="text-dark pb-2">
                                {selectedVendor.products.length}
                              </h6>
                              <p>Items</p>
                            </div>
                            <div className="text-center pb-4">
                              <h6 className="text-dark pb-2">
                                {selectedVendor.rating}
                              </h6>
                              <p>Rating</p>
                            </div>
                            <div className="text-center pb-4">
                              <h6 className="text-dark pb-2">
                                {selectedVendor.reviewsCount}
                              </h6>
                              <p>Reviews</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="contact-info px-4">
                          <h4 className="text-dark mb-1">Contact Details</h4>
                          <p className="text-dark font-weight-medium pt-3 mb-2">
                            Email address
                          </p>
                          <p>{selectedVendor.contactEmail}</p>
                          <p className="text-dark font-weight-medium pt-3 mb-2">
                            Phone Number
                          </p>
                          <p>{selectedVendor.contactPhone}</p>
                          <p className="text-dark font-weight-medium pt-3 mb-2">
                            Address
                          </p>
                          <p>{selectedVendor.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default List;
