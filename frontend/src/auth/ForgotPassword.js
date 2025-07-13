import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('request'); // 'request' or 'reset'
    const [formData, setFormData] = useState({
        usertype: "0",
        email: "",
        token: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messageType, setMessageType] = useState(""); // success or error

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            const response = await axios.post("http://localhost:5000/api/otp/send/password-reset", {
                email: formData.email, usertype: formData.usertype
            });
            setMessageType("success");
            setMessage("Password reset token has been sent to your email");
            setActiveTab('reset'); // Switch to reset tab after successful token request
        } catch (error) {
            setMessageType("error");
            setMessage(error.response?.data || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setMessageType("error");
            setMessage("Passwords do not match");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const response = await axios.post("http://localhost:5000/api/otp/validate/password-reset", {
                usertype: formData.usertype,
                email: formData.email,
                otp: formData.token,
                password: formData.newPassword
            });
            setMessageType("success");
            setMessage("Password has been reset successfully");
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setMessageType("error");
            setMessage(error.response?.data || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-4">
                    <h2 className="text-center mb-4">Password Recovery</h2>

                    {message && (
                        <div className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"}`}>
                            {message}
                        </div>
                    )}

                    <div className="card shadow-sm">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === 'request' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('request')}
                                    >
                                        Request Reset
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === 'reset' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('reset')}
                                    >
                                        Reset Password
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div className="card-body p-4">
                            {activeTab === 'request' ? (
                                <form onSubmit={handleRequestOTP}>

                                    <div className="mb-3">
                                        <label htmlFor="usertype" className="form-label">Account Type</label>
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
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your registered email"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Reset Token'
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleResetPassword}>

                                    <div className="mb-3">
                                        <label htmlFor="usertype" className="form-label">Account Type</label>
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
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="token" className="form-label">Reset Token</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="token"
                                            value={formData.token}
                                            onChange={handleInputChange}
                                            placeholder="Enter the token from your email"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label">New Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                            placeholder="Enter new password"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Confirm new password"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Resetting...
                                            </>
                                        ) : (
                                            'Reset Password'
                                        )}
                                    </button>
                                </form>
                            )}

                            <div className="text-center mt-3">
                                <button
                                    type="button"
                                    className="btn btn-link text-decoration-none"
                                    onClick={() => navigate('/login')}
                                >
                                    Back to Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;