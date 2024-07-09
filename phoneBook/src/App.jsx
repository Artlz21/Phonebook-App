// This is a redone version of the phone list app from the previous excersise.
// Here we set up a backend to store and access data for the front end that runs
// our app. The backend is setup using json server and accessed using axios.
// This excercise is just one part to setup the server and connect the 2.
// - The Phonebook Step 6
//    This excercise is a continuation of the last one where we fully connect the
//    server and the app to add new names to the server and then display them. We
//    added a delete feature that covers removing a name from the server with the
//    axios delete route. finally we modulated the routes to their own file and 
//    connect the module to the app to be used effectively. 
import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import List from './components/List'
import listServices from './services/list'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [addedNameNotification, setAddedNameNotification] = useState(null)
  
  const namesToShow = searchName === '' ? persons : persons.filter(person => person.name.includes(searchName))

  // this is our get route that pulls all data
  useEffect(() => {
    console.log('Effect')
    listServices.getAll().then(response => {
      console.log('Promise fulfilled')
      setPersons(response)
    })
  },[])
  console.log('render', persons.length, 'persons')

  // this is our post route that adds a new name to the list
  const addName = e => {
    e.preventDefault()

    if (persons.some(person => person.name === newName)){
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
      const newObject = {name: newName, number: newNumber}
      
      listServices.create(newObject).then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        setAddedNameNotification(`Added ${newPerson.name}`)
        setTimeout(() => setAddedNameNotification(null), 5000)
      })
    }
  }

  // this is our delete route that deletes a name from the list 
  const removeName = (id) => {
    listServices.remove(id).then(deletedName => (
      setPersons(persons.filter(person => (
        deletedName.id !== person.id
      )))
    ))
  }

  // these are our html functions that give functionality to inputs and buttons
  const addNewName = e => {
    setNewName(e.target.value)
  }

  const addNewNumber = e => {
    setNewNumber(e.target.value)
  }

  const filterName = e => {
    setSearchName(e.target.value)
  }

  const deleteName = (id) => {
    removeName(id)
  }

  return (
    <div>
      <Filter searchName={searchName} filterName={filterName} addedNameNotification={addedNameNotification}/>
      <Form addName={addName} newName={newName} newNumber={newNumber} addNewName={addNewName} addNewNumber={addNewNumber}/>
      <List nameMap={namesToShow} deleteName={deleteName}/>
    </div>
  )
}

export default App