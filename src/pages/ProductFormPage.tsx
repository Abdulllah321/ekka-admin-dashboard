import { Link } from "react-router-dom";
import Layout from "../components/common/Layout";
import EditSvg from "../assets/img/icons/edit.svg";
import ThumbnailImage from "../assets/img/products/vender-upload-preview.jpg";
import Images from "../assets/img/products/vender-upload-thumb-preview.jpg";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createProduct, Product } from "../slices/productSlice";
import axios from "axios";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainCategories } from "../slices/categorySlice";
import DynamicColorPicker from "../components/products/DynamicColorPicker";
import DynamicImageUpload from "../components/products/DynamicImageUpload";
import toast from "react-hot-toast";

const ProductFormPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    stockQuantity: 0,
    sizes: [],
    colors: [],
    imageUrls: [],
    status: "active",
    shortDesc: "",
    mainCategoryId: "",
    subCategoryId: "",
    thumbnail: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { mainCategories: categories } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchMainCategories());
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: string,
    index?: number
  ) => {
    const file = e.target?.files?.[0] ?? null;
    if (file) {
      uploadImage(file, name, index);
    }
  };

  const uploadImage = async (file: File, name: string, index?: number) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.filePath) {
        if (index !== undefined && typeof index === "number") {
          // If an index is provided, replace the value at that index
          setFormData((prev) => {
            const updatedImageUrls = [...prev.imageUrls];
            updatedImageUrls[index] = response.data.filePath; // Replace the value at the specified index
            return { ...prev, imageUrls: updatedImageUrls };
          });
        } else {
          // If no index is provided, just set the value directly
          setFormData((prev) => ({
            ...prev,
            [name]: response.data.filePath,
          }));
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.thumbnail) {
      toast.error("Please select a thumbnail image");
      return;
    }
    await dispatch(createProduct(formData));
  };

  return (
    <Layout>
      <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
        <div>
          <h1>Add Product</h1>
          <p className="breadcrumbs">
            <span>
              <a href="index.html">Home</a>
            </span>
            <span>
              <i className="mdi mdi-chevron-right"></i>
            </span>
            Product
          </p>
        </div>
        <div>
          <Link to="/product-list" className="btn btn-primary">
            View All
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card card-default">
            <div className="card-header card-header-border-bottom">
              <h2>Add Product</h2>
            </div>
            <div className="card-body">
              <div className="row ec-vendor-uploads">
                <div className="col-lg-4">
                  <div className="ec-vendor-img-upload">
                    <div className="ec-vendor-main-img">
                      <div className="avatar-upload">
                        <div className="avatar-edit">
                          <input
                            type="file"
                            id="imageUpload"
                            className="ec-image-upload"
                            accept=".png, .jpg, .jpeg"
                            onChange={(e) => handleFileChange(e, "thumbnail")}
                          />
                          <label htmlFor="imageUpload">
                            <img
                              src={EditSvg}
                              className="svg_img header_svg"
                              alt="edit"
                            />
                          </label>
                        </div>
                        <div className="avatar-preview ec-preview">
                          <div className="imagePreview ec-div-preview">
                            <img
                              className="ec-image-preview"
                              src={ThumbnailImage}
                              alt="edit"
                            />
                          </div>
                        </div>
                      </div>
                      <DynamicImageUpload
                        imageUrls={formData.imageUrls}
                        setImageUrls={setFormData}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="ec-vendor-upload-detail">
                    <form className="row g-3" onSubmit={handleSubmit}>
                      <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">
                          Product name
                        </label>
                        <input
                          type="text"
                          className="form-control slug-title"
                          id="name"
                          name="name"
                          placeholder="Enter product name"
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Select Categories</label>
                        <select
                          name="categories"
                          id="Categories"
                          className="form-select"
                          onChange={(e) => {
                            const selectedOption =
                              e.target.options[e.target.selectedIndex];
                            const mainCategoryId = selectedOption.getAttribute(
                              "data-main-category-id"
                            );
                            const subCategoryId = e.target.value;

                            setFormData((prev) => ({
                              ...prev,
                              mainCategoryId: mainCategoryId || "",
                              subCategoryId: subCategoryId,
                            }));
                          }}
                          required
                        >
                          <option value="" disabled selected>
                            Please Select
                          </option>
                          {categories.map((category) => (
                            <optgroup label={category.name} key={category.id}>
                              {category?.subCategories?.map((subcategory) => (
                                <option
                                  key={subcategory.id}
                                  value={subcategory.id}
                                  data-main-category-id={category.id} // Add mainCategoryId as a custom attribute
                                >
                                  {subcategory.name}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="slug" className="col-12 col-form-label">
                          Slug <span>( Optional )</span>
                        </label>
                        <div className="col-12">
                          <input
                            id="slug"
                            name="slug"
                            className="form-control here set-slug"
                            type="text"
                            placeholder="Enter slug"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">Short Description</label>
                        <textarea
                          className="form-control"
                          rows={2}
                          defaultValue={""}
                          name="shortDesc"
                          placeholder="Enter short description"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <DynamicColorPicker
                        colors={formData.colors}
                        setColors={setFormData}
                      />
                      <div className="col-md-8 mb-25">
                        <label className="form-label">Size</label>
                        <div className="form-checkbox-box">
                          {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map(
                            (size) => (
                              <div className="form-check form-check-inline">
                                <input
                                  type="checkbox"
                                  name="size1"
                                  defaultValue={size}
                                  checked={formData.sizes.includes(size)}
                                  value={size}
                                  onChange={(e) => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      sizes: [...prev.sizes, e.target.value],
                                    }));
                                  }}
                                />
                                <label>{size}</label>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">
                          Price <span>( In USD )</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          name="price"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          id="stockQuantity"
                          name="stockQuantity"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          defaultValue={""}
                          name="description"
                          placeholder="Enter full description"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">
                          Product Tags{" "}
                          <span>( Type and make comma to separate tags )</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="productTags"
                          name="productTags"
                          defaultValue=""
                          placeholder=""
                          onChange={handleChange}
                          data-role="tagsinput"
                          required
                        />
                      </div>

                      <div className="card-header">Optional Fields</div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <label className="form-label">Discount Price</label>
                            <input
                              type="number"
                              className="form-control"
                              id="discountPrice"
                              name="discountPrice"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Discount Price</label>
                            <select
                              name="stockStatus"
                              id="stockStatus"
                              className="form-control"
                              onChange={handleChange}
                            >
                              <option value="" disabled>
                                Please select Stock
                              </option>
                              <option value="inStock">In Stock</option>
                              <option value="outOfStock">Out of Stock</option>
                              <option value="limitedStock">
                                Limited Stock
                              </option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Weight</label>
                            <input
                              type="number"
                              className="form-control"
                              id="weight"
                              name="weight"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Dimensions</label>
                            <input
                              type="number"
                              className="form-control"
                              id="dimensions"
                              name="dimensions"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
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

export default ProductFormPage;
