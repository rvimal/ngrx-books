import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectBookCollection, selectBooks } from './book-list/state/books.selectors';
import { BooksActions, BooksApiActions } from './book-list/state/books.actions';
import { GoogleBooksService } from './book-list/state/books.service';

/**
 * Root component of the application.
 * Manages the books data flow using NgRx store and connects UI components.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  
  /**
   * Creates an instance of the AppComponent.
   * @param booksService - Service for fetching books data
   * @param store - NgRx store for state management
   */
  constructor(private booksService: GoogleBooksService, private store: Store) {}
  
  /**
   * Observable of all books from the store.
   * Updates automatically when the books state changes.
   */
  books$ = this.store.select(selectBooks);
  
  /**
   * Observable of books in the user's collection from the store.
   * Updates automatically when the collection state changes.
   */
  bookCollection$ = this.store.select(selectBookCollection);

  /**
   * Adds a book to the user's collection.
   * @param bookId - The unique identifier of the book to add
   */
  onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }

  /**
   * Removes a book from the user's collection.
   * @param bookId - The unique identifier of the book to remove
   */
  onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }

  /**
   * Lifecycle hook that is called after component initialization.
   * Fetches the initial list of books and updates the store.
   */
  ngOnInit() {
    this.booksService
      .getBooks()
      .subscribe((books) =>
        this.store.dispatch(BooksApiActions.retrievedBookList({ books }))
      );
  }
}