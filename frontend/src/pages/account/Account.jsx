import React from "react";
import "./Account.css";
import { MdDashboard } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { UserData } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Account = ({ user }) => {
  const { setUser, setIsAuth } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Sign Out");
    navigate("/signin");
  };
  return (
    <div>
      {user && (
        <div className="profile bg-slate-100 hover:bg-slate-200 dash-tab">
          <h2 className="text-neutral text-4xl  text-center ">My Account</h2>
          <div className=" ">
            <p>
              <strong className="text-neutral ">Name - {user.name}</strong>
            </p>

            <p>
              <strong className="text-neutral ">Email - {user.email}</strong>
            </p>

            <button onClick={() => navigate(`/`)} className="common-btn">
              <MdDashboard />
              Dashboard
            </button>

            <br />
            {user && user.role === "admin" && (
              <button onClick={() => navigate(`/admin/dashboard`)} className="common-btn" style={{background:"green"}}>
                <MdDashboard />
                Admin Dashboard
              </button>
            )}
            <br />
            <button
              onClick={logoutHandler}
              className="common-btn hover:bg-red-600"
              style={{ background: "red" }}
            >
              <CiLogout />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
