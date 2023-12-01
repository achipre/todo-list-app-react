import './App.css'
import LogoReact from './componets/LogoReact'
import InputSearch from './componets/InputSearch'
import SectionCategory from './componets/SectionCategory'
import LogoAddMore from './componets/LogoAddMore'

export default function App () {
  return (
    <main className="principal-main">
      <header className="header">
        <LogoReact />
        <InputSearch />
        <SectionCategory />
      </header>
      <section className='todos'>
        <LogoAddMore />
      </section>
    </main>
  )
}
