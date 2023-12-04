import { useRef } from 'react'
import { IconSearch } from './Icons'
import './inputSearch.css'
import { useStoreInputSearch } from '../store/todoStore'
export default function InputSearch () {
  // Muestra el texto escrito en el input de busqueda.
  const { valueSearch, typeValueSearch } = useStoreInputSearch()
  const variableSearch = (e) => {
    typeValueSearch(e.target.value)
  }

  // Click en el icono buscar selecciona el input para que se pueda escribir el texto a buscar.
  const refInputSearch = useRef(null)
  const selectInput = () => {
    refInputSearch.current.focus()
  }
  return (
    <section className="sectionSearch">
      <input className="inputSearch" placeholder="Busca Notas" ref={refInputSearch} value={valueSearch} onChange={variableSearch} />
      <IconSearch selectInput={selectInput} />
    </section>
  )
}
