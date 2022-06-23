import { useEffect, useState } from 'react'
import './index.css'
import personsService from './services/Service'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({
    success:null,
    content:''
  })

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
        .then(response => {
          setPersons(persons.concat(response))
          setMessage({
            success:true,
            content:`Added ${response.name}`
        })
          setTimeout(()=>setMessage({success:null, content:''}), 3000)
        })
      
    } else {
      const id = persons.find((person) => { return person.name === newPerson.name }).id
      console.log(id)
      if (window.confirm((`${newName} is already added to phonebook, replace the old number with a new one?`))) {
        personsService.update(newPerson, id)
        setMessage({
          success: true,
          content: `Number updated successfully`
        })
        setTimeout(() => setMessage({ success: null, content: '' }), 3000)
      }

    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} onChange={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm addPhone={addPhone} newName={newName} handlePersonInput={handlePersonInput} newNumber={newNumber} handleNumberInput={handleNumberInput} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} setMessage={setMessage}/>
    </div>
  )
}

export default App