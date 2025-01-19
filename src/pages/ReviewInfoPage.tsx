import { useEffect } from "react";
import Layout from "../components/common/Layout";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchReviewById } from "../slices/reviewSlice";
import Loader from "../components/common/Loader";
import { useNavigate, useParams } from "react-router";
import { getImageUrl } from "../constants";

const ReviewInfoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { review, status } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewById(id as string));
    }
  }, [id, dispatch]);

  if (status === "loading")
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Loader />
      </div>
    );

  if (!review) return <p className="text-center mt-5">Review not found!</p>;

  return (
    <Layout>
      <div className="container py-5">
        <div className="card shadow-lg">
          <div className="card-header bg-primary ">
            <h2 className="text-center text-white">Review Details</h2>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Product Section */}
              <div className="col-md-4 text-center">
                <img
                  src={`${getImageUrl(review.product?.thumbnail!)}`}
                  alt={review.product?.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: "200px" }}
                />
                <h4 className="mt-3">{review.product?.name}</h4>
              </div>

              {/* User Section */}
              <div className="col-md-8">
                <img
                  src={`${getImageUrl(review.user?.profileImage!)}`}
                  alt={`${review.user?.firstName} ${review.user?.lastName}`}
                  className="rounded-circle me-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    border: "1px solid #8A909D",
                    marginBottom: 20,
                  }}
                />
                <h5 className="mb-3">
                  <strong style={{ color: "#000" }}>Writer:</strong>{" "}
                  {`${review.user?.firstName} ${review.user?.lastName}`}
                </h5>
                <div className="d-flex align-items-center mb-3">
                  <div>
                    <p className="mb-0">
                      <strong style={{ color: "#000" }}>Email:</strong>{" "}
                      {review.user?.email}
                    </p>
                  </div>
                </div>

                <h5 className="mb-3">
                  <strong style={{ color: "#000" }}>Rating:</strong>{" "}
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <i key={index} className="mdi mdi-star text-warning"></i>
                  ))}
                  {Array.from({ length: 5 - review.rating }).map((_, index) => (
                    <i
                      key={index}
                      className="mdi mdi-star-outline text-muted"
                    ></i>
                  ))}
                </h5>
                <p>
                  <strong style={{ color: "#000" }}>Comment:</strong>{" "}
                  {review.comment}
                </p>
                <p>
                  <strong style={{ color: "#000" }}>Date:</strong>{" "}
                  {new Date(review.createdAt!).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewInfoPage;
