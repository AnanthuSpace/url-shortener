import { ShortenedUrl } from "../types/url";
import { Copy, Link2, XCircle } from "lucide-react";

const demoData: ShortenedUrl[] = [
  {
    shortLink: "https://linkly.com/Bn41aCOlnxj",
    originalLink: "https://www.twitter.com/tweets/BerelColhu/",
    platform: "twitter",
    qrCode: "/placeholder.svg?height=100&width=100",
    clicks: 1313,
    status: "active",
    date: "Oct - 10 2023",
  },
  {
    shortLink: "https://linkly.com/Bn41aCOlnxj",
    originalLink: "https://www.youtube.com/watch?v=8JTZmHO/Xuk",
    platform: "youtube",
    qrCode: "/placeholder.svg?height=100&width=100",
    clicks: 4313,
    status: "inactive",
    date: "Oct - 08 2023",
  },
];

const LinksTable: React.FC = () => {
  return (
    <div className="rounded-lg border bg-background/50 border-muted overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-muted">
            <th className="text-left p-4">Short Link</th>
            <th className="text-left p-4">Original Link</th>
            <th className="text-left p-4">QR Code</th>
            <th className="text-left p-4">Clicks</th>
            <th className="text-left p-4">Status</th>
            <th className="text-right p-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {demoData.map((url, i) => (
            <tr key={i} className="border-b border-muted last:border-b-0">
              <td className="p-4">
                <div className="flex items-center gap-2">
                  {url.shortLink}
                  <button className="p-1 hover:bg-muted/50 rounded">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    <img
                      src={`/placeholder.svg?height=24&width=24`}
                      alt={url.platform}
                      className="w-4 h-4"
                    />
                  </div>
                  {url.originalLink}
                </div>
              </td>
              <td className="p-4">
                <img
                  src={url.qrCode}
                  alt="QR Code"
                  className="w-8 h-8 rounded"
                />
              </td>
              <td className="p-4">{url.clicks}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      url.status === "active" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  />
                  <span
                    className={
                      url.status === "active"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }
                  >
                    {url.status.charAt(0).toUpperCase() + url.status.slice(1)}
                  </span>
                  <button className="p-1 hover:bg-muted/50 rounded">
                    {url.status === "active" ? (
                      <Link2 className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </td>
              <td className="p-4 text-right">{url.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinksTable;
