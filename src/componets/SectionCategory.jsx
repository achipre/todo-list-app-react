import { useState, useRef } from 'react'
import './sectionCategory.css'
import mokupCategory from '../assets/mokupsCategory.json'
import { FolderCategory, IconFilter, IconSend } from './Icons'
import { useStoreCategory } from '../store/todoStore'
export default function SectionCategory () {
  // Agregar Category
  const [categories, setCategories] = useState(mokupCategory)
  const [category, setCategory] = useState('')

  // interaccion en el Input Category
  const visibilidadCategory = useStoreCategory(state => state)

  const pushCategory = e => {
    if (category.trim() === '') return
    const newCategory = {
      id: Math.random().toString(),
      nombre: category
    }
    if (e.key === 'Enter' || e.type === 'click') {
      setCategories([...categories, newCategory])
      setCategory('')
      visibilidadCategory.turnToTrue()
    }
  }
  const refInputCategory = useRef()
  const refSectionInputCategory = useRef()

  const visibilityandFocus = () => {
    if (!(visibilidadCategory.visibilityInputCategory)) {
      visibilidadCategory.turnToTrue()
      setTimeout(() => {
        refInputCategory.current.focus()
      }, 1)
    }
    if (visibilidadCategory.visibilityInputCategory) {
      refSectionInputCategory.current.classList.add('sectionExitImput')
      setTimeout(() => {
        visibilidadCategory.turnToTrue()
      }, 85)
    }
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
      <FolderCategory addCategory={visibilityandFocus} />
      {visibilidadCategory.visibilityInputCategory && (
        <div className="sectionInputCategory" ref={refSectionInputCategory}>
          <input
            className="inputCategory"
            type="text"
            placeholder="Agregar Category"
            onKeyDown={pushCategory}
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
