import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {currentUser} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await axios.post("/api/auth/signin", formData);
      if (response) {
        dispatch(signInSuccess(response.data));
        SweetAlert.fire({
          text: "Logged in Successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "blue",
        });
        navigate("/profile");
      }
    } catch (err) {
      dispatch(signInFailure(err.response.data));
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
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-blue-700">
        Sign In
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
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
        <button className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign In
        </button>
        <button className="bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Continue with Google
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an Account?</p>
        <Link to="/sign-up" className="text-blue-600">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
