import React from "react";

const page = () => {
  return (
    <main
      className="root-container flex min-h-screen flex-col items-center
     justify-center"
    >
      <h1
        className="dont-bebas-neue text-5xl font-bold 
      text-light-100"
      >
        Too Many Requests
      </h1>
      <p className="mt-3 max-w-xl text-center text-light-400">
        You have exceeded the number of allowed requests. Please try again later.
      </p>
    </main>
  );
};

export default page;
