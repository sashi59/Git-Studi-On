import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./admin.css";
import { server } from "../App";
import Layout from "./Layout";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/admin/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <div>
      <Layout>
        <div className="main-content">
          <div className="box">
            <p>Total Users</p>
            <p>{stats.users}</p>
          </div>
          <div className="box">
            <p>Total Courses</p>
            <p>{stats.courses}</p>
          </div>
          <div className="box">
            <p>Total Lectures</p>
            <p>{stats.lectures}</p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashbord;
