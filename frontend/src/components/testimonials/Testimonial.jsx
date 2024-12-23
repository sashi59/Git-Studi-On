import React from "react";


const Testimonial = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 4,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];
  return (
    <>
        <h1 className="text-4xl text-center p-10 text-neutral">What our students say</h1>
    <div className="flex flex-wrap gap-4 justify-center">
      
        {testimonialsData.map((t) => (
          <div
            className="card bg-slate-100 m-5 max-w-96 shadow-xl text-black"
            key={t.id}
          >
            <figure className="px-10 pt-10">
              <div className="avatar">
                <div className="mask mask-squircle w-24">
                  <img src={t.image} className="h-44"/>
                </div>
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-color-blue">{t.name}</h2>
              <p>{t.message}</p>
              <div className="card-actions">
                <h3 className="text-2xl text-color-blue ">{t.position}</h3>
              </div>
            </div>
          </div>
        ))}
     
    </div>
    <br />
    </>
  );
};

export default Testimonial;
