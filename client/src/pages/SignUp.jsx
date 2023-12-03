import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SweetAlert from "sweetalert2";
import { FaEye } from "react-icons/fa";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const spanOnClick = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/signup", formData);
      SweetAlert.fire({
        text: response.data,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "blue",
      });
      navigate("/sign-in");
    } catch (err) {
      setLoading(false);
      if (err.response) {
        SweetAlert.fire({
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "blue",
        });
      } else {
        SweetAlert.fire({
          text: "An unexpected error occurred!!!",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "blue",
        });
      }
    }
    setLoading(false);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-2 text-blue-700">
        Sign Up
      </h1>
      <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
        <input
          required
          type="text"
          placeholder="First Name"
          id="firstName"
          className="p-3 border rounded-lg"
          onChange={handleInputChange}
        />
        <input
          required
          type="text"
          placeholder="Last Name"
          id="lastName"
          className="p-3 border rounded-lg"
          onChange={handleInputChange}
        />
        <input
          required
          type="email"
          placeholder="Email"
          id="email"
          className="p-3 border rounded-lg"
          onChange={handleInputChange}
        />
        <input
          required
          type={!showPassword ? "text" : "password"}
          placeholder="Password"
          id="password"
          className="p-3 border rounded-lg"
          onChange={handleInputChange}
        />
        <span
          className="cursor-pointer text-blue-500 text-xs text-right"
          onClick={spanOnClick}
        >
          {!showPassword ? "Show Password" : "Hide Password"}
        </span>

        <input
          required
          type="text"
          placeholder="Mobile Number"
          id="mobileNumber"
          className="p-3 border rounded-lg"
          onChange={handleInputChange}
        />
        <button
          disabled={loading}
          className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {!loading ? "Sign Up" : "Loading"}
        </button>
        <button className="bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Continue with Google
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an Account?</p>
        <Link to="/sign-in" className="text-blue-600">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
