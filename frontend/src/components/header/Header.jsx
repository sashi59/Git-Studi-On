import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Header = () => {
  const { isAuth } = UserData();

  return (
    <>
    <div className="navbar bg-neutral">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white lg:hidden "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-neutral"
            >
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/course">Course</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                  <a
                    className="link link-hover"
                    href="https://www.linkedin.com/in/shashishekhar59/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact
                  </a>
                </li>
              {isAuth ? (
              <li>
              <a className="text-1xl" href="/account">
                Account
              </a>
            </li>
            ) : (
              <li>
                <a className="text-1xl" href="/signin">
                  Signin
                </a>
              </li>
            )}
              
            </ul>
          </div>
          <a className="btn btn-ghost text-3xl text-white">Studi-On LMS</a>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <a className="text-2xl" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="text-2xl" href="/course">
                Course
              </a>
            </li>
            <li>
              <a className="text-2xl" href="/about">
                About
              </a>
            </li>
            <li>
            <a
                  className="link link-hover text-2xl"
                  href="https://www.linkedin.com/in/shashishekhar59/"
                  target="_blank"
                  rel="noopener noreferrer"
                  
                >
                  Contact
                </a>
            </li>
            {isAuth ? (
              <li>
              <a className="text-2xl" href="/account">
                Account
              </a>
            </li>
            ) : (
              <li>
                <a className="text-2xl" href="/signin">
                  Signin
                </a>
              </li>
            )}
            
          </ul>
        </div>
      </div>
      {/* <progress className="progress w-full" value={100} max={100}></progress> */}
    </>
  );
};

export default Header;
