import { Dispatch, SetStateAction } from "react";
import { Product } from "../../utils/types";

const DynamicColorPicker = ({
  colors,
  setColors,
}: {
  colors: string[];
  setColors: Dispatch<SetStateAction<Product>>;
}) => {
  // Function to handle color change
  const handleColorChange = (index: number, newColor: string) => {
    const updatedColors = [...colors];
    updatedColors[index] = newColor;
    setColors((prev) => ({ ...prev, colors: updatedColors }));
  };

  // Function to add a new color
  const addColor = () => {
    setColors((prev) => ({ ...prev, colors: [...prev.colors, "#6D88C2"] }));
  };

  // Function to remove a color
  const removeColor = (index: number) => {
    const updatedColors = colors.filter((_, i) => i !== index);
    setColors((prev) => ({ ...prev, colors: updatedColors }));
  };

  return (
    <div className="col-md-4 mb-25">
      <label className="form-label">Colors</label>
      {colors.map((color, index) => (
        <div key={index} className="d-flex align-items-center mb-2">
          <input
            type="color"
            className="form-control form-control-color"
            value={color}
            onChange={(e) => handleColorChange(index, e.target.value)}
            title="Choose your color"
          />
          <button
            type="button"
            className="px-1 rounded-circle bg-danger text-white"
            onClick={() => removeColor(index)}
          >
            &times;
          </button>
        </div>
      ))}
      <button type="button" className="btn btn-primary mt-2" onClick={addColor}>
        Add Color
      </button>
    </div>
  );
};

export default DynamicColorPicker;
