import React, { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../App";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";

const CourseDescription = () => {
  const params = useParams();
  const { user } = UserData();
  const { course, fetchCourse, fetchCourses, fetchMyCourse } = CourseData();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      // Step 1: Create an order
      const {
        data: { order },
      } = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        {
          headers: {
            token,
          },
        }
      );
      // console.log("data razo", order);

      // Step 2: Razorpay options
      const options = {
        key: "rzp_test_ifK73RZIWjtA5f", // Replace with your Razorpay Key ID
        amount: order.amount, // Amount in subunits (e.g., paise)
        currency: "INR",
        name: "Studi-On LMS",
        description: "Learn with us and Join Our Team ❤️",
        order_id: order.id, // Order ID from Razorpay response

        handler: async function (response) {
          console.log("response", response)
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;
            console.log(" razorpay_order_id, razorpay_payment_id, razorpay_signature",  razorpay_order_id, razorpay_payment_id, razorpay_signature)

          try {
            // Step 3: Verify the payment
            const { data } = await axios.post(
              `${server}/api/course/verification/${params.id}`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              {
                headers: {
                  token,
                },
              }
            );

            await fetchCourses();
            await fetchMyCourse();
            toast.success(data.message);
            setLoading(false);
            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            toast.error(error?.response?.data?.message || "Payment verification failed.");
            setLoading(false);
          }
        },
        theme: {
          color: "#032f61",
        },
      };

      // Step 4: Initialize Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to initiate payment");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse(params?.id);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <span
          className="loading loading-spinner loading-lg"
          style={{ width: "80px", marginLeft: "50%", height: "100vh" }}
        ></span>
      ) : (
        <div
          style={{ display: "flex ", justifyContent: "center", margin: "12vh" }}
        >
          <div
            className={`card lg:card-side bg-slate-100 shadow-xl lg:p-123 sm:p-4 flex justify-center items-center hover:bg-slate-200`}
            style={{ maxWidth: "50vw" }}
          >
            <figure>
              <img
                src={`${server}/${course.image}`}
                alt="Course Image"
                className="rounded-lg hover:scale-105 transition-all"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-neutral text-2xl">
                {course.title}
              </h2>
              <p className="text-neutral text-sm " style={{ maxWidth: "40vh" }}>
                {course.description}
              </p>
              <p className="text-neutral text-sm ">
                Price - ₹{course.price}
              </p>
              <p className="text-neutral text-sm ">
                Duration - {course.duration} weeks
              </p>
              <p className="text-neutral text-sm ">
                Category - {course.category}
              </p>
              <p className="text-neutral text-sm ">
                Created By - {course.createdBy}
              </p>

              {user?.subscription?.includes(course._id) ? (
                <div className="card-actions justify-end text-neutral">
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="btn btn-neutral text-black hover:bg-green-500"
                  >
                    Study
                  </button>
                </div>
              ) : (
                <div className="card-actions justify-end text-neutral">
                  <button
                    onClick={checkoutHandler}
                    className="btn bg-green-400 text-black hover:bg-green-500"
                  >
                    Buy Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDescription;
