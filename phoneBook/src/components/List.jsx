const List = ({nameMap, deleteName}) => {
    return(
      <>
        <h2>Numbers</h2>
        <ul>
          {nameMap.map((nameMap) => (
            <li key={nameMap.id}>
              <b>{nameMap.name}:</b> {nameMap.number} <button onClick={() => deleteName(nameMap.id)}>delete</button>
            </li>))}
        </ul>  
      </>
  )} 

export default List