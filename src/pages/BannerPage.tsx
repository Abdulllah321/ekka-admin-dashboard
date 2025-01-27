import { ChangeEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/common/Layout";
import { AppDispatch, RootState } from "../store";
import {
  Banner,
  createBanner,
  deleteBanner,
  fetchBanners,
  updateBanner,
} from "../slices/bannerSlice";
import Loader from "../components/common/Loader";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../components/common/Modal";
import ImageUpload from "../components/common/ImageUpload";
import { Link } from "react-router";
import EditSvg from "../assets/img/icons/edit.svg";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { getImageUrl } from "../constants";

const BannerPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { banners, loading } = useSelector((state: RootState) => state.banners);
  const [isForm, setIsForm] = useState<boolean | string>(false);
  const [formData, setFormData] = useState<Banner>({
    id: "",
    title: "",
    subtitle: "",
    image: "",
    animation: "",
    discount: "",
    buttonText: "",
    buttonUrl: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isDelete, setIsDelete] = useState<string>();

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  useEffect(() => {
    if (typeof isForm === "string") {
      const filteredBanner = banners.find((banner) => banner.id === isForm);
      console.log(filteredBanner);
      setFormData(filteredBanner!);
    }
  }, [isForm]);
  console.log(isForm);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors for the current field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!formData.subtitle.trim()) {
      newErrors.subtitle = "Sub Title is required.";
    }
    if (!formData.discount.trim()) {
      newErrors.discount = "Discount Text is required.";
    }
    if (!formData.buttonText.trim()) {
      newErrors.buttonText = "Button Text is required.";
    }
    if (!formData.buttonUrl.trim()) {
      newErrors.buttonUrl = "Button URL is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteBanner(id));
      setIsDelete("");

      toast.success("Category Deleted Successfully");
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };
  return (
    <Layout>
      <div className="content">
        <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
          <div>
            <h1>Banner</h1>
            <p className="breadcrumbs">
              <span>
                <Link to={`/`}>Home</Link>
              </span>
              <span>
                <i className="mdi mdi-chevron-right" />
              </span>
              Banner
            </p>
          </div>
          <div>
            <button className="btn btn-primary" onClick={() => setIsForm(true)}>
              Add Banner
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <section className="ec-banner section section-space-p">
          <h2 className="d-none">Banner</h2>
          <div className="container">
            <div className="ec-banner-inner">
              <div className="ec-banner-block ec-banner-block-2">
                <div className="row">
                  {banners.map((banner, index) => {
                    const isRight = banner.animation === "slideFromRight";
                    return (
                      <motion.div
                        key={banner.id}
                        className={`banner-block col-lg-6 col-md-12 ${
                          index === 0 ? "margin-b-30" : ""
                        }`}
                        initial={{ x: isRight ? "100%" : "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                      >
                        <div className="bnr-overlay">
                          <img
                            src={getImageUrl(banner.image!)}
                            alt={banner.title}
                          />
                          <div className="banner-text">
                            <span className="ec-banner-stitle">
                              {banner.subtitle}
                            </span>
                            <span className="ec-banner-title">
                              {banner.title.split("\\n").map((line, idx) => (
                                <span key={idx}>
                                  {line}
                                  <br />
                                </span>
                              ))}
                            </span>
                            {banner.discount && (
                              <span className="ec-banner-discount">
                                {banner.discount}
                              </span>
                            )}
                          </div>
                          <div className="banner-content">
                            <span
                              style={{
                                width: 40,
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                cursor: "pointer",
                                zIndex: 100,
                              }}
                              onClick={() => setIsForm(banner.id!)}
                            >
                              <img
                                src={EditSvg}
                                className="svg_img header_svg"
                                alt="edit"
                                style={{
                                  filter: "invert(1)",
                                }}
                              />{" "}
                            </span>
                            <span
                              style={{
                                width: 40,
                                position: "absolute",
                                top: "10px",
                                left: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsDelete(banner.id!)}
                            >
                              <FaTrash size={25} color="red" />
                            </span>

                            <span className="ec-banner-btn">
                              <Link to={banner.buttonUrl}>
                                {banner.buttonText}
                              </Link>
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <AnimatePresence>
        {isForm ? (
          <Modal
            show={isForm === true || typeof isForm === "string"}
            title={isForm === true ? "Add Banner" : "Edit Banner"}
            onClose={() => setIsForm(false)}
            closeButtonText="Close"
            saveButtonText={
              typeof isForm === "string" ? "Update Banner" : "Add new banner"
            }
            onSave={() => {
              if (validateForm()) {
                if (typeof isForm === "string") {
                  dispatch(
                    updateBanner({ id: formData?.id!, updatedBanner: formData })
                  );
                  toast.success("Banner Updated Successfully");
                } else {
                  dispatch(createBanner(formData));
                  toast.success("Banner Created Successfully");
                }
                setIsForm(false);
              } else {
                Object.entries(errors).forEach(([key, value]) => {
                  console.log(key, value);
                  toast.error(value);
                });
              }
            }}
          >
            <ImageUpload
              clearImage={() => setFormData((prev) => ({ ...prev, image: "" }))}
              value={formData.image}
              onSuccess={(filePath: string) =>
                setFormData((prev) => ({ ...prev, image: filePath }))
              }
            />

            {[
              {
                label: "Title",
                name: "title",
                type: "text",
                helper:
                  "Use '\\n' in the title to specify where to break the line.",
              },
              {
                label: "Sub Title",
                name: "subtitle",
                type: "text",
              },
              {
                label: "Discount",
                name: "discount",
                type: "text",
              },
              {
                label: "Button Text",
                name: "buttonText",
                type: "text",
              },
              {
                label: "Button URL",
                name: "buttonUrl",
                type: "text",
              },
              {
                label: "Animation direction",
                name: "animation",
                type: "select",
                options: [
                  { value: "slideFromRight", label: "Slide In Right" },
                  { value: "slideFromLeft", label: "Slide In Left" },
                ],
              },
            ].map(({ label, name, type, options, helper }) => (
              <div className="form-group row" key={name}>
                <label htmlFor={name} className="col-12 col-form-label">
                  {label}
                </label>
                <div className="col-12">
                  {type === "text" ? (
                    <input
                      id={name}
                      name={name}
                      type={type}
                      className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                      onChange={handleChange}
                      value={formData[name as keyof Banner]!}
                    />
                  ) : (
                    <select
                      name={name}
                      id={name}
                      onChange={handleChange}
                      className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                    >
                      {type === "select" &&
                        options &&
                        options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </select>
                  )}
                  {helper && <small>{helper}</small>}
                  {errors[name] && (
                    <div className="invalid-feedback">{errors[name]}</div>
                  )}
                </div>
              </div>
            ))}
          </Modal>
        ) : null}{" "}
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
    </Layout>
  );
};

export default BannerPage;
