import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import SubmitBtn from "../common/SubmitBtn";
import { createCoupon, updateCoupon } from "../../slices/couponSlice";

// Define the structure for form data
interface FormData {
  id?: string;
  code: string;
  description?: string;
  discountAmount: number;
  discountType: "percentage" | "fixed";
  startDate: string | Date;
  endDate: string | Date;
  status: "active" | "inactive" | "expired";
}

interface FormProps {
  isEditing?: boolean;
  onSubmit?: () => void;
  couponData?: FormData;
}

const CouponForm: React.FC<FormProps> = ({
  isEditing = false,
  onSubmit,
  couponData,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.coupons);
  const [formData, setFormData] = useState<FormData>({
    code: "",
    description: "",
    discountAmount: 0,
    discountType: "percentage",
    startDate: "",
    endDate: "",
    status: "active",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isEditing && couponData) {
      setFormData({
        code: couponData.code,
        discountAmount: couponData.discountAmount,
        discountType: couponData.discountType,
        startDate: new Date(couponData.startDate).toISOString().split("T")[0],
        endDate: new Date(couponData.endDate).toISOString().split("T")[0],
        status: couponData.status,
        description: couponData.description,
      });
    } else {
      setFormData({
        code: "",
        description: "",
        discountAmount: 0,
        discountType: "percentage",
        startDate: "",
        endDate: "",
        status: "active",
      });
    }
    setErrors({});
  }, [isEditing]);

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

    if (!formData.code.trim()) {
      newErrors.code = "Code is required.";
    }

    if (!formData.discountAmount) {
      newErrors.discountAmount = "Discount amount is required.";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const preparedData = {
        ...formData,
      };

      try {
        if (isEditing && couponData) {
          preparedData.id = couponData?.id;
          await dispatch(
            updateCoupon({
              id: couponData?.id as string,
              data: preparedData as any,
            })
          );
          if (!error) {
            setFormData({
              code: "",
              description: "",
              discountAmount: 0,
              discountType: "percentage",
              startDate: "",
              endDate: "",
              status: "active",
            });
            toast.success("Coupon updated successfully");
            if (onSubmit) {
              onSubmit();
            }
          }
        } else {
          await dispatch(createCoupon(preparedData as any));

          if (!error) {
            setFormData({
              code: "",
              description: "",
              discountAmount: 0,
              discountType: "percentage",
              startDate: "",
              endDate: "",
              status: "active",
            });
            toast.success("Coupon added successfully");
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
            {isEditing ? null : <h4>Add New Coupon</h4>}
            <form onSubmit={handleSubmit}>
              {[
                { label: "Code", name: "code", type: "text" },
                {
                  label: "Discount Amount",
                  name: "discountAmount",
                  type: "number",
                },
                { label: "Start Date", name: "startDate", type: "date" },
                { label: "End Date", name: "endDate", type: "date" },
              ].map(({ label, name, type }) => (
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
                      value={formData[name as keyof FormData] as string}
                    />
                    {errors[name] && (
                      <div className="invalid-feedback">{errors[name]}</div>
                    )}
                  </div>
                </div>
              ))}

              <div className="form-group row">
                <label htmlFor="discountType" className="col-12 col-form-label">
                  Discount Type
                </label>
                <div className="col-12">
                  <select
                    name="discountType"
                    id="discountType"
                    onChange={handleChange}
                    value={formData.discountType}
                    className={`form-control ${errors.discountType ? "is-invalid" : ""}`}
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed</option>
                  </select>
                  {errors.discountType && (
                    <div className="invalid-feedback">
                      {errors.discountType}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="description" className="col-12 col-form-label">
                  Description
                </label>
                <div className="col-12">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                    onChange={handleChange}
                    value={formData.description || ""}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="status" className="col-12 col-form-label">
                  Status
                </label>
                <div className="col-12">
                  <select
                    name="status"
                    id="status"
                    onChange={handleChange}
                    value={formData.status}
                    className={`form-control ${errors.status ? "is-invalid" : ""}`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="expired">Expired</option>
                  </select>
                  {errors.status && (
                    <div className="invalid-feedback">{errors.status}</div>
                  )}
                </div>
              </div>

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

export default CouponForm;
