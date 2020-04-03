import React, {Component} from 'react';

const AllShelves = [
  {
    category: "currentlyReading",
    title: "Currently reading"
  },
  {
    category: "wantToRead",
    title: "Want to read"
  },
  {
    category: "read",
    title: "Read"
  }
]

class ListBooks extends Component{

  render(){
      
      const { onSearch, allBooks, updateBook, selectedValue } = this.props

      function bookShelfCategory(category){
        return allBooks.filter(book => book.shelf === category)
      }
    console.log(allBooks)
    
      return(
          <div className="app">
            <div className="list-books">
              <div className="list-books-title">
                  <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  {AllShelves.map((shelf) => (
                    <div key={shelf.category} className="bookshelf">
                    <div>
                      <h2 className="bookshelf-title">{shelf.title}</h2>
                      <div className="bookshelf-books">
                          <ol className="books-grid">
                              {bookShelfCategory(shelf.category).map((book) => (
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
                              ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  ))}
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



