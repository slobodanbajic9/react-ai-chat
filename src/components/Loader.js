import React from "react";
import { PulseLoader } from "react-spinners";

const Loader = () => {
  return (
    <PulseLoader
      size={30}
      className="m-10"
      color="#60a5fa"
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
