import axios from 'axios'
import { useEffect, useState } from 'react'

const Filter = ({ filter, onChange })=>{
  return(
    <div>
      filter shown with
      <input value={filter} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({ addPhone, newName, handlePersonInput, newNumber, handleNumberInput })=>{
  return(
    <div>
      <form onSubmit={addPhone}>
        <div>
          name: <input value={newName} onChange={handlePersonInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({personsToShow})=>{
  return(
    <div>
      {personsToShow.map((person) => {
        return <li key={person.id}>{person.name} - {person.number}</li>
      })}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: 123,
      id: 1
    }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect((()=>{
    const url = 'http://localhost:3001/persons'
    axios
    .get(url)
    .then((response)=>setPersons(response.data))
  }), [])

  const personsToShow = filter ===''
  ? persons
  : persons.filter((person)=>{
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  const handlePersonInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const checkPerson = (newPerson) => {
    const alreadyAdded = persons.some((person) => {
      return person.name === newPerson.name
    })
    return alreadyAdded;
  }


  const addPhone = (event) => {
    event.preventDefault()
    const id = (Object.keys(persons).length)+1
    const newPerson = {
      name: newName,
      number: newNumber,
      id: [id]
    }

    if ((newName && newNumber) === ''){
      alert('You can\'t leave blank inputs!')
      return
    }

    if (!/[0-9]/ig.test(newNumber)) {
      alert('You must enter numbers.')
      return
    }

    if (!checkPerson(newPerson)) {
      setPersons(persons.concat(newPerson))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm addPhone={addPhone} newName={newName} handlePersonInput={handlePersonInput} newNumber={newNumber} handleNumberInput={handleNumberInput}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App