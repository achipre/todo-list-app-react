import { useState, useRef } from 'react'
import './sectionCategory.css'
import { FolderCategory, IconFilter, IconSend } from './Icons'
import { useStoreCategories, useStoreCategory } from '../store/todoStore'
export default function SectionCategory () {
  // Agregar Category
  const { categories, addCategory, selectCategory } = useStoreCategories()
  const [category, setCategory] = useState('')

  // interaccion en el Input Category
  const { visibilityInputCategory, turnToTrue } = useStoreCategory()

  // add Category

  const pushCategory = e => {
    if (category.trim() === '') return
    const newCategory = {
      id: Math.random().toString(),
      nombre: category,
      isSelect: true
    }
    if (e.key === 'Enter' || e.type === 'click') {
      addCategory(newCategory)
      setCategory('')
      turnToTrue()
      localStorage.setItem(
        'categories',
        JSON.stringify([
          ...categories.map(category => ({ ...category, isSelect: false })),
          newCategory
        ])
      )
    }
  }
  const refInputCategory = useRef()
  const refSectionInputCategory = useRef()

  // selection Category
  const clickCategory = (e) => {
    selectCategory(e)
    const localCategory = JSON.parse(localStorage.getItem('categories'))
    const newLocalCategory = (
      localCategory.map(category =>
        category.id === e ? { ...category, isSelect: true } : { ...category, isSelect: false }
      )
    )
    localStorage.setItem('categories', JSON.stringify(newLocalCategory))
  }

  const visibilityandFocus = () => {
    if (!visibilityInputCategory) {
      turnToTrue()
      setTimeout(() => {
        refInputCategory.current.focus()
      }, 1)
    }
    if (visibilityInputCategory) {
      refSectionInputCategory.current.classList.add('sectionExitImput')
      setTimeout(() => {
        turnToTrue()
      }, 85)
    }
  }
  const localStorageCategories = localStorage.getItem('categories') === null ? localStorage.setItem('categories', JSON.stringify(categories)) : JSON.parse(localStorage.getItem('categories'))
  return (
    <section className="sectionCategories">
      <IconFilter />
      <div className="categories">
        {localStorageCategories.map(category => (
          <p
            onClick={() => clickCategory(category.id)}
            className={`category ${category.isSelect && 'selectCategory'}`}
            key={category.id}
          >
            {category.nombre}
          </p>
        ))}
      </div>
      <FolderCategory addCategory={visibilityandFocus} />
      {visibilityInputCategory && (
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
