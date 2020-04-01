import React, {Component} from 'react';
class ListBooks extends Component{

  
	render(){
      
      const { onSearch, allBooks, updateBook, selectedValue } = this.props
    console.log(allBooks)
    // console.log(this.state.selectValue)
		
    	return(
        	<div className="app">
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div className="bookshelf">
                    <div>
                    <h2 className="bookshelf-title">Currently reading</h2>
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                          {allBooks.map((book) => (
                            <div key={book.id}>
                            {book.shelf === "currentlyReading" && 
                            <li>
                              <div className="book">
                                <div className="book-top">
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                  <div className="book-shelf-changer">
                                    <select onChange={(e) => updateBook(book, selectedValue(e.target.value))}>
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
                            }
                            </div>
                          ))}
                          </ol>
                        </div>

                        <h2 className="bookshelf-title">Want to read</h2>
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                          {allBooks.map((book) => (
                            <div key={book.id}>
                            {book.shelf === "wantToRead" && 
                            <li>
                              <div className="book">
                                <div className="book-top">
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                                  <div className="book-shelf-changer">
                                    <select onChange={(e) => updateBook(book, selectedValue(e.target.value))}>
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
                            }
                            </div>
                          ))}
                          </ol>
                        </div>

                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                          {allBooks.map((book) => (
                            <div key={book.id}>
                            {book.shelf === "read" && 
                            <li>
                              <div className="book">
                                <div className="book-top">
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                  <div className="book-shelf-changer">
                                    <select onChange={(e) => updateBook(book, selectedValue(e.target.value))}>
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
                            }
                            </div>
                          ))}
                          </ol>
                        </div>
                    </div>
                    </div>
                </div>
				    </div>
          <div className="open-search">
              <a onClick={() => onSearch()}>Add a book</a>
          </div>
			  </div>
        )
    }
}

export default ListBooks;



