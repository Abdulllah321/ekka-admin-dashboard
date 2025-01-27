import { useEffect } from "react";
import Layout from "../components/common/Layout";
import DataTable from "../constants/dataTablesUtils";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchAllReviews } from "../slices/reviewSlice";
import { getImageUrl } from "../constants";
import Loader from "../components/common/Loader";
import { Link, useNavigate } from "react-router";

const ReviewsPage = () => {
  const dispatch = useAppDispatch();
  const { reviews, status } = useAppSelector((state) => state.reviews);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  if (status === "loading")
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

  const handleInfoClick = (id: string) => {
    navigate(`/review-info/${id}`);
  };
  console.log(reviews);
  return (
    <Layout>
      <>
        <div className="breadcrumb-wrapper breadcrumb-wrapper-2 d-flex align-items-center justify-content-between">
          <h1>Reviews</h1>
          <p className="breadcrumbs">
            <span>
              <Link to={`/`}>Home</Link>
            </span>
            <span>
              <i className="mdi mdi-chevron-right" />
            </span>
            Reviews
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
                        <th>Product</th>
                        <th>Name</th>
                        <th>Profile</th>
                        <th>Vendor</th>
                        <th>Ratings</th>
                        <th>Comment</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews?.map((review) => (
                        <tr key={review.id}>
                          <td>
                            <img
                              className="tbl-thumb"
                              src={getImageUrl(review.product?.thumbnail!)}
                              alt={review?.product?.name}
                            />
                          </td>
                          <td>{review?.product?.name}</td>
                          <td>
                            <img
                              className="tbl-thumb"
                              src={getImageUrl(review?.user?.profileImage!)}
                              alt={`${review?.user?.firstName} ${review?.user?.lastName}`}
                            />
                          </td>
                          <td>
                            {`${review?.user?.firstName} ${review?.user?.lastName}`}
                          </td>
                          <td>
                            <div className="ec-t-rate">
                              {Array.from({ length: review.rating }).map(
                                (_, index) => (
                                  <i
                                    key={index}
                                    className="mdi mdi-star is-rated"
                                  />
                                )
                              )}
                              {Array.from({ length: 5 - review.rating }).map(
                                (_, index) => (
                                  <i
                                    key={index}
                                    className="mdi mdi-star-outline"
                                  />
                                )
                              )}
                            </div>
                          </td>
                          <td>{review.comment}</td>
                          <td>
                            {new Date(review.createdAt!).toLocaleDateString()}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              onClick={() => handleInfoClick(review.id)}
                            >
                              Info
                            </button>
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
      </>
    </Layout>
  );
};

export default ReviewsPage;
