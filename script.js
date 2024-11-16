//constantes e variáveis globais
const toDoForm = document.querySelector('#to-do-form')
const toDoList = document.querySelector('#to-do-list')
const toDoInput = document.querySelector('#to-do-input')
const filter = document.querySelector('#filter-select')
const searchInput = document.querySelector('#search-input')
const toDoEdit = document.querySelector('#edit-form')
const toDoToolBar = document.querySelector('.tool-bar')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')

//localStorage
class DataBase {
  constructor() {
    this.initDataBase()
  }

  //cria um id inicial de zero assim que o programa é iniciado
  initDataBase() {
    const id = localStorage.getItem('id')

    if(id === null) {
      localStorage.setItem('id', '0')
    }
  }

  //pega o próximo id
  getNextId() {
    let currentId = localStorage.getItem('id')
    return (parseInt(currentId) + 1)
  }

  //carrega todas as task criadas, com seus respectivos ids, dentro de um obejto
  loadTasks() {
    let tasks = []
    let id = parseInt(localStorage.getItem('id'))

    for(let i = 1; i <= id; i++) {
      try {
        let task = JSON.parse(localStorage.getItem(i))
        if(task !== null) {
          task.id = i
          tasks.push(task)
        }
      } catch (error) {
        console.error(`Erro ao carregar a tarefa de id ${i}`)
      }
    }
    return tasks
  }

  //cria uma task no localStorage
  createTask(task) {
    let id = this.getNextId()
    localStorage.setItem(id, JSON.stringify(task))
    localStorage.setItem('id', id.toString())
  }

  //remove uma task no localStorage com base no id recebido
  removeTask(id) {
    localStorage.removeItem(id)
  }

  //pega uma task em específicp com base no id recebido
  getTask(id) {
    let task = JSON.parse(localStorage.getItem(id))
    task.id = id
    return task
  }

  //atualiza uma task com base em seu id, tendo como parâmetro um objeto com as novas informações
  attTask(id, task) {
    localStorage.setItem(id, JSON.stringify(task))
  }
}
  
const dataBase = new DataBase()
 
//classe para as tarefas
class Task {
  constructor(title, status) {
      this.title = title
      this.status = status
  } 

  //verifica se não está vazio
  validate() {
      for(let key in this) {
        if(this[key] === undefined || this[key] === "") {
            console.error(`O campo ${key} é obragtório`)
            return false
        }
      }
      return true
  }
}

//eventos

//carrega todas as task assim que a página é iniciada
document.addEventListener('DOMContentLoaded', () => {
  showTasks()
})

//cria uma nova task sempre que o formuláto recebe um submit
toDoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let title = toDoInput.value
    let status = 'pending'
    let task = new Task(title, status)
    
    if(task.validate()) {
        dataBase.createTask(task)
    } else {
        console.error('task cant be created')
    }
    showTasks()
})

//varifica se um clique dado na página é direcionado aos botões de concluir, editar ou remover task, caso seja, direciona para suas respectivas funções
document.addEventListener('click', (e) => {
  let targetEl = e.target
  let parentEl = targetEl.closest('li')
  if(targetEl.classList.contains('finish-to-do')) {
    finishToDo(parentEl)
  } else if (targetEl.classList.contains('remove-to-do')) {
    removeToDo(parentEl)
  } else if (targetEl.classList.contains('edit-to-do')) {
    toggleForms(true)
    showOnlyEditedTask(parentEl.id)
    editInput.focus()
  }
})

//filtra as task toda vez que o filtro é mudado
filter.addEventListener('change', () => {
  filterTasks()
})

//pesquisa tasks toda vez que o input de pesquisa recebe um caractere
searchInput.addEventListener('input', () => {
  showTasks(searchInput.value)
})

//cancela a edição de tasks
cancelEditBtn.addEventListener('click', (e) => {
  e.preventDefault()
  toggleForms(false)
  showTasks()
})

//muda a task visualmente toda vez que o campo de edição recebe um caractere
editInput.addEventListener('input', () => {
  let editText = editInput.value
  editTask(editText)
})

//realiza a atualização da task quando a área de edição recebe um submit
editForm.addEventListener('submit', (e) => {
  e.preventDefault()
  editInput.value = ''
  saveTask()
  toggleForms()
  showTasks()
})

//funções

//mostra as tasks na tela
function showTasks(filter) {
  toDoList.innerHTML = ''
  toDoInput.value = ''
  let taskList = dataBase.loadTasks()
  //se não receber nenhum filtro, ou filtro === todos, mostra todas as tasks
  if(!filter || filter === 'all') {
    taskList.forEach(task => {
      //cria uma li
      const toDo = window.document.createElement('li')
      toDo.setAttribute('class', 'to-do')
      toDo.setAttribute('id', task.id)
      if(task.status === 'done') {
        toDo.classList.add('done')
      } 
      //cria o h3 que receberá o título    
      const toDoTitle = window.document.createElement('h3')
      toDoTitle.innerHTML = task.title
      toDo.appendChild(toDoTitle)
      //cria o botão de conclusão 
      const finishBtn = window.document.createElement('button')
      finishBtn.setAttribute('class', 'finish-to-do')
      finishBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
      toDo.appendChild(finishBtn)
      //cria o botão de edição
      const editBtn = window.document.createElement('button')
      editBtn.setAttribute('class', 'edit-to-do')
      editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
      toDo.appendChild(editBtn)
      //cria o botão para excluir
      const removeBtn = window.document.createElement
      ('button')
      removeBtn.setAttribute('class', 'remove-to-do')
      removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
      toDo.appendChild(removeBtn)
      //coloca o elemento li dentro da ul pai para que possa ser exibido
      toDoList.appendChild(toDo)
    })
  //mostra apenas as tasks marcadas como concluídas
  } if (filter === 'done') {
    taskList.forEach(task => {
      if (task.status === 'done') {
        //cria uma li
        const toDo = window.document.createElement('li')
        toDo.setAttribute('class', 'to-do')
        toDo.setAttribute('id', task.id)
        toDo.classList.add('done')
        //cria o h3 que receberá o título  
        const toDoTitle = window.document.createElement('h3')
        toDoTitle.innerHTML = task.title
        toDo.appendChild(toDoTitle)
        //cria o botão de conclusão 
        const finishBtn = window.document.createElement('button')
        finishBtn.setAttribute('class', 'finish-to-do')
        finishBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
        toDo.appendChild(finishBtn)
        //cria o botão de edição
        const editBtn = window.document.createElement('button')
        editBtn.setAttribute('class', 'edit-to-do')
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
        toDo.appendChild(editBtn)
        //cria o botão para excluir
        const removeBtn = window.document.createElement
        ('button')
        removeBtn.setAttribute('class', 'remove-to-do')
        removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        toDo.appendChild(removeBtn)
        //coloca o elemento li dentro da ul pai para que possa ser exibido
        toDoList.appendChild(toDo)
      }
    })
  } else if (filter === 'pending') {
    taskList.forEach(task => {
      if (task.status === 'pending') {
        //cria uma li
        const toDo = window.document.createElement('li')
        toDo.setAttribute('class', 'to-do')
        toDo.setAttribute('id', task.id)
        //cria o h3 que receberá o título  
        const toDoTitle = window.document.createElement('h3')
        toDoTitle.innerHTML = task.title
        toDo.appendChild(toDoTitle)
        //cria o botão de conclusão 
        const finishBtn = window.document.createElement('button')
        finishBtn.setAttribute('class', 'finish-to-do')
        finishBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
        toDo.appendChild(finishBtn)
        //cria o botão de edição
        const editBtn = window.document.createElement('button')
        editBtn.setAttribute('class', 'edit-to-do')
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
        toDo.appendChild(editBtn)
        //cria o botão para excluir
        const removeBtn = window.document.createElement
        ('button')
        removeBtn.setAttribute('class', 'remove-to-do')
        removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        toDo.appendChild(removeBtn)
        //coloca o elemento li dentro da ul pai para que possa ser exibido
        toDoList.appendChild(toDo)
      }
    })
  //caso haja alguma pesquisa por task
  } else if(filter !== '') {
    taskList.forEach(task => {
      let slicedTitle = task.title.slice(0, filter.length)
      //verifica se a task pesquisada corresponde à task da lista, se sim, imprime-a
      if(filter.toUpperCase() === slicedTitle.toUpperCase()) {
        //cria uma li
        const toDo = window.document.createElement('li')
        toDo.setAttribute('class', 'to-do')
        toDo.setAttribute('id', task.id)
        if(task.status === 'done') {
          toDo.classList.add('done')
        } 
        //cria o h3 que receberá o título  
        const toDoTitle = window.document.createElement('h3')
        toDoTitle.innerHTML = task.title
        toDo.appendChild(toDoTitle)
        //cria o botão de conclusão 
        const finishBtn = window.document.createElement('button')
        finishBtn.setAttribute('class', 'finish-to-do')
        finishBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
        toDo.appendChild(finishBtn)
        //cria o botão de edição
        const editBtn = window.document.createElement('button')
        editBtn.setAttribute('class', 'edit-to-do')
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
        toDo.appendChild(editBtn)
        //cria o botão para excluir
        const removeBtn = window.document.createElement
        ('button')
        removeBtn.setAttribute('class', 'remove-to-do')
        removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        toDo.appendChild(removeBtn)
        //coloca o elemento li dentro da ul pai para que possa ser exibido
        toDoList.appendChild(toDo)
      }
    })
  }
}

//alterna entre concluída ou pendende o status de uma task, salvando seu status no localStorage e mudando a classe da taks para que possa ser exibida de acordo com seu status
function finishToDo(task) {
  let newTask = {}
  if(!task.classList.contains('done')) {
    newTask = {
      title: task.innerText,
      status: 'done'
    }
  } else {
    newTask = {
      title: task.innerText,
      status: 'pending'
    }
  }
  dataBase.attTask(task.id, newTask)
  task.classList.toggle('done')
}

//remove a task, atualiza o localStorage o mostra a nova lista
function removeToDo(task) {
  dataBase.removeTask(task.id)
  showTasks()
}

//filtra as tasks, exibindo-as de acordo com o filtro
function filterTasks() {
  if(filter.selectedIndex === 0) {
    showTasks('all')
  } else if (filter.selectedIndex === 1) {
    showTasks('done')
  } else {
    showTasks('pending')
  }
}

//alterna entre as telas de formulário (tela principal ou tela de edição)
function toggleForms(cond) {
  toDoForm.classList.toggle('hide')
  toDoEdit.classList.toggle('hide')

  if (cond === true) {
      toDoToolBar.classList.replace('tool-bar', 'hide')
  } else {
      toDoToolBar.classList.replace('hide', 'tool-bar')
  }
}

//mostra apenas a tasks a ser editada na tela de edição com base em seu id
function showOnlyEditedTask(id) {
  let task = dataBase.getTask(id)
  toDoList.innerHTML = ''
  const toDo = window.document.createElement('li')
  toDo.setAttribute('class', 'to-do')
  toDo.setAttribute('id', task.id)
  if(task.status === 'done') {
    toDo.classList.add('done')
  } 
  
  const toDoTitle = window.document.createElement('input')
  toDoTitle.value = task.title
  toDo.appendChild(toDoTitle)

  toDoList.appendChild(toDo)
}

//edita a task visualmente, exibindo no campo de listas o que o usuário estiver digitando no campo de edição, em tempo real
function editTask(text) {
  let toDo = toDoList.querySelector('.to-do')
  let toDoTitle = toDo.querySelector('input')
  toDoTitle.value = text
}

//atualiza a task a ser editada, criando um objeto com as novas informações e enviando ao localStorage
function saveTask() {
  let toDo = toDoList.querySelector('.to-do')
  let toDoTitle = toDo.querySelector('input').value
  let toDoid = toDo.id
  let toDoStatus
  if(toDo.classList.contains('done')) {
    toDoStatus = 'done'
  } else {
    toDoStatus = 'pending'
  }
  let newTask = {
    title: toDoTitle,
    status: toDoStatus
  }
  dataBase.attTask(toDoid, newTask)
}