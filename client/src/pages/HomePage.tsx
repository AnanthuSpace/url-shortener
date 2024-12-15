import React from "react";
import UrlShortenerForm from "../components/UrlShortenerForm";
import LinksTable from "../components/LinksTable";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020817] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-12">

        <div className="text-center space-y-4 pt-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-blue-600 text-transparent bg-clip-text">
            Shorten Your Loooong Links :)
          </h1>
          <p className="text-muted-foreground">
            Linkly is an efficient and easy-to-use URL shortening service that
            streamlines your online experience.
          </p>
        </div>

        <UrlShortenerForm />

        <LinksTable />
      </div>
    </div>
  );
};

export default HomePage;
