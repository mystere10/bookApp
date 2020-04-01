import React from 'react'
import * as BooksAPI from './BooksAPI'
import Search from './Search'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    selectedValue: 'wantToRead'

  }

	
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedValue !== this.state.selectedValue) {
    }
  }

	
  handleSearchBar = () => {
  	this.setState({showSearchPage: false})
  }

  onToggleSearch = () => {
    this.setState({showSearchPage: true})
  }

  handleUpdate = (book) => {
    setTimeout(() => {
      const shelf = this.state.selectedValue
      this.state.books.forEach((b) =>{
        if(b.id === book.id){
          b.shelf = shelf
          this.setState((currenState) => ({
            books: currenState.books
          }))
        }
      });
      BooksAPI.update(book, shelf)
      console.log("what am passing to the update function", shelf)
    }, 300);
    
  }

  handleSelectedValue = (value) => {
    this.setState({selectedValue: value})
    console.log("What am getting after selection", value)
  }

  render() {
    console.log("The actual state", this.state.selectedValue)
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search searchBar={this.handleSearchBar} books={this.state.books}/>
        ) : (
          <ListBooks onSearch={this.onToggleSearch} allBooks={this.state.books} updateBook={this.handleUpdate} selectedValue={this.handleSelectedValue}/>
        )}
      </div>
    )
  }
}

export default BooksApp
