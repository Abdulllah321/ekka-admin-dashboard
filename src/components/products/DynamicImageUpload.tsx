import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa"; // Add icons from react-icons
import { Product } from "../../slices/productSlice";
import Images from "../../assets/img/products/vender-upload-thumb-preview.jpg";
import { getImageUrl } from "../../constants";

const DynamicImageUpload = ({
  imageUrls,
  setImageUrls,
}: {
  imageUrls: string[];
  setImageUrls: Dispatch<SetStateAction<Product>>;
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files) {
      // Upload each file one by one
      Array.from(files).forEach((file, index) => {
        uploadImage(file, index);
      });
    }
  };

  const uploadImage = async (file: File, index?: number) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.filePath) {
        if (index !== undefined) {
          // If index is provided, replace the image at that index
          setImageUrls((prev) => ({
            ...prev,
            imageUrls: [...prev.imageUrls, response.data.filePath],
          }));
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const removeImageField = (index: number) => {
    setImageUrls((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="thumb-upload-set col-md-12">
      {imageUrls.map((imageUrl, index) => (
        <div className="thumb-upload" key={index}>
          <div className="thumb-preview ec-preview">
            <div className="image-thumb-preview">
              <img
                className="image-thumb-preview ec-image-preview"
                src={getImageUrl(imageUrl!) || Images}
                alt="edit"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          </div>
          {imageUrl && (
            <button
              type="button"
              onClick={() => removeImageField(index)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                color: "red",
                background: "#fff",
                borderRadius: 999,
                padding: "5px",
              }}
            >
              <FaTrashAlt />
            </button>
          )}
        </div>
      ))}
      <div
        className="thumb-upload bg-primary text-white rounded"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label
          htmlFor="addMoreImages"
          className="text-white"
          style={{
            padding: "10px 30px",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaPlus
            style={{ marginRight: imageUrls.length !== 0 ? " 0px" : "8px" }}
          />{" "}
          {imageUrls.length === 0 && "Add More Images"}
        </label>
        <input
          type="file"
          id="addMoreImages"
          className="ec-image-upload"
          accept=".png, .jpg, .jpeg"
          onChange={handleFileChange}
          multiple
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default DynamicImageUpload;
