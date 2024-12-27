var apiBase = "https://library.hamzarafi.com"

var booksTable = document.getElementById("booksTable")

async function getBooks() {
    var url = apiBase + '/books'

    var response = await fetch(url)

    var json = await response.json()
    return json
}

async function postBook(title, author) {
    var url = apiBase + '/books'

    body = {
        title: title,
        author: author
    }

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body)
    })

    const newBook = await response.json()
    return newBook
}

async function putBook(id, title, author) {
    var url = apiBase + '/books'

    body = {
        id: id,
        title: title,
        author: author
    }

    const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(body)
    })

    const retMsg = await response.json()
    return retMsg
}

function addRow(book, rowNumber) {
    var row = booksTable.insertRow(rowNumber)

    row.insertCell(0).innerText = book.id
    row.insertCell(1).innerText = book.title
    row.insertCell(2).innerText = book.author
}
async function populateTable() {
    var books = await getBooks()

    books.forEach((book, count) => {
        //row.insertCell(3).innerHTML = '<button>edit</button>'
        addRow(book, count)
    })

    // populate table headers
    // for some reason you have to do this before the other rows or
    // else the headers go at the bottom
    var header = booksTable.createTHead()
    var row = header.insertRow(0)
    row.insertCell(0).innerText = 'id'
    row.insertCell(1).innerText = 'title'
    row.insertCell(2).innerText = 'author'
}

async function addBook() {
    var titleInput = document.getElementById('input-title')
    var authorInput = document.getElementById('input-author')

    newBook = await postBook(titleInput.value, authorInput.value)

    // add new book to table
    addRow(newBook, booksTable.rows.length)

    // clear inputs
    titleInput.value = ''
    authorInput.value = ''
}

populateTable()
