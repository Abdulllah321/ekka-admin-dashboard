import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubCategory,
  fetchMainCategories,
  updateSubCategory,
} from "../../slices/categorySlice";
import { generateSlug } from "../../constants";
import toast from "react-hot-toast";
import ImageUpload from "../common/ImageUpload";

interface FormData {
  id?: string;
  name: string;
  slug: string;
  status?: "active" | "inactive";
  mainCategoryId: string;
  imageUrl: string;
}

interface FormProps {
  isEditing?: boolean;
  onSubmit?: () => void;
  categoryData?: FormData;
}

const Form: React.FC<FormProps> = ({
  isEditing = false,
  onSubmit,
  categoryData,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector(
    (state: RootState) => state.categories
  );
  const [formData, setFormData] = useState<FormData>({
    name: "",
    slug: "",
    status: "active",
    mainCategoryId: "",
    imageUrl: "",
  });
  const { mainCategories } = useSelector(
    (state: RootState) => state.categories
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchMainCategories());
  }, []);

  useEffect(() => {
    if (isEditing && categoryData) {
      setFormData(categoryData);
    } else {
      setFormData({
        name: "",
        slug: "",
        status: "active",
        mainCategoryId: "",
        imageUrl: "",
      });
    }
    setErrors({});
  }, [isEditing]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.slug.trim()) {
      formData.slug = generateSlug(formData.name);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const preparedData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.name),
      };

      try {
        if (isEditing && categoryData) {
          preparedData.id = categoryData?.id;
          await dispatch(updateSubCategory(preparedData as any));
          if (!error) {
            setFormData({
              name: "",
              slug: "",
              status: "active",
              mainCategoryId: "",
              imageUrl: "",
            });
            toast.success("Sub Category updated successfully");
            if (onSubmit) {
              onSubmit();
            }
          }
        } else {
          await dispatch(createSubCategory(preparedData as any));

          if (!error) {
            setFormData({
              name: "",
              slug: "",
              mainCategoryId: "",
              status: "active",
              imageUrl: "",
            });
            toast.success("Sub Category added successfully");
          }
        }
      } catch (error) {
        toast.error(error as string);
      }
    }
  };

  return (
    <>
      <div className="ec-cat-list card card-default mb-24px">
        <div className="card-body">
          <div className="ec-cat-form">
            {isEditing ? null : <h4>Add New Sub Category</h4>}
            <form onSubmit={handleSubmit}>
              {[
                { label: "Name", name: "name", type: "text" },
                {
                  label: "Slug",
                  name: "slug",
                  type: "text",
                  helper:
                    "The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.",
                },
              ].map(({ label, name, type, helper }) => (
                <div className="form-group row" key={name}>
                  <label htmlFor={name} className="col-12 col-form-label">
                    {label}
                  </label>
                  <div className="col-12">
                    <input
                      id={name}
                      name={name}
                      type={type}
                      className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                      onChange={handleChange}
                      value={formData[name as keyof FormData]!}
                    />
                    {helper && <small>{helper}</small>}
                    {errors[name] && (
                      <div className="invalid-feedback">{errors[name]}</div>
                    )}
                  </div>
                </div>
              ))}

              <div className="form-group row">
                <label htmlFor="tags" className="col-12 col-form-label">
                  Select Category
                </label>
                <div className="col-12">
                  <select
                    name={"mainCategoryId"}
                    id="mainCategoryId"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        mainCategoryId: e.target.value as string,
                      });
                    }}
                    value={formData.mainCategoryId}
                  >
                    <option value={""} disabled>
                      Select Category
                    </option>
                    {mainCategories.map((cat) => (
                      <option value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.tags && (
                    <div className="invalid-feedback">{errors.tags}</div>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="tags" className="col-12 col-form-label">
                  Status
                </label>
                <div className="col-12">
                  <select
                    name={"status"}
                    id="status"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        status: e.target.value as "active" | "inactive",
                      });
                    }}
                    value={formData.status}
                  >
                    <option value="active">Active</option>{" "}
                    <option value="inactive">Inactive</option>
                  </select>
                  {errors.tags && (
                    <div className="invalid-feedback">{errors.tags}</div>
                  )}
                </div>
              </div>
              <ImageUpload
                onSuccess={(filePath: string) => {
                  setFormData((prev) => ({
                    ...prev,
                    imageUrl: filePath,
                  }));
                }}
                value={formData.imageUrl}
                clearImage={() => setFormData({ ...formData, imageUrl: "" })}
              />

              <div className="row">
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ opacity: loading ? 0.5 : 1 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
