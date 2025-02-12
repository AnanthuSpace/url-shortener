import { Link } from "lucide-react";
import React, { useState } from "react";

interface UrlShortenerFormProps {
  handleUrlSubmit: (url: string, alias?: string, topic?: string) => void;
}

const UrlShortenerForm: React.FC<UrlShortenerFormProps> = ({
  handleUrlSubmit,
}) => {
  const [url, setUrl] = useState<string>("");
  const [customAlias, setCustomAlias] = useState<string>("");
  const [topic, setTopic] = useState<string>("");

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (url.trim()) {
      handleUrlSubmit(
        url,
        customAlias.trim() ? customAlias : "",
        topic.trim() ? topic : ""
      );
      setUrl("");
      setCustomAlias("");
      setTopic("");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      <div className="flex items-center gap-2 bg-white/90 border border-gray-300 rounded-full p-2 shadow-sm">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Link className="h-5 w-5" />
          </div>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full pl-10 pr-3 py-3 bg-transparent border border-gray-300 rounded-full outline-none text-gray-900 placeholder-gray-500"
            placeholder="Enter the original link here"
          />
        </div>

        <input
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
          className="w-1/5 min-w-[120px] px-3 py-3 bg-transparent border border-gray-300 rounded-full outline-none text-gray-900 placeholder-gray-500"
          placeholder="Custom alias (optional)"
        />

        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-1/5 min-w-[120px] px-3 py-3 bg-transparent border border-gray-300 rounded-full outline-none text-gray-900 placeholder-gray-500"
          placeholder="Topic (optional)"
        />

        <button
          className="w-1/10 min-w-[80px] bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition duration-200"
          onClick={onSubmit}
        >
          Shorten
        </button>
      </div>

      <div className="text-center text-sm text-gray-600 pt-4">
        <p className="font-medium">
          Quickly shorten your links and organize them with custom names and
          topics.
        </p>
      </div>
    </div>
  );
};

export default UrlShortenerForm;
