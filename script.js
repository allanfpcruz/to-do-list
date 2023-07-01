//declaração de variáveis ------------------------------------
const toDoForm = window.document.querySelector('#to-do-form')
const toDoInput = window.document.querySelector('#to-do-input')
const toDoEdit = window.document.querySelector('#edit-form')
const cancelEditBtn = window.document.querySelector('#cancel-edit-btn')
const toDoToolBar = window.document.querySelector('.tool-bar')
const toDoSearch = window.document.querySelector('#search-input')
const filter = window.document.querySelector('#filter-select')
const toDoList = window.document.querySelector('#to-do-list')

//eventos-----------------------------------------------------

//adicionar tarefa
toDoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputValue = toDoInput.value
    if (inputValue) {
        addToDo(inputValue)
    } else {
        alert('Insira uma tarefa')
    }
})

//concluir, editar ou remover tarefa
document.addEventListener('click', (e) => {

    const targetEl = e.target
    parentEl = targetEl.closest('li')

    //concluir tarefa
    if (targetEl.classList.contains('finish-to-do')) {
        parentEl.classList.toggle('done')
    }

    //editar tarera
    if (targetEl.classList.contains('edit-to-do')) {
        toggleForms(true)
    }

    //excluir tarefa
    if (targetEl.classList.contains('remove-to-do')) {
        parentEl.remove()
    }
})

//cancelar edição
cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault()
    toggleForms(false)
})

//pesquisar
toDoSearch.addEventListener('input', pesquisar)

//filtrar
filter.addEventListener('change', (e) => {
    filtrar()
})

//funções ----------------------------------------------------

//adiciona tarefa
const addToDo = (text) => {
    const toDo = window.document.createElement('li')
    toDo.setAttribute('class', 'to-do')
    
    const toDoTitle = window.document.createElement('h3')
    toDoTitle.innerHTML = text
    toDo.appendChild(toDoTitle)

    const finishBtn = window.document.createElement('button')
    finishBtn.setAttribute('class', 'finish-to-do')
    finishBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    toDo.appendChild(finishBtn)

    const editBtn = window.document.createElement('button')
    editBtn.setAttribute('class', 'edit-to-do')
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    toDo.appendChild(editBtn)

    const removeBtn = window.document.createElement
    ('button')
    removeBtn.setAttribute('class', 'remove-to-do')
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    toDo.appendChild(removeBtn)

    toDoList.appendChild(toDo)

    toDoInput.value = ''
    toDoInput.focus()
}

//alterna telas
toggleForms = (cond) => {
    toDoForm.classList.toggle('hide')
    toDoEdit.classList.toggle('hide')
    toDoList.classList.toggle('hide')

    if (cond == true) {
        toDoToolBar.classList.replace('tool-bar', 'hide')
    } else {
        toDoToolBar.classList.replace('hide', 'tool-bar')
    }

}

//pesquisar tarefa
function pesquisar() {
    let list = window.document.querySelectorAll('li')
    if (toDoSearch.value != '') {
        let input = toDoSearch.value.toLowerCase()
        list.forEach((toDo) => {
                let inputLength = input.length 
                let toDoTitle = toDo.querySelector('h3')
                let titleSlice = toDoTitle.textContent.slice(0, inputLength)
                if (titleSlice == input) {
                    toDo.style.display = 'flex'
                } else {
                    toDo.style.display = 'none'
                }
        })
    } else {
        for (let toDo of list) {
            toDo.style.display = 'flex'
        }
    }
}

//filtrar
function filtrar() {
    if (filter.selectedIndex == 0) { 
        let list = window.document.querySelectorAll('li')
        list.forEach((toDo) => {
            toDo.style.display = 'flex'
        })
    } else if (filter.selectedIndex == 1) {
        let list = window.document.querySelectorAll('li')
        list.forEach((toDo) => {
            if (toDo.classList.contains('done')) {
                toDo.style.display = 'flex'
            } else {
                toDo.style.display = 'none'
            }
        })
    } else if (filter.selectedIndex == 2) {
        let list = window.document.querySelectorAll('li')
        list.forEach((toDo) => {
            if (!toDo.classList.contains('done')) {
                toDo.style.display = 'flex'
            } else {
                toDo.style.display = 'none'
            }
        })
    }
}


