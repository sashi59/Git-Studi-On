import React, { useState } from "react";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { btnLoading, userSignup } = UserData();
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password)
    userSignup(name, email, password, navigate);
  };

  return (
    <div className="min-h-96 pb-5 ">
      <form className="form signup-form text-black" onSubmit={handelSubmit}>
        <h2 className="text-4xl font-bold text-center">Sign Up</h2>
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input type="text" className="grow" value={name}
            onChange={(e) => setName(e.target.value)} placeholder="Tony Stark" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input type="text" className="grow" value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder="tony123@email.com" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input type="password" className="grow" value={password}
            onChange={(e) => setPassword(e.target.value)} placeholder="**********" />
        </label>
        <button className="btn btn-neutral text-white mt-2" disabled={btnLoading} type="submit">
          {btnLoading?"Please wait...":"Sign Up"}
        </button>
        <p className="mt-4">Already have an account. <a href="/signin" className="underline text-neutral">Sign In</a> here</p>
      </form>
    </div>
  );
};

export default Signup;
