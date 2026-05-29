import React from "react";
import { Link } from "react-router-dom";

const FromEmployerCard = ({bg='bg-gray-100', heading="For Job Hunters", info='Browse your favorite jobs and start your career today', btnBg='bg-black', btnTxt='Browse Jobs', btnLink="/jobs"}) => {
  return (
    <div className={`${bg} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="mt-2 mb-4">
        {info}
      </p>
      <Link
        to={btnLink}
        className={`${btnBg} inline-block text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {btnTxt}
      </Link>
    </div>
  );
};

export default FromEmployerCard;
