import React, { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import { CategoryBooks } from "./CategoryBooks";
import sharedStyles from "./SharedLibraryStyles.module.css";
import libraryStyles from "./WebView.module.css";

const bedTimeStories = [
  {
    name: "Bed Time Stories 1",
    image: "/assets/book-imgs/bed-time-stories-1.png",
    description: "Description for Bed Time Stories 1",
    url: "/assets/books/bed-time-stories-1.pdf"
  },
  // Add more books as needed
];

export function BedTimeStories() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${sharedStyles.LibraryContainer} ${libraryStyles.WebView}`}>
      {webViewUrl ? (
        <div className={libraryStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Bed Time Stories Book" />
        </div>
      ) : (
        <CategoryBooks books={bedTimeStories} openWebView={openWebView} />
      )}
    </div>
  );
}
