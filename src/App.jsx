import './App.css'
import LogoReact from './componets/LogoReact'
import InputSearch from './componets/InputSearch'
import SectionCategory from './componets/SectionCategory'
import LogoAddMore from './componets/LogoAddMore'
import Notas from './componets/Notas'
import { useState } from 'react'

export default function App () {
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
        <LogoAddMore openModal={openModal} />
      </section>
      {isOpenModalTodo && <Notas closeModal={closeModal} />}
    </main>
  )
}
