import React, { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import { CategoryBooks } from "./CategoryBooks";
import sharedStyles from "./SharedLibraryStyles.module.css";
import libraryStyles from "./WebView.module.css";

const fairyTaleBooks = [
  {
    name: "Fairy Tale Book 1",
    image: "/assets/book-imgs/fairy-tale-book1.png",
    description: "Description for Fairy Tale Book 1",
    url: "/assets/books/fairy-tale-book1.pdf"
  },
  // Add more books as needed
];

export function FairyTaleBooks() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${sharedStyles.LibraryContainer} ${libraryStyles.WebView}`}>
      {webViewUrl ? (
        <div className={libraryStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Fairy Tale Book" />
        </div>
      ) : (
        <CategoryBooks books={fairyTaleBooks} openWebView={openWebView} />
      )}
    </div>
  );
}
