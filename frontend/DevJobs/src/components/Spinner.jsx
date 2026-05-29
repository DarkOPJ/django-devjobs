import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Spinner = ({loading}) => {
  return <PuffLoader color="#9054bb" size={80} speedMultiplier={1} loading={loading} />;
};

export default Spinner;
