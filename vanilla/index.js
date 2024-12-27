var apiBase = "https://library.hamzarafi.com"

var booksTable = document.getElementById("booksTable")

async function getData() {
    var url = apiBase + '/books'

    var response = await fetch(url)

    var json = await response.json()
    return json
}

async function populateTable() {
    var books = await getData()

    books.forEach((book, count) => {
        var row = booksTable.insertRow(count)

        row.insertCell(0).innerText = book.id
        row.insertCell(1).innerText = book.title
        row.insertCell(2).innerText = book.author

        //row.insertCell(3).innerHTML = '<button>edit</button>'
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
    var url = apiBase + '/books'

    var titleInput = document.getElementById('input-title')
    var authorInput = document.getElementById('input-author')

    body = {
        title: titleInput.value,
        author: authorInput.value
    }

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body)
    })

    const newBook = await response.json()
    ''
    // add new book to table
    var newRow = booksTable.insertRow(booksTable.rows.length)
    newRow.insertCell(0).innerText = newBook.id
    newRow.insertCell(1).innerText = newBook.title
    newRow.insertCell(2).innerText = newBook.author

    // clear inputs
    titleInput.value = ''
    authorInput.value = ''

}

populateTable()
