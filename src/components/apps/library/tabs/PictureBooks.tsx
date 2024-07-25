import React, { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import { CategoryBooks } from "./CategoryBooks";
import sharedStyles from "./SharedLibraryStyles.module.css";
import libraryStyles from "./WebView.module.css";

const pictureBooks = [
  {
    name: "Picture Book 1",
    image: "/assets/book-imgs/picture-book1.png",
    description: "Description for Picture Book 1",
    url: "/assets/books/picture-book1.pdf"
  },
  // Add more books as needed
];

export function PictureBooks() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${sharedStyles.LibraryContainer} ${libraryStyles.WebView}`}>
      {webViewUrl ? (
        <div className={libraryStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Picture Book" />
        </div>
      ) : (
        <CategoryBooks books={pictureBooks} openWebView={openWebView} />
      )}
    </div>
  );
}
