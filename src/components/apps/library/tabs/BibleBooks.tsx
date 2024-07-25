import React, { useState } from "react";
import { WebView } from "../../_utils/web-view/WebView";
import { CategoryBooks } from "./CategoryBooks";
import sharedStyles from "./SharedLibraryStyles.module.css";
import libraryStyles from "./WebView.module.css";

const bibleBooks = [
  {
    name: "Bible Comics Chapter 1",
    image: "/assets/book-imgs/bible-book1.png",
    description: "Chapter 1 - The Beginning",
    url: "https://desktop4kids.com/w_backup/3d-flip-book/332/"
  },

  {
    name: "Bible Comics Chapter 2",
    image: "/assets/book-imgs/bible-book2.png",
    description: "Chapter 2 - Abraham",
    url: "https://desktop4kids.com/w_backup/3d-flip-book/333/"
  },

  {
    name: "Bible Comics Chapter 3",
    image: "/assets/book-imgs/bible-book3.png",
    description: "Chapter 3 - Moses",
    url: "https://desktop4kids.com/w_backup/3d-flip-book/334/"
  },

  {
    name: "Bible Comics Chapter 4",
    image: "/assets/book-imgs/bible-book4.png",
    description: "Chapter 4 - Exodus",
    url: "https://desktop4kids.com/w_backup/3d-flip-book/335/"
  },

  {
    name: "Bible Comics Chapter 5",
    image: "/assets/book-imgs/bible-book5.png",
    description: "Chapter 5 - The Kingdom",
    url: "https://desktop4kids.com/w_backup/3d-flip-book/336/"
  },

  {
    name: "Bible Comics Chapter 6",
    image: "/assets/book-imgs/bible-book6.png",
    description: "Chapter 6 - Elijah",
    url: "https://desktop4kids.com/w_backup/3d-flip-book/337/"
  },

  {
    name: "Bible Comics Chapter 7",
    image: "/assets/book-imgs/bible-book7.png",
    description: "Chapter 7 - Prophecies of Christ",
    url: "https://desktop4kids.com/w_backup/3d-flip-book/338/"
  },

  {
    name: "Bible Comics Chapter 8",
    image: "/assets/book-imgs/bible-book8.png",
    description: "Chapter 8 - The New Testament",
    url: "https://desktop4kids.com/w_backup/3d-flip-book/339/"
  },

  {
    name: "Bible Comics Chapter 9",
    image: "/assets/book-imgs/bible-book9.png",
    description: "Chapter 9 - Early Ministry",
    url: "https://desktop4kids.com/w_backup/3d-flip-book/340/"
  },

  {
    name: "Bible Comics Chapter 10",
    image: "/assets/book-imgs/bible-book10.png",
    description: "Chapter 10 - Miracles and Parables",
    url: "https://desktop4kids.com/w_backup/3d-flip-book/341/"
  },

  {
    name: "Bible Comics Chapter 11",
    image: "/assets/book-imgs/bible-book11.png",
    description: "Chapter 11 - Passover and Suffering",
    url: "https://desktop4kids.com/w_backup/3d-flip-book/342/"
  },

  {
    name: "Bible Comics Chapter 12",
    image: "/assets/book-imgs/bible-book12.png",
    description: "Chapter 12 - Resurrection and Early Church",
    url: "https://desktop4kids.com/w_backup/3d-flip-book/343/"
  },

  {
    name: "Bible Comics Chapter 13",
    image: "/assets/book-imgs/bible-book13.png",
    description: "Chapter 13 - To all the World",
    url: "https://desktop4kids.com/w_backup/3d-flip-book/344/"
  },
  // Add more books as needed
];

export function BibleBooks() {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const openWebView = (url: string) => {
    setWebViewUrl(url);
  };

  return (
    <div className={`${sharedStyles.LibraryContainer} ${libraryStyles.WebView}`}>
      {webViewUrl ? (
        <div className={libraryStyles.WebViewContainer}>
          <WebView source={webViewUrl} title="Bible Book" />
        </div>
      ) : (
        <CategoryBooks books={bibleBooks} openWebView={openWebView} />
      )}
    </div>
  );
}
