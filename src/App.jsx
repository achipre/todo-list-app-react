import './App.css'
import LogoReact from './componets/LogoReact'
import InputSearch from './componets/InputSearch'
import SectionCategory from './componets/SectionCategory'
import LogoAddMore from './componets/LogoAddMore'
import Notas from './componets/Notas'
import { useState } from 'react'
import { useStore } from './store/todoStore'
import { IconAdd, IconDelete } from './componets/Icons'

export default function App () {
  const infoTodos = useStore((state) => state)
  const [todos] = useState([...infoTodos])
  // Hola

  // openModal
  const [isOpenModalTodo, setIsOpenModalTodo] = useState(false)
  const openModal = () => {
    setIsOpenModalTodo(true)
  }
  const closeModal = () => {
    setIsOpenModalTodo(false)
  }

  return (
    <main className="principal-main">
      <header className="header">
        <LogoReact />
        <InputSearch />
        <SectionCategory />
      </header>
      <section className="todos">
        {todos.length > 0 &&
          todos.map(todo => (
            <article className="articleTodo" key={todo.id}>
              <p className="articleTitle">{todo.title}</p>
              <p className="articleInfoTodo">{todo.infoTodo}</p>
              <div className="articleFooter">
                <p className="articleCategory">{todo.category}</p>
                <p className="articleDate">{todo.date}</p>
              </div>
              <IconDelete />
            </article>
          ))}
        {todos.length > 0 && <article className="articleNewTodo">
            <IconAdd />
          </article>
          }
        {todos.length === 0 && <LogoAddMore openModal={openModal} />}
      </section>
      {isOpenModalTodo && <Notas closeModal={closeModal} />}
    </main>
  )
}
