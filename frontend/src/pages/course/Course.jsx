import React from "react";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../App";
import { UserData } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Course = () => {
  const { courses } = CourseData();
  const { user, isAuth } = UserData();
  const navigate = useNavigate();
  return (
    <>
      <br />
      <h1 className="text-center  lg:text-6xl text-neutral lg:mt-7 avail-course" >
        Available Courses
      </h1>
      <br />
      <div className="flex flex-wrap gap-3 justify-center">
        <br />
        {courses.map((course, index) => (
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

            <h2 className="text-3xl text-center text-black">{course.title}</h2>
            <br />
            <p>{course.description}</p>
            <br />
            {isAuth ? (
              <>
                {user && user.role === "admin" ? (
                  <>
                    <button className="btn bg-blue-600 text-white text-lg hover:bg-blue-800">
                      <Link to={`/course/study/${course._id}`}>Study</Link>
                    </button>
                    <button className="btn bg-red-500 text-white text-lg hover:bg-red-700 ml-3">
                      <Link to={`/course/delete/${course._id}`}>Delete</Link>
                    </button>
                  </>
                ) : (
                    <>
                    {user?.subscription?.includes(course._id) ? (
                      <button
                        onClick={() => navigate(`/course/study/${course._id}`)}
                        className="btn bg-blue-600 text-white text-lg hover:bg-blue-800"
                      >
                        Study
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/course/${course._id}`)}
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
        ))}
      </div>
      <br />
      <br />
    </>
  );
};

export default Course;
