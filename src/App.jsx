import './App.css'
import LogoReact from './componets/LogoReact'
import InputSearch from './componets/InputSearch'
import SectionCategory from './componets/SectionCategory'
import LogoAddMore from './componets/LogoAddMore'
import Notas from './componets/Notas'
import { useRef, useState } from 'react'
import { useStore, useStoreCategory } from './store/todoStore'
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
  const isOpenCatgory = useStoreCategory(state => state.visibilityInputCategory)
  const refSectionTodo = useRef()

  if (isOpenCatgory) {
    refSectionTodo.current.classList.add('todosWithOpenCategory')
    refSectionTodo.current.classList.remove('todosWithCloseCategory')
  }
  if (!isOpenCatgory) {
    refSectionTodo.current?.classList?.add('todosWithCloseCategory')
    refSectionTodo.current?.classList?.remove('todosWithOpenCategory')
  }

  return (
    <main className="principal-main">
      <header className="header">
        <LogoReact />
        <InputSearch />
        <SectionCategory />
      </header>
      <section
        className='todos'
        ref={refSectionTodo}
      >
        {todos.length > 0 &&
          todos.map(todo => (
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
        {todos.length > 0 && (
          <article onClick={openModal} className="articleNewTodo">
            <IconAdd />
          </article>
        )}
        {(todos.length === 0 || todos.length === undefined) && (
          <LogoAddMore openModal={openModal} />
        )}
      </section>
      {isOpenModalTodo && <Notas closeModal={closeModal} />}
    </main>
  )
}
