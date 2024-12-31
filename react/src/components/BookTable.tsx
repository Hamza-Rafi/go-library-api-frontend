import { useState } from "react"
import { url } from "../bookUtils"
import Book from "./Book"
import AddBookForm from "./AddBookForm"

function BookTable() {
  const [books, setBooks] = useState([])

  async function getBooks() {
    let response = await fetch(url)
    let bookData = await response.json()

    setBooks(bookData)
  }

  if (books.length == 0) {
    getBooks()
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>author</th>
          </tr>

          {books.map(book => <Book key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            books={books}
            setBooks={setBooks} />)}
        </tbody>
      </table>
      <AddBookForm setBooks={setBooks} books={books} />
    </>
  )
}
export default BookTable

