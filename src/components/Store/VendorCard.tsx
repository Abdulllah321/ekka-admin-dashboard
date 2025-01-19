import React from "react";
import { Store } from "../../utils/types";
import { getImageUrl } from "../../constants";
import { Link } from "react-router";

const VendorCards = ({
  vendors,
  setSelectedVendor,
}: {
  vendors: Store[];
  setSelectedVendor: React.Dispatch<React.SetStateAction<Store | null>>;
}) => {
  const handleViewDetails = (vendor: Store) => {
    setSelectedVendor(vendor);
  };

  return (
    <div className="ec-vendor-card mt-m-24px row">
      {vendors.map((vendor) => (
        <div key={vendor.id} className="col-lg-6 col-xl-4 col-xxl-3">
          <div className="card card-default mt-24px">
            <a
              href="javascript:void(0)"
              data-bs-toggle="modal"
              data-bs-target="#modal-contact"
              className="view-detail"
              onClick={() => handleViewDetails(vendor)}
            >
              <i className="mdi mdi-eye-plus-outline" />
            </a>
            <div className="vendor-info card-body text-center p-4">
              <a
                href="javascript:void(0)"
                className="text-secondary d-inline-block mb-3"
              >
                <Link to={`/vendors/${vendor.id}`} className="image mb-3">
                  <img
                    src={getImageUrl(vendor.logo!)}
                    className="img-fluid rounded-circle"
                    alt={`${vendor.name} Logo`}
                  />
                </Link>
                <Link to={`/vendors/${vendor.id}`}>
                  <h5 className="card-title text-dark">{vendor.name}</h5>
                </Link>
                <ul className="list-unstyled">
                  <li className="d-flex mb-1 text-center">
                    <i className="mdi mdi-cellphone-basic mr-1" />
                    <span>{vendor.contactPhone}</span>
                  </li>
                  <li className="d-flex">
                    <i className="mdi mdi-email mr-1 text-center" />
                    <span>{vendor.contactEmail}</span>
                  </li>
                </ul>
              </a>
              <div className="row justify-content-center ec-vendor-detail">
                <div className="col-4">
                  <h6 className="text-uppercase">Products</h6>
                  <h5>{vendor.products.length}</h5>
                </div>
                <div className="col-4">
                  <h6 className="text-uppercase">Orders</h6>
                  <h5>{vendor.orders.length}</h5>
                </div>
                <div className="col-4">
                  <h6 className="text-uppercase">Coupons</h6>
                  <h5>{vendor.coupons.length}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VendorCards;
