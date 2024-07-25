import React, { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import { CategoryBooks } from "./CategoryBooks";
import sharedStyles from "./SharedLibraryStyles.module.css";
import libraryStyles from "./WebView.module.css";

const historyBooks = [
  {
    name: "History Book 1",
    image: "/assets/book-imgs/history-book1.png",
    description: "Description for History Book 1",
    url: "/assets/books/history-book1.pdf"
  },
  // Add more books as needed
];

export function HistoryBooks() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${sharedStyles.LibraryContainer} ${libraryStyles.WebView}`}>
      {webViewUrl ? (
        <div className={libraryStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="History Book" />
        </div>
      ) : (
        <CategoryBooks books={historyBooks} openWebView={openWebView} />
      )}
    </div>
  );
}
