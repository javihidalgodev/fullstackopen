const Person = ({ person, deletePerson }) => {
  return (
    <div id={person.id} className='person'>
      <p>
        {person.name} {person.number}
        <button className="delete-btn" onClick={()=> deletePerson(person.id)}>delete</button>
      </p>
    </div>
  )
}

export default Person