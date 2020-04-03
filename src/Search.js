import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI'

class Search extends Component{

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
    if(this.state.query !== ''){
      BooksAPI.search(this.state.query).then(result => {
        if(result.length !== "undefined" || result.length > 0){
          this.setState(() => ({
            books: result
          }))
        }
      })
    } 
  }

  handleSearch = () => {
    let foundSearch = []
    const { query, books } = this.state;
    if (query !== '' && books.length > 1) {
      foundSearch = books.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()))
    }
    return foundSearch
  }
	render(){
    const {query, books} = this.state
    const {searchBar, updateBook, selectedValue} = this.props

    let book = null

    if(books !== undefined || books.length > 1){

      const AllBooks = this.handleSearch()

      book = (
        AllBooks !== this.state.books && AllBooks.map((book, index) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={(e) => updateBook(book, selectedValue(e.target.value))} defaultValue={book.shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
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
                value={query}
                onChange={(e)=> this.updateQuery(e.target.value)}
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
