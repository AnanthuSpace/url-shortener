import React from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        <AlertTriangle className="mx-auto h-24 w-24 text-yellow-500" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-blue-600 text-transparent bg-clip-text">
          404
        </h1>
        <h2 className="text-3xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition duration-150 ease-in-out"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
