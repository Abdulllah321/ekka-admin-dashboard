import React from "react";

interface NoDataFoundProps {
  title: string;
  message?: string;
  buttonText?: string; // Make buttonText optional
  buttonLink?: string; // Make buttonLink optional
  iconClass?: string; // Optional icon class
}

const NoDataFound: React.FC<NoDataFoundProps> = ({
  title,
  message,
  buttonText,
  buttonLink,
  iconClass = "bi bi-exclamation-circle", // Default icon if none provided
}) => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-danger">
                <i className={`${iconClass} me-2`}></i>
                {title}
              </h5>
              {message && <p className="card-text">{message}</p>}
              {buttonText && buttonLink && (
                <a href={buttonLink} className="btn btn-primary">
                  {buttonText}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;
