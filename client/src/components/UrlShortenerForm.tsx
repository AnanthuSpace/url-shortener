import { Link } from "lucide-react";
import React, { useState } from "react";

interface UrlShortenerFormProps {
  handleUrlSubmit: (url: string) => void; 
}

const UrlShortenerForm: React.FC<UrlShortenerFormProps> = ({ handleUrlSubmit }) => {
  const [url, setUrl] = useState<string>("");

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    if (url.trim()) {
      handleUrlSubmit(url); 
      setUrl("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Link className="h-5 w-5" />
        </div>
        <input
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          className="w-full pl-10 pr-24 py-3 bg-background/50 border border-muted rounded-full text-black"
          placeholder="Enter the link here"
        />
        <button
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
          onClick={onSubmit}
        >
          Shorten Now!
        </button>
      </div>
      <div className="text-center text-sm text-muted-foreground pt-4">
        <p className="font-medium">
          Quickly shorten your links and track their performance with ease.
        </p>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Experience the power of simplicity and efficiency in link management.
        </p>
      </div>
    </div>
  );
};

export default UrlShortenerForm;
