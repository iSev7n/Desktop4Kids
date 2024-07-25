import React, { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import { CategoryBooks } from "./CategoryBooks";
import sharedStyles from "./SharedLibraryStyles.module.css";
import libraryStyles from "./WebView.module.css"; // Import as a CSS module
import { Vector2 } from "../../../../features/math/vector2"; // Update the path if needed

const fictionBooks = [
  {
    name: "Childrens Encyclopedia",
    image: "/assets/book-imgs/fiction-book1.png",
    description: "The Book The Explains Everything",
    url: "https://desktop4kids.com/w_backup/3d-flip-book/316/"
  },
  {
    name: "Fiction Book 2",
    image: "/assets/book-imgs/fiction-book2.png",
    description: "Description for Fiction Book 2",
    url: "/assets/books/fiction-book2.pdf"
  },
  {
    name: "Fiction Book 3",
    image: "/assets/book-imgs/fiction-book3.png",
    description: "Description for Fiction Book 3",
    url: "/assets/books/fiction-book3.pdf"
  },
];

export function FictionBooks() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${sharedStyles.LibraryContainer} ${libraryStyles.WebView}`}>
      {webViewUrl ? (
        <div className={libraryStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Fiction Book" />
        </div>
      ) : (
        <CategoryBooks books={fictionBooks} openWebView={openWebView} />
      )}
    </div>
  );
}
