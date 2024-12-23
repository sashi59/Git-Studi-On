import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../App";

const CourseStudy = ({user}) => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(id))
    return navigate("/");``

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`${server}/api/course/${id}`);
        setCourse(data.course);
      } catch (error) {
        console.error("Failed to fetch course details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Failed to load course details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-10">
      <div className="card lg:card-side bg-slate-100 shadow-xl p-6 rounded-lg max-w-4xl hover:bg-slate-200">
        <figure className="w-full lg:w-1/3">
          <img
            src={`${server}/${course.image}`}
            alt={course.title}
            className="rounded-lg object-cover w-fulllg:h-full"
          />
        </figure>
        <div className="card-body w-full lg:w-2/3 flex flex-col justify-between">
          <h2 className="card-title text-3xl text-neutral font-bold mb-4">
            {course.title}
          </h2>
          <p className="text-neutral text-lg mb-4">{course.description}</p>
          <p className="text-neutral text-md font-semibold mb-2">
            Duration: {course.duration} weeks
          </p>
          <p className="text-neutral text-md font-semibold mb-2">
            Category: {course.category}
          </p>
          <div className="card-actions justify-end">
            {/* here it will redirect to See Lectures page */}
            <button
              onClick={() => navigate(`/course/lectures/${course._id}`)}
              className="btn bg-blue-500 hover:bg-blue-600 text-white"
            >
              See Lectures
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStudy;
