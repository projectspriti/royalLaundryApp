import React, { useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import DelayedButton from '../utils/DelayedButton'

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
    password: "",
    confirmpassword: "",
    usertype: "0",
  });


  const [passwordError, setPasswordError] = useState("");
  const [serverMessage, setServerMessage] = useState(""); // For displaying backend messages
  const [isPincodeVerified, setIsPincodeVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [userOtp, setUserOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // Add this state variable t
  const [isVerifyLoading, setIsVerifyLoading] = useState(false); // Add this state variable to track loading state

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
    password: "",
    confirmpassword: "",
  });

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newErrors = { ...errors };

    // Contact number validation
    if (id === "phone") {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [id]: numericValue });
        if (numericValue.length !== 10) {
          newErrors.phone = "Contact number must be 10 digits";
        } else {
          newErrors.phone = "";
        }
      }
      setErrors(newErrors);
      return;
    }

    // Email validation
    if (id === "email") {
      if (!validateEmail(value)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        newErrors.email = "";
      }
    }

    // Password validation
    if (id === "password") {
      newErrors.password = validatePassword(value);
    }

    // Address validation
    if (id === "address") {
      // if (value.length < 10) {
      //   newErrors.address = "Please enter a complete address";
      // } else {
      //   newErrors.address = "";
      // }
    }

    if (id === "pincode") {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 6) {
        setFormData({ ...formData, [id]: numericValue });
        setIsPincodeVerified(false);
        setFormData(prev => ({ ...prev, city: "", district: "", state: "", country: "" }));

        if (numericValue.length !== 6) {
          newErrors.pincode = "Pincode must be 6 digits";
        } else {
          newErrors.pincode = "";
        }
      }
      setErrors(newErrors);
      return;
    }

    // Re-enter password validation
    if (id === "confirmpassword") {
      setPasswordError(value !== formData.password ? "Passwords do not match!" : "");
    }

    setErrors(newErrors);
    setFormData({ ...formData, [id]: value });
  };

  const handleName = (e) => {
    const { id, value } = e.target;
    let newErrors = { ...errors };

    if (/^[A-Za-z\s]*$/.test(value)) {
      if (value.trim().length < 2) {
        newErrors.fullname = "Name must be at least 2 characters long";
      } else {
        newErrors.fullname = "";
      }
      setFormData({ ...formData, [id]: value });
      setErrors(newErrors);
    }
  };
  const handlePincodeButton = async () => {
    try {
      const regiondata = await axios.get(`http://localhost:5000/api/location/${formData.pincode}`)
      console.log("regiondata", regiondata.data);

      if (regiondata.data.city && regiondata.data.district && regiondata.data.state) {
        setFormData(prev => ({ ...prev, ...regiondata.data }));
        setIsPincodeVerified(true);
      }
      else {
        setFormData(prev => ({ ...prev, city: "", district: "", state: "", country: "" }));
        setIsPincodeVerified(false);
        setServerMessage("Invalid pincode. Please enter a valid pincode.");
      }

    } catch (error) {
      setFormData(prev => ({ ...prev, city: "", district: "", state: "", country: "" }));
      setIsPincodeVerified(false);
      setServerMessage("Invalid pincode. Please enter a valid pincode.");
    }

  }

  const handleRegisterButton = async (e) => {
    e.preventDefault();
    
    if (!isPincodeVerified) {
      setServerMessage("Please verify your pincode before submitting.");
      return;
    }
    // Check if any errors exist
    const hasErrors = Object.values(errors).some(error => error !== "") ||
      Object.values(formData).some(value => value === "");

    if (hasErrors) {
      console.log("Form has errors", errors);
      console.log("Form data", formData);
      setServerMessage("Please fix all errors before submitting");
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      setServerMessage("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/user/signup", formData);
      sendOtp();
    } catch (error) {
      console.log(error.response)
      if (error.response) {
        setServerMessage(error.response.data);
      } else {
        setServerMessage("An unknown error occurred. Please try again.");
      }
    }


  }


  const sendOtp = async () => {
    try {
      const otpResponse = await axios.post("http://localhost:5000/api/otp/send/email-verify", { email: formData.email, usertype:formData.usertype });

      if (otpResponse.status === 200) {
        setShowOtpModal(true); // Show OTP modal 
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setServerMessage(error.response.data.error);
      } else {
        setServerMessage("An error occurred while sending OTP. Please try again.");
      }
    }
  }


  const handleVerifyOtp = async () => {
    setIsVerifyLoading(true); // Set loading state to true
    try {
      const response = await axios.post("http://localhost:5000/api/otp/validate/email-verify", { email: formData.email, otp: userOtp, usertype:formData.usertype });

      if (response.status === 201) {
        setShowOtpModal(false); // Hide OTP modal
        setOtpError("");
        setServerMessage(response.data.message);
        setFormData(prev => Object.entries(prev).reduce((acc, [key, value]) => ({ ...acc, [key]: "" }), {}));
        setErrors(prev => Object.entries(prev).reduce((acc, [key, value]) => ({ ...acc, [key]: "" }), {}));
        setPasswordError("");
        setIsPincodeVerified(false);
        setServerMessage("");
        alert('Registration successful!');
      }
    } catch (error) {
      console.log(error);
      setOtpError("Invalid OTP. Please try again."); 
      if (error.response) {
        setServerMessage(error.response.data);
        alert(error.response.data);
      } else {
      alert('Unable to register, please try again later...')
        setServerMessage("An unknown error occurred. Please try again.");
      }
    }
    setIsVerifyLoading(false); // Set loading state to false
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          {/* <h2 className="text-center mb-4">User Registration Form</h2> */}

          {serverMessage && <div className="alert alert-info">{serverMessage}</div>}

          <form onSubmit={handleRegisterButton} className="card p-4 shadow-sm">
          
          <div className="mb-3">
              <label htmlFor="usertype" className="form-label">Register as</label>
              <select
                className="form-select"
                id="usertype"
                value={formData.usertype}
                onChange={handleInputChange}
                required
              >
                <option value="1">Customer</option>
                <option value="2">Vendor</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">Full Name</label>
              <input
                type="text"
                className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
                id="fullname"
                value={formData.fullname}
                onChange={handleName}
                required
                pattern="[A-Za-z\s]*"
                title="Only letters and spaces are allowed"
                placeholder="Enter Your Name"
              />
              {errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Your Email ID"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Contact Number</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter Your Contact No"
                maxLength={10}
                pattern="\d{10}"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                className="form-control"
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="House/Flat No., Nearby Landmark"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pincode" className="form-label">Pin code</label>
              <input
                className="form-control"
                id="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Area Pin Code"
                required
              />
              {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
              <button onClick={handlePincodeButton} type="button" disabled={formData.pincode.length !== 6 || isPincodeVerified} className="btn btn-success mt-2">
                {isPincodeVerified ? '✓ Verified' : 'Verify Pincode'}
              </button>
              {/* Display region details */}
              {formData.city && (
                <div className="mt-3">
                  <div className="card">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">Region Details</h6>
                      <div className="row">
                        <div className="col-3">
                          <p className="mb-1"><strong>City:</strong></p>
                          <p className="text-muted">{formData.city}</p>
                        </div>
                        <div className="col-3">
                          <p className="mb-1"><strong>District:</strong></p>
                          <p className="text-muted">{formData.district}</p>
                        </div>
                        <div className="col-3">
                          <p className="mb-1"><strong>State:</strong></p>
                          <p className="text-muted">{formData.state}</p>
                        </div>
                        <div className="col-3">
                          <p className="mb-1"><strong>Country:</strong></p>
                          <p className="text-muted">{formData.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
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
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
              </div>

              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="confirmpassword" className="form-label">Re-enter Password</label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    id="confirmpassword"
                    value={formData.confirmpassword}
                    onChange={handleInputChange}
                    placeholder="Re-enter Your Password"
                    required
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <i className="bi bi-eye-slash"></i>
                    ) : (
                      <i className="bi bi-eye"></i>
                    )}
                  </button>
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
            // disabled={Object.values(errors).some(error => error !== "") || passwordError !== ""}
            >
              Register
            </button>
          </form>
        </div>
      </div>

      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Email Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">Enter OTP sent to your email</label>
            <input
              type="text"
              className={`form-control ${otpError ? 'is-invalid' : ''}`}
              id="otp"
              value={userOtp}
              onChange={(e) => setUserOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />
            {otpError && <div className="invalid-feedback">{otpError}</div>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <DelayedButton onClick={sendOtp}/>
          <button className="btn btn-success" onClick={handleVerifyOtp}>
            {isVerifyLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Verifying...
              </>
            ) : (
              'Verify & Register'
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Signup;