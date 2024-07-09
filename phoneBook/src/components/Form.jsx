const Form = ({addName, newName, newNumber, addNewName, addNewNumber}) => {
    return(
      <>
        <h2>Add New Name and Number</h2>
        <form onSubmit={addName}>
          <div>
            <b>name: </b><input value={newName} onChange={addNewName}/>
          </div>
          <div>
            <b>number: </b><input value={newNumber} onChange={addNewNumber}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      
      </>
    )
  }

export default Form