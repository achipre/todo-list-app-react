import { useState } from 'react'
import { IconArrow, IconSave } from './Icons'
import './nota.css'
import { useStore, useStoreCategories } from '../store/todoStore'
export default function Notas ({ closeModal }) {
  // New Todo
  const { addTodo } = useStore()
  const { categories } = useStoreCategories()

  const saveTodo = () => {
    const categoryNow = categories.filter(category => category.isSelect === true)[0].nombre
    const info = {
      id: Math.random(),
      title: valueInput,
      infoTodo: valueText,
      date: fechaDate,
      dateHour: fechaHours,
      category: (categoryNow === 'Todos' ? 'Sin Categoria' : categoryNow)
    }
    addTodo(info)
  }

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

  // Valor Fecha
  const fechaNewTodo = new Date()
  const fechaDate = fechaNewTodo.toDateString()
  const fechaHours = fechaNewTodo.toLocaleTimeString()
  return (
    <section className="nota">
      <header className="header-notas">
        <IconArrow closeModal={closeModal} />
        <input
          className="inputTitle"
          type="text"
          placeholder="Titulo"
          value={valueInput}
          onChange={newTitle}
        />
        <aside>
          <p className="headerDate">{fechaDate}</p>
          <p className="headerDate">{fechaHours}</p>
        </aside>
      </header>
      <textarea
        className="nota-textarea"
        placeholder="Empieza a escribir"
        value={valueText}
        onChange={newText}
      ></textarea>
      <IconSave saveTodo={saveTodo} />
    </section>
  )
}
