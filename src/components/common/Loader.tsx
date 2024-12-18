import React from "react";
import LoadingGif from "../../assets/img/loader.svg";

const Loader: React.FC = () => {
  return (
    <div>
      <img
        src={LoadingGif}
        alt="Loading..."
        className="loader"
        style={{ width: "50px" }}
      />
    </div>
  );
};

export default Loader;
