import { Spinner } from "flowbite-react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex w-full justify-center items-center min-h-screen">
      <Spinner size="xl" />
    </div>
  );
};

export default LoadingSpinner;
