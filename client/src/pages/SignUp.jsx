import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      alert(response.data);
      navigate("/sign-in");
    } catch (err) {
      setLoading(false);
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("An unexpected error occurred!!!");
      }
    }
    setLoading(false);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-blue-700">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <input
          required
          type="text"
          placeholder="Username"
          id="username"
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
          type="password"
          placeholder="Password"
          id="password"
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
      <div className="flex gap-3 mt-5">
        <p>Already have an Account?</p>
        <Link to="/sign-in" className="text-blue-600">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
