var apiBase = "https://library.hamzarafi.com"

async function getData() {
    var url = apiBase + '/books'

    var response = await fetch(url)

    var json = await response.json()
    return json
}

async function populateTable() {
    var books = await getData()
    console.log(books)

    var booksTable = document.getElementById("booksTable")

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

populateTable()
