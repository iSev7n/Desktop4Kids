import React, { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import { CategoryBooks } from "./CategoryBooks";
import sharedStyles from "./SharedLibraryStyles.module.css";
import libraryStyles from "./WebView.module.css";

const scienceBooks = [
  {
    name: "Science Book 1",
    image: "/assets/book-imgs/science-book1.png",
    description: "Description for Science Book 1",
    url: "/assets/books/science-book1.pdf"
  },
  // Add more books as needed
];

export function ScienceBooks() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${sharedStyles.LibraryContainer} ${libraryStyles.WebView}`}>
      {webViewUrl ? (
        <div className={libraryStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Science Book" />
        </div>
      ) : (
        <CategoryBooks books={scienceBooks} openWebView={openWebView} />
      )}
    </div>
  );
}
