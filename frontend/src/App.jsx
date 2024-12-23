import { Toaster } from "react-hot-toast";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Verify from "./pages/auth/Verify";
import { Homepage } from "./pages/home/Homepage";
import { Route, Routes } from "react-router-dom";
import Account from "./pages/account/Account";
import { UserData } from "./context/UserContext";
import Course from "./pages/course/Course";
import CourseDescription from "./pages/course/CourseDescription";
import About from "./pages/about/About";
import CourseStudy from "./pages/course/CourseStudy";
import SeeLectures from "./pages/seelectures/SeeLectures";
import AdminDashboard from "./admin/AdminDashboard";
import AdminCourses from "./admin/AdminCourses";
import AdminUsers from "./admin/AdminUsers";
import PaymentSuccess from "./pages/payment/PaymentSuccess";

export const server = "http://localhost:5000"

function App() {
  const { isAuth, user, loading } = UserData();

  return (
    <>
      {loading ? (
        <span
          className="loading loading-spinner loading-lg"
          style={{ width: "74px", marginLeft: "46%", height: "95vh" }}
        ></span>
      ) : (
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/signup"
              element={isAuth ? <Homepage /> : <Signup />}
            />
            <Route
              path="/signin"
              element={isAuth ? <Homepage /> : <Signin />}
            />
            <Route
              path="/verify"
              element={isAuth ? <Homepage /> : <Verify />}
            />
            <Route
              path="/account"
              element={!isAuth ? <Signin /> : <Account user={user} />}
            />
            <Route path="/course" element={<Course />} />
            <Route
              path="/course/:id"
              element={isAuth ? <CourseDescription /> : <Signin />}
            />
            <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Signin />}
            />
            <Route
              path="/course/lectures/:id"
              element={isAuth ? <SeeLectures user={user} /> : <Signin />}
            />
            <Route path="/payment-success/:id" element={isAuth ? <PaymentSuccess user={user} /> : <Signin />}/>
            <Route
              path="/admin/dashboard"
              element={
                isAuth && user.role === "admin" ? (
                  <AdminDashboard user={user} />
                ) : (
                  <Homepage />
                )
              }
            />
            <Route
              path="/admin/course"
              element={
                isAuth && user.role === "admin" ? (
                  <AdminCourses user={user} />
                ) : (
                  <Homepage />
                )
              }
            />
            <Route
              path="/admin/users"
              element={
                isAuth && user.role === "admin" ? (
                  <AdminUsers user={user} />
                ) : (
                  <Homepage />
                )
              }
            />

            <Route path="/about" element={<About />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
          <Toaster />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
