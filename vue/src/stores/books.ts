import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

let apiBase: string = "https://library.hamzarafi.com"
let url = apiBase + '/books'

export const useBooksStore = defineStore('books', () => {
  const books = ref([])

  async function getBooks() {
    let response = await fetch(url)
    let json = await response.json()
    books.value = json
  }

  async function addBook(title, author) {
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        author: author
      })
    })

    let newBook = await response.json()
    books.value.push(newBook)
  }

  async function editBook(id, newTitle, newAuthor) {
    let response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: newTitle,
        author: newAuthor
      })
    })

    let changedBook = await response.json()

    let bookIndex = books.value.findIndex(b => b.id == id)
    books.value[bookIndex] = changedBook
  }

  async function deleteBook(id) {
    let response = await fetch(url + '/' + String(id), {
      method: "DELETE"
    })

    books.value = books.value.filter(book => book.id != id)
  }


  return { books, getBooks, addBook, editBook, deleteBook }
})
