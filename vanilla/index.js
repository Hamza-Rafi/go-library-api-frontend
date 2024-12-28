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

    //alert(retMsg.message)

    return response.status, retMsg
}

async function deleteBook(id) {
    var url = apiBase + '/books' + '/' + id

    const response = await fetch(url, {
        method: "DELETE"
    })

    const retMsg = await response.json()

    //alert(retMsg.message)

    return response.status, retMsg
}

function addRow(book, rowNumber) {
    var row = booksTable.insertRow(rowNumber)

    row.insertCell(0).innerText = book.id
    row.insertCell(1).innerText = book.title
    row.insertCell(2).innerText = book.author

    // edit button
    var editButton = document.createElement('button')
    editButton.innerText = 'Edit'
    editButton.dataset.id = book.id
    editButton.addEventListener('click', () => { editBook(editButton.dataset.id) })
    row.insertCell(3).appendChild(editButton)

    // delete button
    var deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete'
    deleteButton.dataset.id = book.id
    deleteButton.addEventListener('click', () => {
        deleteBook(deleteButton.dataset.id)
        // get the row index number
        for (var i = 0; i < booksTable.rows.length; i++) {
            if (booksTable.rows[i].cells[0].innerText != deleteButton.dataset.id)
                continue

            booksTable.deleteRow(i)
        }
    })
    row.insertCell(4).appendChild(deleteButton)
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

async function editBook(id) {
    console.log("edit book")
    console.log(typeof id)
    //
    // replace row text with input boxes
    var row = booksTable.rows[Number(id) + 1]

    // replace title cell text with input
    var titleCell = row.cells[1]
    var titleInput = document.createElement('input')
    titleInput.value = titleCell.innerText

    titleCell.innerText = ''
    titleCell.appendChild(titleInput)

    // replace author cell text with input
    var authorCell = row.cells[2]
    var authorInput = document.createElement('input')
    authorInput.value = authorCell.innerText

    authorCell.innerText = ''
    authorCell.appendChild(authorInput)

    // replace edit button with submit button
    var editButtonCell = row.cells[3]
    var editButton = editButtonCell.children[0]
    editButtonCell.removeChild(editButton)

    var submitButton = document.createElement('button')
    submitButton.innerText = 'Submit'
    submitButton.addEventListener('click', () => {
        putBook(id, titleInput.value, authorInput.value)

        editButtonCell.removeChild(submitButton)
        editButtonCell.appendChild(editButton)

        titleCell.removeChild(titleInput)
        titleCell.innerText = titleInput.value

        authorCell.removeChild(authorInput)
        authorCell.innerText = authorInput.value
    })

    editButtonCell.appendChild(submitButton)
    console.log(editButton)
}

populateTable()
