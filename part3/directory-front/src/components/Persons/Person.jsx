const Person = ({ person, deletePerson }) => {
  return (
    <tr id={person.id} className='person'>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button className="delete-btn" onClick={()=> deletePerson(person.id)}>delete</button>
      </td>
    </tr>
  )
}

export default Person