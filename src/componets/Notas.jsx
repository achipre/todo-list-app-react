import { IconArrow, IconSave } from './Icons'
import './nota.css'
export default function Notas ({
  closeModal,
  saveTodo,
  refNota,
  fechaDate,
  fechaHours,
  valueInput,
  valueText,
  newTitle,
  newText
}) {
  // New Todo

  // Valor Fecha

  return (
    <section className="nota" ref={refNota}>
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
