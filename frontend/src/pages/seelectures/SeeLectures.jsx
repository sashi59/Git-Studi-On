import React, { useEffect, useRef, useState } from "react";
import { Form, Link, useParams } from "react-router-dom";
import { LectureData } from "../../context/LectureContext";
import { FaTrash } from "react-icons/fa";
import { server } from "../../App";
import "./seeLecture.css";
import axios from "axios";
import toast from "react-hot-toast";

const SeeLectures = ({ user }) => {
  const params = useParams();
  const {
    fetchLectures,
    fetchLecture,
    lecture,
    lectures,
    loading,
    lecLoading,
  } = LectureData();

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [preview, setPreview] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const videoRef = useRef(null); // Reference for the video element

  const handlePreview = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please upload a valid video file");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreview(reader.result);
      setVideo(file);
    };
  };

  const handelForm = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setBtnLoading(true);

    const myform = new FormData(); // Use FormData to create a form-like structure
    myform.append("title", title);
    myform.append("description", description);
    myform.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/admin/${params.id}`,
        myform,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
            token: localStorage.getItem("token"), // Your authorization token
          },
        }
      );

      toast.success(data.message);
      setShow(false); // Close the form
      fetchLectures(params.id); // Refresh the lecture list
      setTitle(""); // Reset the title input
      setDescription(""); // Reset the description input
      setVideo(""); // Reset the video file input
      setPreview(""); // Reset the video preview
    } catch (error) {
      console.error(
        "Error in handling request form add lecture",
        error.message
      );
      toast.error(error?.response?.data?.message || "Failed to upload lecture");
    } finally {
      setBtnLoading(false); // Reset the loading state
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete")) {
      try {
        const { data } = await axios.delete(
          `${server}/api/admin/lecture/${id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success(data.message);
        fetchLectures(params.id); // Refresh the lecture list
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    fetchLectures(params.id); // course id
    // fetchLecture(lecture._id)
  }, []);

  // Handle spacebar for play/pause
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && videoRef.current) {
        e.preventDefault(); // Prevent default scrolling behavior
        if (videoRef.current.paused) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown); // Cleanup listener
  }, []);

  return (
    <>
      {loading ? (
        <span
          className="loading loading-spinner loading-lg"
          style={{ width: "74px", marginLeft: "46%", height: "95vh" }}
        ></span>
      ) : (
        <div className="lecture-page text-black p-5">
          <div className="left">
            {lecLoading ? (
              <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : lecture?.video ? (
              <>
                <video
                  ref={videoRef} // Attach ref to the video element
                  src={`${server}/${lecture.video}`}
                  width={"100%"}
                  controls
                  style={{ borderRadius: "7px", boxShadow: "2px 5px 5px #111" }}
                  autoPlay
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  disableRemotePlayback
                ></video>
                <h1 className=" text-3xl mt-3" style={{ fontWeight: "bold" }}>
                  Title - {lecture.title}
                </h1>
                <h2 className=" text-2xl mt-3">
                  Description - {lecture.description}
                </h2>
              </>
            ) : (
              <div className=" text-3xl lecture-view text-center ">
                Please select a Lecture
              </div>
            )}
          </div>

          <div className="right">
            {user && user.role === "admin" && (
              <button
                onClick={() => setShow(!show)}
                className={`btn  text-white ${
                  show ? "bg-red-500" : "bg-blue-500"
                }`}
                style={{ borderRadius: "5px" }}
              >
                {show ? "X Close" : "Add Lecture"}
              </button>
            )}
            {show && (
              <>
                <div>
                  <form
                    onSubmit={handelForm}
                    className=" text-black p-4 mt-2 "
                    style={{ border: "1px solid black", borderRadius: "7px" }}
                  >
                    <h2 className="text-2xl font-bold text-center ">
                      Add Lecture
                    </h2>
                    <label className="input input-bordered flex items-center gap-2">
                      Title
                      <input
                        type="text"
                        className="grow"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                      Description
                      <input
                        type="text"
                        className="grow"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxlength="255" // Limit the description to 255 characters
                      />
                    </label>

                    <input
                      type="file"
                      placeholder="choose lecture"
                      onChange={handlePreview}
                    />

                    {preview && (
                      <video
                        src={preview}
                        alt=""
                        muted
                        controls
                        controlsList="nodownload noremoteplayback"
                      ></video>
                    )}

                    <button
                      className="btn bg-green-400 text-white mt-2 w-full hover:bg-green-500 "
                      disabled={btnLoading}
                      type="submit"
                    >
                      {btnLoading ? "Please wait..." : "Upload"}
                    </button>
                  </form>
                </div>
              </>
            )}

            {lectures && lectures.length > 0 ? (
              lectures.map((e, i) => (
                <div className="relative" key={e._id}>
                  {" "}
                  {/* Place the key here */}
                  <div
                    onClick={() => fetchLecture(e._id)} // Corrected onClick handler
                    className={`lecture-number flex  ${
                      lecture._id === e._id ? "active" : ""
                    }`}
                  >
                    {i + 1}. {e.title}
                  </div>
                  <div>
                    {user && user.role === "admin" && (
                      <FaTrash
                        onClick={() => deleteHandler(e._id)}
                        className="text-red-400 text-2xl hover:scale-125 hover:text-red-800 absolute bottom-3 right-3"
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <h1>No Lecture yet !!</h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SeeLectures;
