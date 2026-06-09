import { useState } from 'react'
import '../styles/App.css'
import icon from '../assets/paper.png'
import PersonalContainer from './Personal'
import ExperienceContainer from './Experience'
import EducationContainer from './Education'
import { user } from '../assets/data'

function Header () {
  return (
    <header>
      <img src={icon} alt="Paper icon" />
      <h1>CV Maker</h1>
    </header>
  )
}

export function Input ({ type, label, id, placeholder, handleChange }) {
  return (
    <div className={id}>
      <label htmlFor={id}>{label + ": "}</label>
      <input type={type} id={id} name={id} defaultValue={placeholder}  onChange={handleChange} autoComplete='on'/>
    </div>
  )
}

function App() {
  const [info, setInfo] = useState(user)

  return (
    <>
      <Header />
      <section>
        <PersonalContainer user={info} setUser={setInfo}/>
        <EducationContainer user={info} setUser={setInfo}/>
        <ExperienceContainer user={info} setUser={setInfo}/>
      </section>
    </>
  )
}

export default App
