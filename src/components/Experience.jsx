import { useState } from "react";
import { Input } from "./App";

function Experience ({ company, isActive, onEdit, onEdited, onDelete }) {
  return (
    <div key={company.id} className="company">
      {
        isActive ?
        (
          <form onSubmit={onEdited}>
            <Input type={"text"} label={"Company"} id={"company"} placeholder={company.companyName}/>
            <Input type={"text"} label={"Position/Job Title"} id={"post"} placeholder={company.position}/>
            <div>
              <label htmlFor="description">Brief Description of Main Responsibilities: </label>
              <textarea name="description" id="description" defaultValue={company.description}></textarea>
            </div>
            <Input type={"month"} label={"From"} id={"begin" + `${company.id}`} placeholder={company.from}/>
            <Input type={"month"} label={"To"} id={"till" + `${company.id}`} placeholder={company.to}/>
            <button>Submit</button>
          </form>
        ) : 
        (
          <>
            <h3>{company.companyName}</h3>
            <p>{company.position}</p>
            <div className="date">
              <p>{company.description}</p>
              <p>{company.from.split("-")[0]} - {company.to.split("-")[0]}</p>
            </div>
            <div className="buttons">
              <button onClick={onEdit}>Edit</button>
              <button onClick={onDelete}>Delete</button>
            </div>
          </>
        )
      }
    </div>
  )
}

export default function ExperienceContainer ({ user, setUser }) {
  const companies = user.experience
  const [activeCompany, setActiveCompany] = useState(companies.at(-1).id)
  
  function handleAddMoreExpe (e) {
    const newCompanies = companies.map(company => ({...company}));

    // Save input values from active company
    if (activeCompany !== null) {
      const formDiv = e.currentTarget.closest("div").querySelector("form")
      const currCompany = newCompanies[newCompanies.findIndex(item => item.id === activeCompany)]
      currCompany.companyName = formDiv[0].value
      currCompany.position = formDiv[1].value
      currCompany.description = formDiv[2].value
      currCompany.from = formDiv[3].value
      currCompany.to = formDiv[4].value
    }

    const id = crypto.randomUUID()
    // Create new fields for new company entries
    newCompanies.push({
      id: id,
      companyName: "",
      position: "",
      description: "",
      from: "2000-01",
      to: "2001-01"
    })
    setUser({...user, experience: newCompanies})
    setActiveCompany(id)
  }

  function handleSubmit (e, company) {
    e.preventDefault()
    const newCompanies = companies.map(company => ({...company}));
    const currCompany = newCompanies[newCompanies.findIndex(item => item.id === company.id)]
    currCompany.companyName = e.target[0].value
    currCompany.position = e.target[1].value
    currCompany.description = e.target[2].value
    currCompany.from = e.target[3].value
    currCompany.to = e.target[4].value
    setActiveCompany(null)
    setUser({...user, experience: newCompanies}) 
  }
  
  function handleDelete (id) {
    const newCompanies = companies.map(company => ({...company}));
    if (companies.length > 1) {
      newCompanies.splice(newCompanies.findIndex(item => item.id === id), 1)
    } else {
        const company = newCompanies[newCompanies.findIndex(item => item.id === id)]
        company.companyName = ""
        company.position = ""
        company.description = ""
        company.from = "2000-01"
        company.to = "2001-01"
        setActiveCompany(id)
      }
    setUser({...user, experience: newCompanies}) 
  }

  return (
    <>
      <div className="experience">
        <h2>Experience</h2>
        {
          companies.map(company => (
            <Experience
              key={company.id}
              company={company}
              isActive={activeCompany === company.id}
              onEdit={() => setActiveCompany(company.id)}
              onEdited={(e) => handleSubmit(e, company)}
              onDelete={() => handleDelete(company.id)}
            />
          ))
        }
        <button onClick={handleAddMoreExpe}>Add More</button>
      </div>
      <hr />
    </>
  )
}