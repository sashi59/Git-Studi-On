import React, { useState } from "react";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { btnLoading, userSignin } = UserData();
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password)
    userSignin(email, password, navigate);
  };

  return (
    <div className="min-h-96 pb-5">
      <form className="form signup-form text-black" onSubmit={handelSubmit}>
        <h2 className="text-4xl font-bold text-center">Sign In</h2>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input
            type="text"
            className="grow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tony123@email.com"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input
            type="password"
            className="grow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="**********"
          />
        </label>
        <button
          disabled={btnLoading}
          className="btn btn-neutral text-white mt-2"
          type="submit"
        >
          {btnLoading ? "Please wait..." : "Sign In"}
        </button>
        <p className="mt-4">
          Create new account.{" "}
          <a href="/signup" className="underline text-neutral">
            Sign Up
          </a>{" "}
          here
        </p>
      </form>
    </div>
  );
};

export default Signin;
