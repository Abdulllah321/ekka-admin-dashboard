import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/img/logo/logo-login.png";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../assets/css/ekka.css"; // Import your custom CSS (ensure the file is in the correct path)
import { loginUser } from "../slices/authSlice";
import { AppDispatch } from "../store";
import { Navigate } from "react-router";

// Define the types for the Redux state
interface RootState {
  auth: {
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
  };
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="sign-inup" id="body">
      <div className="container d-flex align-items-center justify-content-center form-height-login pt-24px pb-24px">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-10">
            <div className="card">
              <div className="card-header bg-primary">
                <div className="ec-brand">
                  <a href="index.html" title="Ekka">
                    <img className="ec-brand-icon" src={Logo} alt="Ekka Logo" />
                  </a>
                </div>
              </div>
              <div className="card-body p-5">
                <h4 className="text-dark mb-5">Sign In</h4>
                <form onSubmit={handleLogin}>
                  <div className="row">
                    <div className="form-group col-md-12 mb-4">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12 mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                        disabled={loading} // Disable button when loading
                      >
                        {loading ? "Signing In..." : "Sign In"}
                      </button>
                    </div>
                  </div>
                </form>
                {error && <div className="alert alert-danger">{error}</div>}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
