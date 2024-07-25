import React, { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import { CategoryBooks } from "./CategoryBooks";
import sharedStyles from "./SharedLibraryStyles.module.css";
import libraryStyles from "./WebView.module.css";

const shortStories = [
  {
    name: "Short Stories 1",
    image: "/assets/book-imgs/short-stories-1.png",
    description: "Description for Short Stories 1",
    url: "/assets/books/short-stories-1.pdf"
  },
  // Add more books as needed
];

export function ShortStories() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${sharedStyles.LibraryContainer} ${libraryStyles.WebView}`}>
      {webViewUrl ? (
        <div className={libraryStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Short Stories" />
        </div>
      ) : (
        <CategoryBooks books={shortStories} openWebView={openWebView} />
      )}
    </div>
  );
}
