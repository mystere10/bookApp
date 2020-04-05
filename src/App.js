import React from 'react'
import {Route} from 'react-router-dom'
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
    query: '',
    selectedValue: 'wantToRead'
  }

  componentDidMount(){
      BooksAPI.getAll().then((books) => {
        this.setState(() => ({
          books
        }))
      })
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
    }, 300);
  }

  handleSelectedValue = (value) => {
    this.setState({selectedValue: value})
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
    if(this.state.query !== ''){
      BooksAPI.search(this.state.query).then(result => {
        if(result.length !== undefined || result.length > 0){
          this.setState((currenState) => ({
            books: currenState.books.concat(result)
          }))
        }
      })
    }
  }

  render() {
    return (
      <div className="app">
      <Route exact path="/" render={() => (
        this.state.showSearchPage ? (
          <Search searchBar={this.handleSearchBar} booksInState={this.state.books} updateBook={(book) =>
            this.handleUpdate(book)
          } selectedValue={this.handleSelectedValue} updateQuery={this.updateQuery} query={this.state.query}/>
        ) : (
          <ListBooks onSearch={this.onToggleSearch} allBooks={this.state.books} updateBook={this.handleUpdate} selectedValue={this.handleSelectedValue}/>
        )
      )}/>
      </div>
    )
  }
}

export default BooksApp
