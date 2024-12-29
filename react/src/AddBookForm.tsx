import { useState } from "react"
import { url } from "./bookUtils"

function AddBookForm({ setBooks, books }) {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  async function postBook() {
    let repsonse = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ title: newTitle, author: newAuthor })
    })

    let newBook = await repsonse.json()
    setBooks([...books, newBook])
  }
  return (
    <>
      <input onChange={e => setNewTitle(e.target.value)} type="text" placeholder="title" />
      <input onChange={e => setNewAuthor(e.target.value)} type="text" placeholder="author" />
      <button onClick={postBook}>Add Book</button>
    </>
  )
}
export default AddBookForm
