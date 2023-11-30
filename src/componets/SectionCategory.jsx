import './sectionCategory.css'
import mokupCategory from '../assets/mokups.json'
export default function SectionCategory () {
  return (
    <section className="categories">
      {mokupCategory.map(category => (
        <p key={category.id}>{category.titulo}</p>
      ))}
    </section>
  )
}
