import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-blue-700">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4">
        <input
          required
          type="text"
          placeholder="Username"
          id="username"
          className="p-3 border rounded-lg"
        />
        <input
          required
          type="email"
          placeholder="Email"
          id="email"
          className="p-3 border rounded-lg"
        />
        <input
          required
          type="password"
          placeholder="Password"
          id="password"
          className="p-3 border rounded-lg"
        />
        <button className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
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
