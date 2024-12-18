import React, { useState } from "react";
import { ShortenedUrl } from "../types/url";
import { Edit, Trash } from "lucide-react";
import userAxiosInstance from "../interceptors/userInterceptors";

const localhostURL = import.meta.env.VITE_LIVE_URL;

interface LinksTableProps {
  urls: ShortenedUrl[];
  onDeleteUrl: (shortLink: string) => void;
  onEditUrl: (shortLink: string, newOriginalLink: string) => void;
}

const LinksTable: React.FC<LinksTableProps> = ({
  urls,
  onDeleteUrl,
  onEditUrl,
}) => {
  const [editingUrl, setEditingUrl] = useState<string | null>(null);
  const [newOriginalLink, setNewOriginalLink] = useState<string>("");

  const handleEditClick = (shortLink: string, originalLink: string) => {
    setEditingUrl(shortLink);
    setNewOriginalLink(originalLink);
  };

  const handleSaveClick = () => {
    if (editingUrl) {
      onEditUrl(editingUrl, newOriginalLink);
      setEditingUrl(null);
      setNewOriginalLink("");
    }
  };

  const handleCancelEdit = () => {
    setEditingUrl(null);
    setNewOriginalLink("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleShortUrl = async (value: string) => {
    await userAxiosInstance.get(`${localhostURL}/redirectUrl`, {
      params: { shortUrl: value }
    }).then(res=> {
      if(res.status===200){
        window.location.href = res.data;
      }
    })

  };
  

  return (
    <div className="rounded-lg border bg-background/50 border-muted overflow-x-auto">
      {urls.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="border-b border-muted">
              <th className="text-left p-4">Short Link</th>
              <th className="text-left p-4">Original Link</th>
              <th className="text-right p-4">Date</th>
              <th className="text-right p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url, i) => (
              <tr key={i} className="border-b border-muted last:border-b-0">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-blue-500 cursor-pointer hover:underline"
                      onClick={() => handleShortUrl(url.shortLink)}
                    >
                      {url.shortLink}
                    </span>
                    <button
                      className="p-1 hover:bg-muted/50 rounded"
                      onClick={() =>
                        navigator.clipboard.writeText(url.shortLink)
                      }
                    >
                    </button>
                  </div>
                </td>

                <td className="p-4">
                  {editingUrl === url.shortLink ? (
                    <input
                      type="text"
                      value={newOriginalLink}
                      onChange={(e) => setNewOriginalLink(e.target.value)}
                      aria-label="Edit Original Link"
                      className="bg-gray-700 text-white rounded p-2 w-full outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="break-words">{url.originalLink}</span>
                  )}
                </td>

                <td className="p-4 text-right">{formatDate(url.createdAt)}</td>
                <td className="p-4 text-right">
                  {editingUrl === url.shortLink ? (
                    <div className="flex justify-end gap-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={handleSaveClick}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <button
                        className="p-2 hover:bg-muted/50 rounded"
                        title="Edit Link"
                        onClick={() =>
                          handleEditClick(url.shortLink, url.originalLink)
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-muted/50 rounded"
                        title="Delete Link"
                        onClick={() => onDeleteUrl(url.shortLink)}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-4 text-center text-muted">No records found.</div>
      )}
    </div>
  );
};

export default LinksTable;
