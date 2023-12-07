import { useState, useRef } from 'react'
import './sectionCategory.css'
import { FolderCategory, IconFilter, IconSend, IconDeleteCategory } from './Icons'
import { useStoreCategories, useStoreCategory } from '../store/todoStore'
export default function SectionCategory () {
  // Agregar Category
  const { categories, addCategory, selectCategory } = useStoreCategories()
  const [category, setCategory] = useState('')

  // interaccion en el Input Category
  const { visibilityInputCategory, turnToTrue } = useStoreCategory()

  // add Category

  const pushCategory = e => {
    const localCategory = JSON.parse(localStorage.getItem('categories'))

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
          ...localCategory.map(category => ({ ...category, isSelect: false })),
          newCategory
        ])
      )
    }
  }
  const refInputCategory = useRef()
  const refSectionInputCategory = useRef()

  // selection Category
  const clickCategory = (e) => {
    const localCategory = JSON.parse(localStorage.getItem('categories'))

    selectCategory(e)
    const newLocalCategory = (
      localCategory.map(category =>
        category.id === e ? { ...category, isSelect: true } : { ...category, isSelect: false }
      )
    )
    localStorage.setItem('categories', JSON.stringify(newLocalCategory))
  }
  // handle category delete
  const handleDelete = (id, e) => {
    e.stopPropagation()
    const localCategory = JSON.parse(localStorage.getItem('categories'))
    if (localCategory.filter(cate => cate.id === id)[0].isSelect) {
      selectCategory('1')
      const newLocalCategory = JSON.stringify(
        localCategory
          .filter(category => category.id !== id)
          .map(firstTodo =>
            firstTodo.id === '1' ? { ...firstTodo, isSelect: true } : { ...firstTodo }
          )
      )
      localStorage.setItem('categories', newLocalCategory)
    } else {
      selectCategory(id)
      const newLocalCategory = JSON.stringify(
        localCategory
          .filter(category => category.id !== id)
          .map(firstTodo =>
            firstTodo.id === id ? { ...firstTodo, isSelect: true } : { ...firstTodo }
          )
      )
      localStorage.setItem('categories', newLocalCategory)
    }
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
        {localStorageCategories?.map(category => (
          <div
            onClick={() => clickCategory(category.id)}
            className={`bloqCategory ${category.isSelect && 'selectCategory'}`}
            key={category.id}
          >
            <p className={'category'}>{category.nombre}</p>
            {category.id !== '1' && category.id !== '2' && (
              <IconDeleteCategory handleDelete={(e) => handleDelete(category.id, e)} />
            )}
          </div>
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
