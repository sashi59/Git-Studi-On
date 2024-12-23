import React, { useState } from "react";
import Layout from "./Layout";
import { useNavigate, Link, data } from "react-router-dom";
import toast from "react-hot-toast";
import { CourseData } from "../context/CourseContext";
import { server } from "../App";
import { UserData } from "../context/UserContext";
import axios from "axios";

const categories = [
  "Web Development",
  "Data Structures & Algorithms",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
  "Other",
];

const AdminCourses = ({ user }) => {
  const { courses, fetchCourses } = CourseData();
  const { isAuth } = UserData();
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(file);
      setImagePrev(reader.result);
    };
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      setBtnLoading(true); // Start loading state
      try {
        // Await the delete request
        const { data } = await axios.delete(
          `${server}/api/admin/course/${id}`,
          {
            headers: {
              token: localStorage.getItem("token"), // Include token for authentication
            },
          }
        );

        await fetchCourses(); // Refresh the courses list after successful deletion
        toast.success(data.message); // Display success message
      } catch (error) {
        console.error("Error deleting course:", error.message); // Log the error for debugging
        toast.error(
          error?.response?.data?.message || "Failed to delete course"
        ); // Display user-friendly error
      } finally {
        setBtnLoading(false); // Stop loading state
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/admin/create`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Layout>
      <div className="admin-courses">
        <div className="left">
          <h1 className="text-center text-5xl text-neutral">All Courses</h1>
          <div className="dashboard-content">
            {courses && courses.length > 0 ? (
              courses.map((course, index) => {
                return (
                  <div
                    className="bg-slate-100 p-7 rounded-md shadow-md m-5 max-w-96 hover:bg-slate-200"
                    key={course.id || index} // Use course.id if it exists; otherwise, fallback to index
                  >
                    <figure className="px-2 pt-2 mb-5">
                      <img
                        src={`${server}/${course.image}`}
                        alt="Shoes"
                        className="rounded-xl hover:scale-105 transition-all"
                      />
                    </figure>

                    <h2 className="text-3xl text-center text-black">
                      {course.title}
                    </h2>
                    <br />
                    <p>{course.description}</p>
                    <br />
                    {isAuth ? (
                      <>
                        {user && user.role === "admin" ? (
                          <>
                            <button className="btn bg-blue-600 text-white text-lg hover:bg-blue-800">
                              <Link to={`/course/study/${course._id}`}>
                                Study
                              </Link>
                            </button>
                            <button
                              onClick={() => deleteHandler(course?._id)}
                              className="btn bg-red-500 text-white text-lg hover:bg-red-700 ml-3"
                              disabled={btnLoading} // Disable the button during loading
                            >
                              {btnLoading ? "Deleting..." : "Delete"}
                            </button>
                          </>
                        ) : (
                          <>
                            {user?.subscription?.includes(course._id) ? (
                              <button
                                onClick={() =>
                                  navigate(`/course/study/${course._id}`)
                                }
                                className="btn bg-blue-600 text-white text-lg hover:bg-blue-800"
                              >
                                Study
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  navigate(`/course/${course._id}`)
                                }
                                className="btn bg-green-400 text-black text-lg hover:bg-green-600"
                              >
                                Enroll Now
                              </button>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <button className="btn bg-green-400 text-black text-lg hover:bg-green-600">
                        <Link to={"/signin"}>Enroll Now</Link>
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <p>No Courses Yet</p>
            )}
          </div>
        </div>

        <div className="right">
          <div className="add-course">
            <div className="course-form">
              <h2 className="text-center text-4xl text-neutral">Add Course</h2>
              <form onSubmit={submitHandler}>
                <label htmlFor="text">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <label htmlFor="text">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

                <label htmlFor="text">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />

                <label htmlFor="text">createdBy</label>
                <input
                  type="text"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  required
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value={""}>Select Category</option>
                  {categories.map((e) => (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  ))}
                </select>

                <label htmlFor="text">Duration</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />

                <input type="file" required onChange={changeImageHandler} />
                {imagePrev && <img src={imagePrev} alt="" width={300} />}

                <button
                  type="submit"
                  disabled={btnLoading}
                  className="common-btn"
                >
                  {btnLoading ? "Please Wait..." : "Add"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
