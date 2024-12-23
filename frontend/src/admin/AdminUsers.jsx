import React, { useEffect, useState } from "react";
import "./admin.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../App";
import Layout from "./Layout";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/admin/all-users`, {

        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id) => {
    if (confirm("are you sure you want to update this user role")) {
      try {
        const { data } = await axios.post(
          `${server}/api/admin/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        toast.success(data.message);
        fetchUsers();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  console.log(users);
  return (
    <Layout>
      <div className="users text-black">
        <h1 className="text-center text-3xl">All Users</h1>
        <br />
        <table border={"black"}>
          <thead>
            <tr>
              <td>#</td>
              <td>name</td>
              <td>email</td>
              <td>role</td>
              <td>update role</td>
            </tr>
          </thead>

          {users &&
            users.map((e, i) => (
              <tbody>
                <tr>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.role}</td>
                  <td>
                    <button
                      onClick={() => updateRole(e._id)}
                      className="common-btn"
                    >
                      Update Role
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </Layout>
  );
};

export default AdminUsers;