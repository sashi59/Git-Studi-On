import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="hero bg-slate-100 min-h-96 pt-48 pb-48">
  <div className="hero-content flex-col lg:flex-row-reverse text-black">
    <img
      src="https://media.istockphoto.com/id/1460007178/photo/library-books-on-table-and-background-for-studying-learning-and-research-in-education-school.jpg?s=612x612&w=0&k=20&c=OV_sdclWUExHy0VKPeZwyen2mO6g1NwAIBbLPT_Hd30="
      className="max-w-sm rounded-lg shadow-3xl min-h-64 min-w-96" />
    <div >
      <h1 className="text-5xl font-bold">Studi-On LMS</h1>
      <p className="py-6 text-2xl">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn btn-neutral text-white "><Link to={"/course"}>Get Started!!</Link></button>
    </div>
  </div>
</div>
  )
}

export default Hero