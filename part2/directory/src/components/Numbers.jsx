import Persons from './Persons/Persons'

const Numbers = ({ persons, personsFiltered, deletePerson }) => {
  return (
    <div className="numbers-container">
      <h2>Numbers</h2>
      <Persons persons={persons} personsFiltered={personsFiltered} deletePerson={deletePerson} />
    </div>
  )
}

export default Numbers