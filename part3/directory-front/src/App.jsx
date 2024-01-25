import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [personsFiltered, setPersonsFiltered] = useState([])
  const [notification, setNotification] = useState(null)

  const hook = () => {
    personService.getAll().then(personsData => {
      setPersons(personsData)
    })
  }

  useEffect(hook, [])

  const createPerson = (e) => {
    e.preventDefault()

    const trimName = newName.trim()
    setNewName(trimName)

    const person = {
      name: trimName,
      number: newNumber
    }
    
    if (persons.every(p => p.name !== trimName)) {
  
      personService.addPerson(person)
        .then(returnedPerson => {
          const newPersons = persons.concat(returnedPerson)
          setPersons(newPersons)
  
          setNotification({
            message: 'Registro añadido correctamente',
            type: 'add'
          })
  
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setNotification({
            message: 'El nombre debe tener al menos 3 caracteres, y la contraseña 8. Revise los campos para que cumplan las indicaciones.',
            type: 'error'
          })
  
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          console.log(error.response.data)
        })
      } else {
        const confirm = window.confirm(`${newName} ya tiene un registro en la aplicación. Si continua modificará el registro actual. ¿Quiere continuar?`)
        
        if(confirm) {
          const p = persons.find(p => p.name === trimName)

          modifyPerson(p.id, person)
        }
      }
      
      setNewName('')
      setNewNumber('')
  }

  const modifyPerson = (id, person) => {
    personService.updatePerson(id, person)
      .then(updatedPerson => {
        setPersons(persons.map(p => p.id !== id ? p : updatedPerson))
      })  
      .catch(error => {
        setPersons(persons.filter(p => p.id !== id))

        setNotification({
          message: 'El registro ya no se encuentra en la base de datos.',
          type: 'error'
        })

        setTimeout(()=> {
          setNotification(null)
        }, 5000)
      })
  }

  const deletePerson = (id) => {
    const confirm = window.confirm('¿Seguro que quieres borrar este registro?')

    if(confirm) {
      personService.deleteP(id)
      .then(returnedPerson => {
        const newPersons = persons.filter(p => p.id !== id)
        setPersons(newPersons)
      })
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
    setNewSearch(e.target.value)

    const search = e.target.value

    if(search !== '') {
      const newPersonsFil = persons.filter(p => p.name.toLowerCase().startsWith(search.toLowerCase()))

      setPersonsFiltered(newPersonsFil)
    } else {
      setPersonsFiltered([])
    }
  }

  return (
    <div id='directory-app'>
      <h2 className='main-title'>Phonebook</h2>

      <Filter inputVal={newSearch} handler={handleSearch} />

      <h3>Add a new</h3>
      {
        notification !== null && <Notification notification={notification} />
      } 
      <PersonForm
        createPerson={createPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />

      <Numbers persons={persons} personsFiltered={personsFiltered} deletePerson={deletePerson} />
    </div>
  )
}

export default App