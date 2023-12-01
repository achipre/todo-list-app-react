import './sectionCategory.css'
import mokupCategory from '../assets/mokupsCategory.json'
import IconFilter, { FolderCategory } from './Icons'
export default function SectionCategory () {
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
      <FolderCategory />

    </section>
  )
}
