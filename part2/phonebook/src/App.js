import { useEffect, useState } from 'react'
import personsService from './services/persons'

const Filter = ({ filter, onChange }) => {
  return (
    <div>
      filter shown with
      <input value={filter} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({ addPhone, newName, handlePersonInput, newNumber, handleNumberInput }) => {
  return (
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

const Person = ({ person }) => {
  const handleDelete = () => {
    if (window.confirm('Do you really want to delete ' + person.name + '?')) {
      personsService.delete(person.id)
    }
  }

  return (
    <>
    <li>{person.name} - {person.number}</li>
    <button onClick={handleDelete}>Delete</button>
    </>
  )
}
const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map((person) => {
        return (
          <Person key={person.id.toString()} person={person}/>
        )
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

  useEffect((() => {
    personsService.getAll().then((persons) => setPersons(persons))
  }), [])

  const personsToShow = filter === ''
    ? persons
    : persons.filter((person) => {
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

  const checkPersonIfAdded = (newPerson) => {
    const alreadyAdded = persons.some((person) => {
      return person.name === newPerson.name
    })
    return alreadyAdded;
  }


  const addPhone = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if ((newName && newNumber) === '') {
      alert('You can\'t leave blank inputs!')
      return
    }

    if (!/[0-9]/ig.test(newNumber)) {
      alert('You must enter numbers.')
      return
    }

    if (!checkPersonIfAdded(newPerson)) {
      personsService.create(newPerson)
        .then(response => setPersons(persons.concat(response)))
    } else {
      const id = persons.find((person) => { return person.name === newPerson.name }).id
      console.log(id)
      if (window.confirm((`${newName} is already added to phonebook, replace the old number with a new one?`))) {
        personsService.update(newPerson, id)
      }

    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm addPhone={addPhone} newName={newName} handlePersonInput={handlePersonInput} newNumber={newNumber} handleNumberInput={handleNumberInput} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App