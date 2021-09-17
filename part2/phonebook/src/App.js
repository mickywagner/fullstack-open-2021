import { useState } from 'react';

const App = () => {
    const [ persons, setPersons ] = useState([
      { name: 'Arto Hellas' }
    ])
    const [ newName, setNewName ] = useState('')

    const addNewName = (e) => {
      e.preventDefault()
      let newPerson = { name: newName}
      setPersons(persons.concat(newPerson))
      setNewName('')
    }

    const handleNameChange = (e) => {
      setNewName(e.target.value)
    }



    return(
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addNewName}>
          <label htmlFor="name">name: </label>
          <input id="name" value={newName} onChange={handleNameChange}/>
          <button type="submit">
            add
          </button>
        </form>
        <h2>Numbers</h2>
        {persons.map(person => <div key={persons.indexOf(person)}>{person.name}</div>
          )}
      </div>
    )
}

export default App;

