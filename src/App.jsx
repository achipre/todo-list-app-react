import './App.css'
import LogoReact from './componets/LogoReact'
import InputSearch from './componets/InputSearch'
import SectionCategory from './componets/SectionCategory'
import LogoAddMore from './componets/LogoAddMore'
import Notas from './componets/Notas'
import { useRef, useState } from 'react'
import { useStore, useStoreCategory, useStoreCategories } from './store/todoStore'
import { IconAdd, IconDelete } from './componets/Icons'

export default function App () {
  const { todos, removeTodo } = useStore()

  // Hola

  // openModal
  const [isOpenModalTodo, setIsOpenModalTodo] = useState(false)
  const openModal = () => {
    setIsOpenModalTodo(true)
  }
  const closeModal = () => {
    setIsOpenModalTodo(false)
  }
  const deleteTodo = (id) => {
    removeTodo(id)
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
  const filterbycategory = categories.filter(category => category.isSelect === true)
  const filtercategoryName = filterbycategory[0].nombre
  const todosFilter = (filtercategoryName === 'Todos') ? todos : todos.filter(todo => todo.category === filtercategoryName)

  return (
    <main className="principal-main">
      <header className="header">
        <LogoReact />
        <InputSearch />
        <SectionCategory />
      </header>
      <section className="todos" ref={refSectionTodo}>
        {todosFilter.map(todo => (
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

        {todosFilter.length === 0
          ? <LogoAddMore openModal={openModal} />
          : (
          <article onClick={openModal} className="articleNewTodo">
            <IconAdd />
          </article>
            )}
      </section>
      {isOpenModalTodo && <Notas closeModal={closeModal} />}
    </main>
  )
}
