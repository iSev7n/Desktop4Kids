import React from "react";
import styles from "./SharedLibraryStyles.module.css";

export function CategoryBooks({ books, openWebView }: { books: Array<{ name: string; image: string; description: string; url?: string }>, openWebView: (url: string) => void }) {
  return (
    <div className={styles.CategoryContent}>
      <h2>Books</h2>
      <div className={styles.BookList}>
        {books.map((book, index) => (
          <div
            className={styles.BookItem}
            key={index}
            onClick={book.url ? () => openWebView(book.url!) : () => console.log(`${book.name} clicked`)}
          >
            <img src={book.image} alt={book.name} className={styles.BookImage} />
            <div className={styles.BookDetails}>
              <h3>{book.name}</h3>
              <p>{book.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
