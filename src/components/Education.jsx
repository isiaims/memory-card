import { useState } from "react";
import { Input } from "./App";


 function Education ({ school, isActive, onEdit, onEdited, onDelete }) {
  return (
    <div>
      {
        isActive ? 
        (
          <form onSubmit={onEdited}>
            <Input type={"text"} label={"Institution Attended"} id={"college"} placeholder={`${school.schoolName}`}/>
            <Input type={"text"} label={"Course  Studied"} id={"course"} placeholder={`${school.course}`}/>
            <Input type={"month"} label={"From"} id={"date-from" + `${school.id}`} placeholder={school.from}/>
            <Input type={"month"} label={"To"} id={"date-to" + `${school.id}`} placeholder={school.to}/>
            <button>Submit</button>
          </form>
        ) :
        (
          <>
            <h3>{school.schoolName}</h3>
            <div className="date">
              <p>{school.course}</p>
              <p>{school.from.split("-")[0]} - {school.to.split("-")[0]}</p>
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

export default function EducationContainer ({ user, setUser }) {
  const schools = user.education
  const [activeSchool, setActiveSchool] = useState(schools[schools.length - 1].id)
  
  function handleAddMoreEduc (e) {
    // Create a safe deep copy of schools
    const newSchools = schools.map(school => ({...school}));

    // Save input values from active school
    if (activeSchool !== null) {
      const formDiv = e.currentTarget.closest("div").querySelector("form")
      const schoolID = newSchools.findIndex(item => item.id === activeSchool)
      const currSchool = newSchools[schoolID]
      currSchool.schoolName = formDiv[0].value
      currSchool.course = formDiv[1].value
      currSchool.from = formDiv[2].value
      currSchool.to = formDiv[3].value
    }

    const id = crypto.randomUUID()
    // Create new fields for new school entries
    newSchools.push({
      id: id,
      schoolName: "",
      course: "",
      from: "2000-01",
      to: "2004-12"
    })
    setUser({...user, education: newSchools})
    setActiveSchool(id)
  }

  function handleSubmit (e, school) {
    e.preventDefault()
    const newSchools = schools.map(school => ({...school}));
    const schoolID = newSchools.findIndex(item => item.id === school.id)
    const currSchool = newSchools[schoolID]
    currSchool.schoolName = e.target[0].value
    currSchool.course = e.target[1].value
    currSchool.from = e.target[2].value
    currSchool.to = e.target[3].value
    setActiveSchool(null)
    setUser({...user, education: newSchools})
  }

  function handleDelete (id) {
    const newSchools = schools.map(school => ({...school}));
    if (schools.length > 1) {
      newSchools.splice(newSchools.findIndex(item => item.id === id), 1)
    } else {
      const school = newSchools[newSchools.findIndex(item => item.id === id)]
      school.schoolName = ""
      school.course = ""
      school.from = "2000-01"
      school.to = "2004-12"
      setActiveSchool(id)
    }
    setUser({...user, education: newSchools})
  }
  
  return (
    <>
      <div className="school">
        <h2>Education</h2>
        {
          schools.map(school => (
              <Education
                key={school.id}
                school={school}
                isActive={activeSchool === school.id}
                onEdit={() => setActiveSchool(school.id)}
                onEdited={(e) => handleSubmit(e, school)}
                onDelete={() => handleDelete(school.id)}
              />
          ))
        }
        <button onClick={(e) => {handleAddMoreEduc(e)}}>Add More</button>
      </div>
      <hr />
    </>
  )
}