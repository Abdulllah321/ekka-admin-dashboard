import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  createMainCategory,
  updateMainCategory,
} from "../../slices/categorySlice";
import { generateSlug } from "../../constants";
import ImageUpload from "../common/ImageUpload";
import toast from "react-hot-toast";
import SubmitBtn from "../common/SubmitBtn";

// Define the structure for form data
interface FormData {
  id?: string;
  name: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  imageUrl: string | null;
  status?: "active" | "inactive";
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
    shortDesc: "",
    fullDesc: "",
    imageUrl: null,
    status: "active",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isEditing && categoryData) {
      setFormData(categoryData);
    } else {
      setFormData({
        name: "",
        slug: "",
        shortDesc: "",
        fullDesc: "",
        imageUrl: null,
        status: "active",
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
          await dispatch(
            updateMainCategory({
              id: categoryData?.id as string,
              updatedData: preparedData as any,
            })
          );
          console.log(preparedData);
          if (!error) {
            setFormData({
              name: "",
              slug: "",
              shortDesc: "",
              fullDesc: "",
              imageUrl: null,
              status: "active",
            });
            toast.success("Category updated successfully");
            if (onSubmit) {
              onSubmit();
            }
          }
        } else {
          await dispatch(createMainCategory(preparedData as any));

          if (!error) {
            setFormData({
              name: "",
              slug: "",
              shortDesc: "",
              fullDesc: "",
              imageUrl: null,
              status: "active",
            });
            toast.success("Category added successfully");
          }
        }
      } catch (error) {
        toast.error(error as string);
      }
    }
  };

  const handleImageUploadSuccess = (filePath: string) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: filePath,
    }));
  };

  return (
    <>
      <div className="ec-cat-list card card-default mb-24px">
        <div className="card-body">
          <div className="ec-cat-form">
            {isEditing ? null : <h4>Add New Category</h4>}
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

              {[
                {
                  label: "Short Description",
                  name: "shortDesc",
                  rows: 2,
                },
                {
                  label: "Full Description",
                  name: "fullDesc",
                  rows: 4,
                },
              ].map(({ label, name, rows }) => (
                <div className="form-group row" key={name}>
                  <label htmlFor={name} className="col-12 col-form-label">
                    {label}
                  </label>
                  <div className="col-12">
                    <textarea
                      id={name}
                      name={name}
                      rows={rows}
                      className={`form-control ${
                        errors[name] ? "is-invalid" : ""
                      }`}
                      onChange={handleChange}
                      value={formData[name as keyof FormData]!}
                    />
                    {errors[name] && (
                      <div className="invalid-feedback">{errors[name]}</div>
                    )}
                  </div>
                </div>
              ))}

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
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  {errors.tags && (
                    <div className="invalid-feedback">{errors.tags}</div>
                  )}
                </div>
              </div>

              {/* Custom Image Upload Field */}
              <ImageUpload
                onSuccess={handleImageUploadSuccess}
                value={formData.imageUrl}
                clearImage={() => setFormData({ ...formData, imageUrl: null })}
              />

              <div className="row">
                <div className="col-12">
                  <SubmitBtn loading={loading} />
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
