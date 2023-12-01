import { useRef } from 'react'
import { IconSearch } from './Icons'
import './inputSearch.css'
export default function InputSearch () {
  const refInputSearch = useRef(null)
  const selectInput = () => {
    refInputSearch.current.focus()
  }
  return (
    <section className="sectionSearch">
      <input className="inputSearch" placeholder="Busca Notas" ref={refInputSearch} />
      <IconSearch selectInput={selectInput} />
    </section>
  )
}
