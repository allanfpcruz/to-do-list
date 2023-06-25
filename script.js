//declaração de variáveis
const toDoForm = window.document.querySelector('form#to-do-form')
const toDoInput = window.document.querySelector('input#to-do-input')
const toDoList = window.document.querySelector('div#to-do-list')

//eventos

//adicionar tarefa
toDoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const toDoValue = toDoInput.value
    if (toDoValue) {
        addToDo(toDoValue)
    } else {
        alert('Insira uma tarefa')
    }
})

//funções

//adiciona tarefa
const addToDo = (text) => {
    const toDo = window.document.createElement('div')
    toDo.setAttribute('class', 'to-do')
    toDoList.appendChild(toDo)

    const toDoTitle = window.document.createElement('h3')
    toDoTitle = text
    toDo.appendChild(toDoTitle)

}