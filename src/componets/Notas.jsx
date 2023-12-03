import { useState } from 'react'
import { IconArrow, IconSave } from './Icons'
import './nota.css'
export default function Notas ({ closeModal }) {
  // New Todo
  const [newTodo, setNewTodo] = useState({})

  const saveTodo = () => {
    setNewTodo({
      id: 123,
      title: valueInput,
      infoTodo: valueText,
      date: fechaDate,
      dateHour: fechaHours
    })
  }
  console.log(newTodo)

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
