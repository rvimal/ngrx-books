/**
 * This file contains NgRx selectors for accessing and deriving state from the store.
 * 
 * NgRx selectors are pure functions used to select, derive and compose pieces of state.
 * They provide several key benefits:
 * 1. Encapsulation: Components don't need to know the structure of the state
 * 2. Memoization: Results are cached and only recomputed when inputs change
 * 3. Composition: Simple selectors can be combined into more complex ones
 * 4. Testability: Pure functions are easy to test
 */
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Book } from '../books.model';

/**
 * Feature selector that retrieves the entire books state from the store.
 * 
 * createFeatureSelector is an NgRx function that selects a top-level slice of state
 * based on the feature name provided ('books').
 * 
 * @returns ReadonlyArray<Book> - The full list of books in the store
 */
export const selectBooks = createFeatureSelector<ReadonlyArray<Book>>('books');

/**
 * Feature selector that retrieves the collection state from the store.
 * 
 * The collection state contains an array of book IDs representing
 * the books that have been added to the user's collection.
 * 
 * @returns ReadonlyArray<string> - Array of book IDs in the collection
 */
export const selectCollectionState = createFeatureSelector<
  ReadonlyArray<string>
>('collection');

/**
 * Composed selector that combines books and collection data to return
 * the complete book objects that are in the user's collection.
 * 
 * createSelector composes multiple selectors and memoizes the result,
 * only recalculating when the input selectors' values change.
 * 
 * The projection function:
 * 1. Takes the results of the input selectors (books array and collection IDs)
 * 2. Maps over the collection IDs
 * 3. For each ID, finds the corresponding book object
 * 
 * @returns ReadonlyArray<Book> - Array of book objects in the collection
 */
export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  (books, collection) => {
    return collection.map((id) => books.find((book) => book.id === id)!);
  }
);