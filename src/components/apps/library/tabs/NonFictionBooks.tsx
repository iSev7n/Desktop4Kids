import React, { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import { CategoryBooks } from "./CategoryBooks";
import sharedStyles from "./SharedLibraryStyles.module.css";
import libraryStyles from "./WebView.module.css";

const nonFictionBooks = [
  {
    name: "Non-Fiction Book 1",
    image: "/assets/book-imgs/non-fiction-book1.png",
    description: "Description for Non-Fiction Book 1",
    url: "/assets/books/non-fiction-book1.pdf"
  },
  // Add more books as needed
];

export function NonFictionBooks() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${sharedStyles.LibraryContainer} ${libraryStyles.WebView}`}>
      {webViewUrl ? (
        <div className={libraryStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Non-Fiction Book" />
        </div>
      ) : (
        <CategoryBooks books={nonFictionBooks} openWebView={openWebView} />
      )}
    </div>
  );
}
