import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../App";
import axios from "axios";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [mycourse, setMyCourse] = useState([]);

  async function fetchCourses() {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);
      setCourses(data.allCourse);
    } catch (error) {
      console.log("Error in fetchCourses", error);
    }
  }
  async function fetchCourse(id) {
    try {
      const { data } = await axios.get(`${server}/api/course/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.log("Error in fetchCourse", error);
    }
  }
  async function fetchMyCourse() {
    try {
      const { data } = await axios.get(`${server}/api/course/mycourse`);
      setMyCourse(data.myCourses);
    } catch (error) {
      console.log("Error in fetchMyCourse", error);
    }
  }

  useEffect(() => {
    fetchCourses();
    // fetchMyCourse();
    // eslint-disable-next-line
  }, []);
  return <CourseContext.Provider value={{fetchCourses, fetchMyCourse, fetchCourse, course, courses, mycourse}}>{children}</CourseContext.Provider>;
};

export const CourseData = () => useContext(CourseContext);
