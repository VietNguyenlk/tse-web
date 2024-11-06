import { WarningAmber } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <WarningAmber className="mx-auto text-red-500 w-16 h-16 mb-4" />
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <h2 className="text-4xl font-bold mb-4">Oops, something went wrong.</h2>
        <p className="text-lg mb-8">
          We can't find the page you're looking for. Check the URL and try again.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
