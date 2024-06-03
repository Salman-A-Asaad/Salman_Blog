import React from "react";

const Error = ({ error }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-red-600 text-2xl font-bold">{error.message}</h1>
    </div>
  );
};

export default Error;
