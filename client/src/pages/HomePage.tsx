import React, { useEffect, useState } from "react";
import UrlShortenerForm from "../components/UrlShortenerForm";
import LinksTable from "../components/LinksTable";
import userAxiosInstance from "../interceptors/userInterceptors";
import { fetchUrl, ShortenedUrl } from "../types/url";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const navigate = useNavigate();

  const localhostURL = import.meta.env.VITE_LIVE_URL;

  const fetchUrl = async () => {
    try {
      const response = await userAxiosInstance.get(`${localhostURL}/get-urls`);
      if (response.status === 200) {
        const transformedUrls = response.data.map((url: fetchUrl) => ({
          shortLink: url.shortUrl,
          originalLink: url.longUrl,
          createdAt: url.createdAt,
        }));
        setUrls(transformedUrls);
      }
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  const handleUrlSubmit = async (url: string) => {
    try {
      const response = await userAxiosInstance.post(`${localhostURL}/add-url`, {
        url: url,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        const transformedUrl: ShortenedUrl = {
          shortLink: response.data.data.shortUrl,
          originalLink: response.data.data.longUrl,
          createdAt: response.data.data.createdAt,
        };
        setUrls((prevUrls) => [transformedUrl, ...prevUrls]);
      }
    } catch (error) {
      console.error("Error submitting URL:", error);
    }
  };

  const handleDeleteUrl = async (shortLink: string) => {
    try {
      const response = await userAxiosInstance.delete(
        `${localhostURL}/delete-url`,
        { data: { shortUrl: shortLink } }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setUrls((prevUrls) =>
          prevUrls.filter((url) => url.shortLink !== shortLink)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting URL:", error);
      toast.error("Error deleting URL");
    }
  };

  const handleEditUrl = async (shortLink: string, newOriginalLink: string) => {
    try {
      const response = await userAxiosInstance.put(`${localhostURL}/edit-url`, {
        shortUrl: shortLink,
        longUrl: newOriginalLink,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setUrls((prevUrls) =>
          prevUrls.map((url) =>
            url.shortLink === shortLink
              ? { ...url, originalLink: newOriginalLink }
              : url
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error editing URL");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    toast.success("Logout successfully");
    navigate("/");
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return (
    <div className="min-h-screen bg-[#020817] text-white p-6 relative">
      {/* Logout Icon */}
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="text-white hover:text-red-500 transition duration-300 flex items-center"
          title="Logout"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
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

        <UrlShortenerForm handleUrlSubmit={handleUrlSubmit} />

        <LinksTable
          urls={urls}
          onDeleteUrl={handleDeleteUrl}
          onEditUrl={handleEditUrl}
        />
      </div>
    </div>
  );
};

export default HomePage;
