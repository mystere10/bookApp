import React, {Component} from 'react';

class Search extends Component{

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }
	render(){
    const {query} = this.state
    const {searchBar, books} = this.props

    const foundSearch = query === "" ? books : books.filter((book) => (
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.authors[0].toLowerCase().includes(query.toLowerCase())
    ))
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
                {foundSearch.length !== books.length && foundSearch.map((book, index) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select>
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
                ))}
              </ol>
            </div>
          </div>
        )
    }
}

export default Search;
