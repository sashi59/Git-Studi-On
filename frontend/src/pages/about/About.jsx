import React from "react";

const About = () => {
  return (
    <div className="artboard artboard-horizontal  text-black p-10">
      <h1 className="text-center text-4xl font-bold ">
        About Us - Studi-On LMS
      </h1>
      <br />
      <div className="text lg:pl-48 lg:pr-48">
        <p>
          Welcome to Studi-On LMS, your one-stop solution for seamless online
          teaching and learning! At Studi-On, we believe in the power of
          education to transform lives. Our platform is designed to connect
          passionate educators with eager learners, creating a collaborative
          space for knowledge sharing. Whether you re a teacher looking to
          deliver engaging courses or a student seeking to master new skills,
          Studi-On LMS is built to meet your needs.
          <br />
          <br />
          What We Offer:
          <br />
          For Educators:
        </p>
        <li>
          Intuitive tools to create, manage, and deliver courses effortlessly.
        </li>
        <li>
          Customizable dashboards for tracking student progress and performance.
        </li>
        <li>
          Secure payment integrations for hassle-free course monetization.
        </li>
        For Learners:
        <li>Access to a wide range of courses across various fields.</li>
        <li>
          Interactive and engaging learning experiences with videos, quizzes,
          and resources.
        </li>
        <li>Flexibility to learn anytime, anywhere, at your own pace.</li>
      </div>
    </div>
  );
};

export default About;
