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
  const { todos, removeTodo } = useStore()
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
    setTimeout(() => {
      setIsOpenModalTodo(false)
    }, 250)
  }

  const deleteTodo = id => {
    const localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    const newTodo = (localStorageTodos.filter(todo => todo.id !== id))
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
        title: todoByCategory.title.toLowerCase(),
        infoTodo: todoByCategory.infoTodo.toLowerCase()
      }
  )
  console.log(valueSearchLower.length)
  const newFilterBySearch = arrayTodosLower
    .map(
      arr =>
        (arr.title.includes(valueSearchLower) || arr.infoTodo.includes(valueSearchLower)) && arr
    )
    .filter(arry => arry.id)
  return (
    <>
      <main className="principal-main">
        <header className="header">
          <LogoReact />
          <InputSearch />
          <SectionCategory />
        </header>
        <section className="todos todosWithCloseCategory" ref={refSectionTodo}>
          {newFilterBySearch?.map(todo => (
            <article className="articleTodo" key={todo.id}>
              <p className="articleTitle">{todo.title}</p>
              <p className="articleInfoTodo">{todo.infoTodo}</p>
              <div className="articleFooter">
                <p className="articleCategory">{todo.category}</p>
                <p className="articleDate">{todo.date}</p>
              </div>
              <IconDelete deleteTodo={() => deleteTodo(todo.id)} />
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
        {isOpenModalTodo && <Notas closeModal={closeModal} />}
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
