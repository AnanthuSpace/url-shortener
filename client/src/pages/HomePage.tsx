import React, { useEffect, useState } from "react";
import UrlShortenerForm from "../components/UrlShortenerForm";
import LinksTable from "../components/LinksTable";
import userAxiosInstance from "../interceptors/userInterceptors";
import { ShortenedUrl } from "../types/url";

const HomePage: React.FC = () => {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);

  const localhostURL = import.meta.env.VITE_LOCAL_HOST;

  const fetchUrl = async () => {
    try {
      const response = await userAxiosInstance.get(`${localhostURL}/get-urls`);
      if (response.status === 200) {
        const transformedUrls = response.data.map((url) => ({
          shortLink: url.shortUrl,
          originalLink: url.longUrl,
          clicks: url.clicks,
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
        const transformedUrl: ShortenedUrl = {
          shortLink: response.data.shortUrl,
          originalLink: response.data.longUrl,
          clicks: response.data.clicks,
          createdAt: response.data.createdAt,
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
        setUrls((prevUrls) =>
          prevUrls.filter((url) => url.shortLink !== shortLink)
        );
      }
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  const handleEditUrl = async (shortLink: string, newOriginalLink: string) => {
    try {
      const response = await userAxiosInstance.put(`${localhostURL}/edit-url`, {
        shortUrl: shortLink,
        longUrl: newOriginalLink,
      });
      if (response.status === 200) {
        setUrls((prevUrls) =>
          prevUrls.map((url) =>
            url.shortLink === shortLink
              ? { ...url, originalLink: newOriginalLink }
              : url
          )
        );
      }
    } catch (error) {
      console.error("Error editing URL:", error);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);

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
