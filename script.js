let listBooks = localStorage.getItem("list-book") ? JSON.parse(localStorage.getItem("list-book")) : []


window.onload = function () {
    start()
}

function start() {
    renderBooks(listBooks)
}

let dataTopic = [
    {
        id: 1,
        name: "Programming"
    },
    {
        id: 2,
        name: "Database"
    },
    {
        id: 3,
        name: "DevOps"
    },
]


function renderBooks(arr) {
    let listBook = document.querySelector("#info-book")

    let tablebook = `<tr>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Topic</th>
                    <th>Action</th>
                    </tr>`

    arr.map((item, index) => {
        tablebook += `
        <tr key=${index}>
            <td>${item.name}</td>
            <td>${item.author}</td>
            <td>${item.topic}</td>
            <td>
            <button onclick="modalDelete(${index})" class="book-delete">
            Delete
            <hr/>
            </button>   
            </td>
        </tr>
        `
    })
    listBook.innerHTML = tablebook

}

function resetBook() {
    document.getElementById("name").value = ""
    document.getElementById("author").value = ""
    document.getElementById("topic").value = ""
}

function validateInput() {
    let formElement = document.querySelector(".add-book")
    let inputElement = formElement.querySelectorAll(".form-input")

    for (let i = 0; i < inputElement.length; i++) {
        if (inputElement[i].value === "") {
            inputElement[i].parentElement.querySelector(".message-error").innerText = `Hãy điền vào chỗ trống ${inputElement[i].id}`
        } else {
            inputElement[i].parentElement.querySelector(".message-error").innerText = ""

        }

    }
}


let getTopic = document.getElementById("topic")

dataTopic.map(item => {
    let option = document.createElement("option")
    option.text = item.name
    option.value = item.id
    getTopic.appendChild(option)
})


function addNew() {
    validateInput()
    let formElement = document.querySelector(".add-book")

    let errorElement = formElement.querySelectorAll(".message-error")
    let arrErrorElement = []

    for (let i = 0; i < errorElement.length; i++) {
        arrErrorElement.push(errorElement[i].innerText)
    }


    let checkError = arrErrorElement.every(item => item === "")
    if (checkError) {
        let name = document.getElementById("name").value
        let author = document.getElementById("author").value
        let topic = getTopic.value

        listBooks.push({
            name: name,
            author: author,
            topic: dataTopic[topic - 1].name,
        })
        localStorage.setItem("list-book", JSON.stringify(listBooks))
        renderBooks(listBooks)
        resetBook()
    }
}


function searchBook() {
    let valueInput = document.getElementById("search-book").value

    let bookSearch = listBooks.filter(item => {
        return item.name.toUpperCase().includes(valueInput.toUpperCase())
    })
    renderBooks(bookSearch)
}

function deleteBook() {
    let indexB = listBooks.findIndex((item, index) => index === Number(indexBook))
    console.log(indexB);
    if (indexB !== -1) {
        listBooks.splice(indexB, 1)

        localStorage.setItem("list-book", JSON.stringify(listBooks))
        renderBooks(listBooks)
        modalDelete()
        resetBook()
    }
}


let create_book = document.getElementById("create-book")
let modal = document.querySelector(".modal-container")
let btnClose = document.querySelector(".modal-header b")
let submit = document.querySelector(".btn-create")


function modalAdd() {
    modal.classList.toggle("hide")
}

create_book.addEventListener('click', modalAdd)
btnClose.addEventListener('click', modalAdd)
modal.addEventListener('click', (e) => {
    if (e.target == e.currentTarget) {
        modalAdd()
    }
})
submit.addEventListener('click', () => {
    let formElement = document.querySelector(".add-book")

    let errorElement = formElement.querySelectorAll(".message-error")
    let arrErrorElement = []

    for (let i = 0; i < errorElement.length; i++) {
        arrErrorElement.push(errorElement[i].innerText)
    }


    let checkError = arrErrorElement.every(item => item === "")
    if (checkError) {
        modalAdd()
    }
})


let modalDel = document.querySelector(".modal-delete")
let btnExit = document.querySelector(".btn-exit")
let btnCancel = document.querySelector(".btn-cancel")

let btnDelete = document.querySelector(".btn-delete")

let indexBook = 0

function modalDelete(index) {
    indexBook = index;
    let arr = listBooks

    console.log(arr);
    let nameBook = document.querySelector(".name-book")
    nameBook.innerHTML = arr[indexBook]
    modalDel.classList.toggle("hide")
}

btnExit.addEventListener("click", modalDelete)
btnCancel.addEventListener("click", modalDelete)
modalDel.addEventListener("click", (e) => {
    if (e.target == e.currentTarget) {
        modalDelete()
    }
})

btnDelete.addEventListener("click", deleteBook)
