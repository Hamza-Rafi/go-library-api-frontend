import { useState } from "react"
import { apiBase, url } from "../bookUtils"

function Book({ id, title, author, books, setBooks }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const [newAuthor, setNewAuthor] = useState(author)

  async function editBook() {
    // only run func body if editing
    if (!isEditing) {
      setIsEditing(!isEditing)
      return
    }

    console.log(newTitle, newAuthor)
    let response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: newTitle,
        author: newAuthor
      })
    })

    let changedBook = await response.json()
    let bookIndex = books.findIndex(b => b.id == changedBook.id)
    setBooks([
      ...books.slice(0, bookIndex),
      changedBook,
      ...books.slice(bookIndex + 1, books.length)
    ])

    // flip editing state
    setIsEditing(!isEditing)
  }

  async function deleteBook() {
    let response = await fetch(url + '/' + String(id), {
      method: "DELETE"
    })
    let bookIndex = books.findIndex(b => b.id == id)
    setBooks([
      ...books.slice(0, bookIndex),
      ...books.slice(bookIndex + 1, books.length)
    ])
  }

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>
          {isEditing ? (
            <input type="text" value={newTitle} placeholder={title} onChange={(e) => setNewTitle(e.target.value)} />
          ) : (
            <span>{title}</span>
          )}
        </td>
        <td>
          {isEditing ? (
            <input type="text" value={newAuthor} placeholder={author} onChange={(e) => setNewAuthor(e.target.value)} />
          ) : (
            <span>{author}</span>
          )}
        </td>
        <td>{isEditing.toString()}</td>
        <td>
          {isEditing ? (
            <button onClick={() => editBook()}>Submit</button>
          ) : (
            <button onClick={() => editBook()}>Edit</button>
          )}
        </td>
        <td>
          <button onClick={() => deleteBook()}>Delete</button>
        </td>
      </tr>
    </>
  )
}
export default Book
