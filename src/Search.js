import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Search extends Component{

  handleSearch = () => {
    let foundSearch = []
    const { query, booksInState } = this.props;
    if (query !== '' && booksInState.length > 1) {
      foundSearch = booksInState.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      )
    }
    return foundSearch
  }
	render(){
    const {searchBar, updateBook, selectedValue,  updateQuery, booksInState} = this.props

    let book = null

    if(booksInState !== undefined || booksInState.length > 1){

      const AllBooks = this.handleSearch()

      book = (
        AllBooks !== booksInState && AllBooks.map((book, index) => (
          <li key={index}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={(e) => updateBook(book, selectedValue(e.target.value))} defaultValue={book.shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="none">None</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        )))
    }

    	return(
        	<div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => searchBar()}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                type="text"
                name = "query"
                onChange={(e)=> updateQuery(e.target.value)}
                placeholder="Search by title or author"/>

              </div>
            </div>
              <div className="search-books-results">
              <ol className="books-grid">
                {book !== null && book}
              </ol>
            </div>
          </div>
        )
    }
}

export default Search;
