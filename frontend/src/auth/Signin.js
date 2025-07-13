import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    usertype: "0"
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/user/signin", formData);

      if (response.data.token) { 
        localStorage.setItem("token", response.data.token); 
        alert("Login successful");
        navigate(parseInt(formData.usertype) === 0 ? "/home" : "/home");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(error.response.data); 
        setServerMessage(error.response.data);
      } else {
        alert("An error occurred. Please try again.");
        setServerMessage("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Login</h2>

          {serverMessage && <div className="alert alert-info">{serverMessage}</div>}

          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <div className="mb-3">
              <label htmlFor="usertype" className="form-label">Login as</label>
              <select
                className="form-select"
                id="usertype"
                value={formData.usertype}
                onChange={handleInputChange}
                required
              >
                <option value="0">Customer</option>
                <option value="1">Vendor</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Your Email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Your Password"
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <button 
                type="button" 
                className="btn btn-link text-decoration-none p-0 text-muted"
                onClick={() => navigate('/forgot-password')}
              >
                <i className="bi bi-key-fill me-1"></i>
                Forgot Password?
              </button>
              <p className="mb-0">
                <a href="/register" className="text-primary">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;