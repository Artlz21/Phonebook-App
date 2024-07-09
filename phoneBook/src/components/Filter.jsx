const Filter = ({searchName, filterName, addedNameNotification}) => {
  if (addedNameNotification === null){
    return(
      <>
        <h2>Phonebook</h2>
        <div>
          <b>Search by name: </b><input value={searchName} onChange={filterName}/>
        </div>
      </>
    )
  }

  return(
    <>
      <h2>Phonebook</h2>
      <div className="notification">
        {addedNameNotification}
      </div>
      <div>
        <b>Search by name: </b><input value={searchName} onChange={filterName}/>
      </div>
    </>
  )
}

export default Filter