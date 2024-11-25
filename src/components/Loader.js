import React from "react";
import { PulseLoader } from "react-spinners";

const Loader = () => {
  return (
    <PulseLoader
      size={20}
      className="m-10"
      color="#1e40af"
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
