import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMainCategory,
  fetchMainCategories,
} from "../../slices/categorySlice";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import NoDataFound from "../common/NoDataFound";
import { IMAGE_BASE_URL } from "../../constants";
import NoImageFound from "../../assets/img/not-image.png";
import { AnimatePresence } from "framer-motion"; // Import Framer Motion
import CategoryInfoModel from "./CategoryInfoModel";
import Modal from "../common/Modal";
import Form from "./CategoryForm";

const CategoryDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const { mainCategories, error, loading } = useSelector(
    (state: RootState) => state.categories
  );

  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<string>();

  useEffect(() => {
    dispatch(fetchMainCategories());
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

  if (!mainCategories.length)
    return (
      <NoDataFound
        title="No Categories Found"
        message="It seems like you haven't added any categories yet. Please add some to get started!"
      />
    );

  const handleInfoClick = (category: any) => {
    setIsEditing(false);
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setIsEditing(false);
    setSelectedCategory(null);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    setSelectedCategory(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteMainCategory(id));
      setIsDelete("");

      toast.success("Category Deleted Successfully");
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="col-xl-8 col-lg-12">
      <div className="ec-cat-list card card-default">
        <div className="card-body">
          <div className="table-responsive">
            <table id="responsive-data-table" className="table">
              <thead>
                <tr>
                  <th>S. no</th>
                  <th>Thumb</th>
                  <th>Name</th>
                  <th>Sub Categories</th>
                  <th>Product</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mainCategories.map((category, index) => (
                  <tr key={category.id}>
                    <td># {index + 1}</td>
                    <td>
                      <img
                        className="cat-thumb"
                        src={IMAGE_BASE_URL + category.imageUrl || NoImageFound}
                        alt="Category Image"
                      />
                    </td>
                    <td>{category.name}</td>
                    <td>
                      <span className="ec-sub-cat-list">
                        <span
                          className="ec-sub-cat-count"
                          title="Total Sub Categories"
                        >
                          {category?.subCategories?.length}
                        </span>
                        {category?.subCategories?.map((sub) => (
                          <span key={sub.id} className="ec-sub-cat-tag">
                            {sub.name}
                          </span>
                        ))}
                      </span>
                    </td>
                    <td>{category?._count?.products}</td>

                    <td>{category.status.toUpperCase()}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => handleInfoClick(category)}
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
                              setSelectedCategory(category);
                              setIsEditing(true);
                            }}
                            data-toggle="modal"
                            data-target={`#${category.id}`}
                          >
                            Edit
                          </span>
                          <span
                            className="dropdown-item"
                            onClick={() => setIsDelete(category.id)}
                          >
                            Delete
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {/* Modal for Category Details */}
        {selectedCategory && !isEditing && (
          <CategoryInfoModel
            selectedCategory={selectedCategory}
            closeModal={closeModal}
          />
        )}
        {selectedCategory && isEditing && (
          <Modal title="Edit Category" show={isEditing} onClose={closeModal}>
            <Form
              isEditing={true}
              onSubmit={handleUpdate}
              categoryData={selectedCategory}
            />
          </Modal>
        )}
        {isDelete && (
          <Modal
            title="Delete Category"
            show={isDelete !== ""}
            onClose={() => setIsDelete("")}
          >
            <div className="modal-body">
              Are you sure you want to delete this category?
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

export default CategoryDetails;
