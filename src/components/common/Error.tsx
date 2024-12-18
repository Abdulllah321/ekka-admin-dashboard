import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Error = ({ errorData }: { errorData: string | undefined | any }) => {
  const message = errorData
    ? decodeURIComponent(errorData)
    : "Something went wrong!";

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row">
        <div className="col-12 text-center">
          <div className="card shadow-lg">
            <div className="card-header bg-danger text-white">
              <h3>Error Occurred</h3>
            </div>
            <div className="card-body">
              <h4 className="text-danger mb-4">Oops! Something went wrong.</h4>
              <p className="lead">{message}</p>
              <div className="mt-4">
                <a href="/" className="btn btn-primary">
                  Go Back to Home
                </a>
              </div>
            </div>
            <div className="card-footer text-muted">
              <p>For support, contact our team.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
