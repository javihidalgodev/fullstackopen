import Persons from './Persons/Persons'

const Numbers = ({ persons, personsFiltered, deletePerson }) => {
  return (
    <div className="numbers-container">
      <h2>Numbers</h2>
      {
        persons.length > 0
          ? <Persons persons={persons} personsFiltered={personsFiltered} deletePerson={deletePerson} />
          : <p className='no-numbers'>No numbers registered</p>
      }
    </div>
  )
}

export default Numbers