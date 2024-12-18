import React, { ChangeEvent, DragEvent } from "react";
import axios from "axios";
import Loader from "./Loader";
import { IMAGE_BASE_URL } from "../../constants";

interface ImageUploadProps {
  onSuccess: (filePath: string) => void;
  value: string | null;
  clearImage: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onSuccess,
  value,
  clearImage,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0] ?? null;
    if (file) {
      uploadImage(file); // Trigger upload immediately after selection
    }
  };

  // Handle image drop
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file) {
      uploadImage(file);
    }
  };

  // Handle drag over
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  // Upload image to backend
  const uploadImage = async (file: File) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.filePath) {
        onSuccess(response.data.filePath);
      }
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-upload-container mb-3">
      <div
        className="image-upload-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {value ? (
          <div className="image-preview position-relative">
            <img
              src={IMAGE_BASE_URL + value}
              alt="Uploaded"
              style={{
                height: "100px",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-15%",
                right: "0%",
                color: "red",
                fontSize: "24px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={clearImage}
            >
              &times;
            </div>
          </div>
        ) : (
          <div>
            <p>Drag and drop an image here or click to select</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="image"
            />
            <label htmlFor="image" style={{ cursor: "pointer" }}>
              Choose File
            </label>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && (
        <div>
          <Loader /> {/* Show loading spinner while uploading */}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
