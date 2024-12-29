import { useState } from "react"
import Book from "./Book"
import { url } from "./bookUtils"

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
                    {books.map(book => <Book key={book.id} id={book.id} title={book.title} author={book.author} />)}
                </tbody>
            </table>
        </>
    )
}

export default BookTable
