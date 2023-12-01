import { useState, useRef } from 'react'
import './sectionCategory.css'
import mokupCategory from '../assets/mokupsCategory.json'
import { FolderCategory, IconFilter, IconSend } from './Icons'
export default function SectionCategory () {
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
        {mokupCategory.map(category => (
          <p className="category" key={category.id}>
            {category.nombre}
          </p>
        ))}
      </div>
      <FolderCategory addCategory={addCategory} />
      {visibleInputCategory && (
        <div className='sectionInputCategory'>

          <input
            className="inputCategory"
            type="text"
            placeholder="Agregar Category"
            ref={refInputCategory}
          />
          <IconSend />
        </div>

      )}
    </section>
  )
}
