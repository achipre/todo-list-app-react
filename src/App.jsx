import './App.css'
import LogoReact from './componets/LogoReact'
import InputSearch from './componets/InputSearch'
import SectionCategory from './componets/SectionCategory'
import LogoAddMore from './componets/LogoAddMore'
import Notas from './componets/Notas'
import { useRef, useState } from 'react'
import {
  useStore,
  useStoreCategory,
  useStoreCategories,
  useStoreInputSearch
} from './store/todoStore'
import { IconAdd, IconDelete, IconNotSearch } from './componets/Icons'

export default function App () {
  const { todos, addTodo, removeTodo } = useStore()
  const localStorageTodos =
    localStorage.getItem('todos') === null
      ? localStorage.setItem('todos', JSON.stringify(todos))
      : JSON.parse(localStorage.getItem('todos'))

  // openModal
  const [isOpenModalTodo, setIsOpenModalTodo] = useState(false)
  const openModal = () => {
    setIsOpenModalTodo(true)
  }
  const closeModal = () => {
    refNota.current.classList.add('notaClose')

    setTimeout(() => {
      setIsOpenModalTodo(false)
      refNota.current.classList.remove('notaClose')
    }, 250)
  }

  const deleteTodo = (id, e) => {
    e.stopPropagation()
    const localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    const newTodo = localStorageTodos.filter(todo => todo.id !== id)
    removeTodo(id)
    localStorage.setItem('todos', JSON.stringify(newTodo))
  }
  const { visibilityInputCategory } = useStoreCategory()
  const refSectionTodo = useRef()

  if (visibilityInputCategory) {
    refSectionTodo.current.classList.add('todosWithOpenCategory')
    refSectionTodo.current.classList.remove('todosWithCloseCategory')
  } else {
    refSectionTodo.current?.classList.add('todosWithCloseCategory')
    refSectionTodo.current?.classList.remove('todosWithOpenCategory')
  }
  const { categories } = useStoreCategories()
  const localStorageCategories =
    localStorage.getItem('categories') === null
      ? localStorage.setItem('categories', JSON.stringify(categories))
      : JSON.parse(localStorage.getItem('categories'))
  const filterbycategory = localStorageCategories?.filter(category => category.isSelect === true)

  // Imput Search
  const filtercategoryName = filterbycategory?.at(0)?.nombre

  const todosFilter =
    filtercategoryName === 'Todos'
      ? localStorageTodos
      : localStorageTodos?.filter(todo => todo.category === filtercategoryName)

  const { valueSearch } = useStoreInputSearch()
  const valueSearchLower = valueSearch.toLowerCase()
  const arrayTodosLower = todosFilter?.map(
    todoByCategory =>
      todoByCategory && {
        ...todoByCategory,
        title: todoByCategory.title,
        infoTodo: todoByCategory.infoTodo
      }
  )
  const newFilterBySearch = arrayTodosLower
    .map(
      arr =>
        (arr.title.toLowerCase().includes(valueSearchLower) ||
          arr.infoTodo.toLowerCase().includes(valueSearchLower)) &&
        arr
    )
    .filter(arry => arry.id)

  // Guardar Save Todo
  const [todoId, setTodoId] = useState('')
  const [categoryEdit, setcategoryEdit] = useState('')

  const refNota = useRef()
  const fechaNewTodo = new Date()
  const fechaDate = fechaNewTodo.toDateString()
  const fechaHours = fechaNewTodo.toLocaleTimeString()

  // valor Titulo
  const [valueInput, setValueInput] = useState('')
  const newTitle = e => {
    setValueInput(e.target.value)
  }
  // valor Texto
  const [valueText, setValueText] = useState('')
  const newText = e => {
    setValueText(e.target.value)
  }

  const saveTodo = () => {
    setTimeout(() => {
      refNota.current.classList.remove('notaClose')
      setValueInput('')
      setValueText('')
    }, 250)

    const localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    refNota.current.classList.add('notaClose')

    const categoryNow = localStorageCategories.filter(category => category.isSelect === true)[0]
      .nombre

    const info = {
      id: Math.random().toString(),
      title: valueInput,
      infoTodo: valueText,
      date: fechaDate,
      dateHour: fechaHours,
      category: categoryNow === 'Todos' ? 'Sin Categoria' : categoryNow
    }

    const infoEdit = {
      id: todoId,
      title: valueInput,
      infoTodo: valueText,
      date: fechaDate,
      dateHour: fechaHours,
      category: categoryEdit
    }
    if (todoId !== '') {
      const indexTodo = localStorageTodos.findIndex(todo => todo.id === todoId)
      localStorageTodos.splice(indexTodo, 1, infoEdit)
      addTodo(infoEdit)
      localStorage.setItem('todos', JSON.stringify(localStorageTodos))
    } else {
      const newTodos = [...localStorageTodos, info]
      addTodo(info)
      localStorage.setItem('todos', JSON.stringify(newTodos))
    }

    setTimeout(() => {
      setIsOpenModalTodo(false)
    }, 250)
    setTodoId('')
  }

  // Editar
  const handleEditTodo = id => {
    setIsOpenModalTodo(true)
    const todoToEdit = JSON.parse(localStorage.getItem('todos')).find(title => title.id === id)
    setTodoId(id)
    setValueInput(todoToEdit.title)
    setValueText(todoToEdit.infoTodo)
    setcategoryEdit(todoToEdit.category)
  }
  return (
    <>
      <LogoReact />
      <main className="principal-main">
        <header className="header">
          <InputSearch />
          <SectionCategory />
        </header>
        <section className="todos todosWithCloseCategory" ref={refSectionTodo}>
          {newFilterBySearch?.map(todo => (
            <article onClick={() => handleEditTodo(todo.id)} className="articleTodo" key={todo.id}>
              <p className="articleTitle">{todo.title}</p>
              <p className="articleInfoTodo">{todo.infoTodo}</p>
              <div className="articleFooter">
                <p className="articleCategory">{todo.category}</p>
                <p className="articleDate">{todo.date}</p>
              </div>
              <IconDelete deleteTodo={(e) => deleteTodo(todo.id, e)} />
            </article>
          ))}
          {newFilterBySearch?.length === 0 && valueSearchLower.length > 0 && (
            <div className="iconAdd notodo">
              <p className="text-notodo">Tarea no encontrada</p>
              <IconNotSearch />
            </div>
          )}
          {newFilterBySearch?.length === 0 && valueSearchLower.length === 0 && (
            <LogoAddMore openModal={openModal} />
          )}
          {newFilterBySearch.length > 0 && (
            <article onClick={openModal} className="articleNewTodo">
              <IconAdd />
            </article>
          )}
        </section>
        {isOpenModalTodo && (
          <Notas
            closeModal={closeModal}
            saveTodo={saveTodo}
            refNota={refNota}
            fechaDate={fechaDate}
            fechaHours={fechaHours}
            valueInput={valueInput}
            newTitle={newTitle}
            valueText={valueText}
            newText={newText}
          />
        )}
      </main>
      <div className="profile">
        <img
          src="https://avatars.githubusercontent.com/u/107824859?s=400&u=5214f01abcee56fc371e163c57bdec7b36282f1b&v=4"
          alt=""
        />
      </div>
    </>
  )
}
