import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-700 shadow-md">
      <div className="p-3 flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-blue-100">Real</span>
            <span className="text-blue-300">Estate</span>
          </h1>
        </Link>
        <form className="bg-blue-100 p-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none"
          />
          <FaSearch className="text-blue-600" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-300 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-300 hover:underline">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="text-slate-300 hover:underline">SignIn</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
