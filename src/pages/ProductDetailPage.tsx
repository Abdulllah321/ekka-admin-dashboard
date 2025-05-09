import { useEffect } from "react";
import Layout from "../components/common/Layout";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../components/common/Loader";
import { fetchProductBySlug } from "../slices/productSlice";
import NoDataFound from "../components/common/NoDataFound";
import "../assets/plugins/jquery-zoom/jquery.zoom.min.js";

import "swiper/css";
import "swiper/css/navigation";
import ProductImageSliders from "../components/products/ProductImageSliders.js";
import { getImageUrl } from "../constants/index.js";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const { productDetails, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductBySlug(slug!));
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

  if (!productDetails)
    return (
      <Layout>
        <NoDataFound title="No Product Found" />
      </Layout>
    );

  return (
    <Layout>
      <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
        <div>
          <h1>Product Detail</h1>
          <p className="breadcrumbs">
            <span>
              <Link to={`/`}>Home</Link>
            </span>
            <span>
              <i className="mdi mdi-chevron-right" />
            </span>
            Product
          </p>
        </div>
        <div>
          <Link to={"/product-form/" + slug} className="btn btn-primary">
            {" "}
            Edit
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card card-default">
            <div className="card-header card-header-border-bottom">
              <h2>Product Detail</h2>
            </div>
            <div className="card-body product-detail">
              <div className="row">
                <div className="col-xl-4 col-lg-6">
                  <div className="row">
                    <div className="single-pro-img">
                      <ProductImageSliders productDetails={productDetails} />
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-6">
                  <div className="row product-overview">
                    <div className="col-12">
                      <h5 className="product-title">{productDetails.name}</h5>
                      <p className="product-rate">
                        <i className="mdi mdi-star is-rated" />
                        <i className="mdi mdi-star is-rated" />
                        <i className="mdi mdi-star is-rated" />
                        <i className="mdi mdi-star is-rated" />
                        <i className="mdi mdi-star" />
                      </p>
                      <p className="product-desc">{productDetails.shortDesc}</p>
                      {/* Todo: This might be dynamic */}
                      <div className="ec-ofr">
                        <h6>Available offers</h6>
                        <ul>
                          <li>
                            <b>Special Price :</b> Get extra 16% off (price
                            inclusive of discount) <a href="#">T&amp;C</a>{" "}
                          </li>
                          <li>
                            <b>Bank Offer :</b> 10% off on XYZ Bank Cards, up to
                            $12. On orders of $200 and above{" "}
                            <a href="#">T&amp;C</a>
                          </li>
                          <li>
                            <b>Bank Offer :</b> 5% Unlimited Cashback on
                            Vastrafit XYZ Bank Credit Card{" "}
                            <a href="#">T&amp;C</a>
                          </li>
                          <li>
                            <b>Bank Offer :</b> Flat $50 off on first Vastrafit
                            Pay Later order of $200 and above{" "}
                            <a href="#">T&amp;C</a>
                          </li>
                        </ul>
                      </div>
                      <p className="product-price">
                        Price: $
                        {productDetails.discountPrice
                          ? productDetails.discountPrice
                          : productDetails.price}
                      </p>
                      <ul className="product-size">
                        {productDetails.sizes &&
                          productDetails.sizes.map((size) => (
                            <li className="size">
                              <span>{size}</span>
                            </li>
                          ))}
                      </ul>
                      {productDetails.colors?.length ? (
                        <ul className="product-color">
                          {productDetails.colors.map((color) => (
                            <li className="color">
                              <span style={{ backgroundColor: color }} />
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {productDetails?.productTags?.length ? (
                        <div className="product-stock">
                          {productDetails.productTags.map((tag) => (
                            <div className="stock">
                              <p className="title">{tag}</p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {productDetails.store && (
                  <div className="col-xl-3 col-lg-12 u-card">
                    <div className="card card-default seller-card">
                      <div className="card-body text-center">
                        <a
                          href="javascript:0"
                          className="text-secondary d-inline-block"
                        >
                          <div className="image mb-3">
                            <img
                              src={getImageUrl(
                                productDetails.store?.logo || "default-logo.jpg"
                              )} // Fallback for missing logo
                              className="img-fluid rounded-circle"
                              alt={`${productDetails.store?.name}'s Logo`}
                            />
                          </div>
                          <h5 className="text-dark">
                            {productDetails.store?.name}
                          </h5>
                          <p className="product-rate">
                            {[...Array(5)].map((_, index) => (
                              <i
                                key={index}
                                className={`mdi mdi-star ${index < (productDetails.store?.rating || 0) ? "is-rated" : ""}`}
                              />
                            ))}
                          </p>
                          <ul className="list-unstyled">
                            {productDetails.store?.address && (
                              <li className="d-flex mb-1">
                                <i className="mdi mdi-map mr-1" />
                                <span>{productDetails.store?.address}</span>
                              </li>
                            )}
                            <li className="d-flex mb-1">
                              <i className="mdi mdi-email mr-1" />
                              <span>{productDetails.store?.contactEmail}</span>
                            </li>
                            {productDetails.store?.contactPhone && (
                              <li className="d-flex">
                                <i className="mdi mdi-whatsapp mr-1" />
                                <span>
                                  {productDetails.store?.contactPhone}
                                </span>
                              </li>
                            )}
                          </ul>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="row review-rating mt-4">
                <div className="col-12">
                  <ul className="nav nav-tabs" id="myRatingTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="product-detail-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#productdetail"
                        href="#productdetail"
                        role="tab"
                        aria-selected="true"
                      >
                        <i className="mdi mdi-library-books mr-1" /> Detail
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="product-information-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#productinformation"
                        href="#productinformation"
                        role="tab"
                        aria-selected="false"
                      >
                        <i className="mdi mdi-information mr-1" />
                        Info
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="product-reviews-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#productreviews"
                        href="#productreviews"
                        role="tab"
                        aria-selected="false"
                      >
                        <i className="mdi mdi-star-half mr-1" /> Reviews
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent2">
                    <div
                      className="tab-pane pt-3 fade show active"
                      id="productdetail"
                      role="tabpanel"
                    >
                      <p>{productDetails.description}</p>
                    </div>
                    <div
                      className="tab-pane pt-3 fade"
                      id="productinformation"
                      role="tabpanel"
                    >
                      <ul>
                        {productDetails.weight ? (
                          <li>
                            <span>Weight</span> {productDetails.weight} g
                          </li>
                        ) : null}
                        {productDetails.dimensions ? (
                          <li>
                            <span>Dimensions</span> {productDetails.dimensions}
                          </li>
                        ) : null}
                      </ul>
                    </div>
                    <div
                      className="tab-pane pt-3 fade"
                      id="productreviews"
                      role="tabpanel"
                    >
                      <div className="ec-t-review-wrapper">
                        {productDetails?.reviews &&
                        productDetails.reviews.length > 0 ? (
                          productDetails.reviews.map((review) => (
                            <div className="ec-t-review-item" key={review.id}>
                              <div className="ec-t-review-avtar">
                                <img
                                  src={getImageUrl(
                                    review.user?.profileImage ||
                                      "default-avatar.jpg"
                                  )} // Fallback for missing profile image
                                  alt={`${review.user?.firstName || "User"}'s Avatar`}
                                />
                              </div>
                              <div className="ec-t-review-content">
                                <div className="ec-t-review-top">
                                  <p className="ec-t-review-name">
                                    {review.user
                                      ? `${review.user.firstName || ""} ${review.user.lastName || ""}`
                                      : "Anonymous"}
                                  </p>
                                  <div className="ec-t-rate">
                                    {[...Array(5)].map((_, index) => (
                                      <i
                                        key={index}
                                        className={`mdi mdi-star ${
                                          index < (review.rating || 0)
                                            ? "is-rated"
                                            : ""
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className="ec-t-review-bottom">
                                  <p>
                                    {review.comment || "No comment provided."}
                                  </p>
                                  {review.createdAt && (
                                    <small className="text-muted">
                                      Reviewed on:{" "}
                                      {new Date(
                                        review.createdAt
                                      ).toLocaleDateString()}
                                    </small>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-muted mt-3">
                            <p>No reviews available for this product yet.</p>
                          </div>
                        )}
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

export default ProductDetailPage;
