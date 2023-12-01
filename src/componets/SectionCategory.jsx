import { useState, useRef } from 'react'
import './sectionCategory.css'
import mokupCategory from '../assets/mokupsCategory.json'
import { FolderCategory, IconFilter, IconSend } from './Icons'
export default function SectionCategory () {
  // Agregar Category
  const [categories, setCategories] = useState(mokupCategory)
  const [category, setCategory] = useState('')

  const pushCategory = () => {
    const fechaActual = new Date()
    const newCategory = {
      id: Math.random().toString(),
      nombre: category,
      date: fechaActual.toUTCString()
    }
    setCategories([...categories, newCategory])
    setCategory('')
    setVisibleInputCategory(false)
  }

  // interaccion en el Input Category
  const [visibleInputCategory, setVisibleInputCategory] = useState(false)
  const refInputCategory = useRef(null)
  const addCategory = () => {
    setVisibleInputCategory(!visibleInputCategory)
    setTimeout(() => {
      refInputCategory?.current?.focus()
    }, 1)
  }
  return (
    <section className="sectionCategories">
      <IconFilter />
      <div className="categories">
        {categories.map(category => (
          <p className="category" key={category.id}>
            {category.nombre}
          </p>
        ))}
      </div>
      <FolderCategory addCategory={addCategory} />
      {visibleInputCategory && (
        <div className="sectionInputCategory">
          <input
            className="inputCategory"
            type="text"
            placeholder="Agregar Category"
            ref={refInputCategory}
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <IconSend pushCategory={pushCategory} />
        </div>
      )}
    </section>
  )
}
