import Person from './Person'

const Persons = ({ personsFiltered, persons, deletePerson }) => {
  return (
    <>
      {
        personsFiltered.length > 0
          ? personsFiltered.map(p => <Person key={p.name} person={p} deletePerson={deletePerson} />)
          : persons.map(p => <Person key={p.name} person={p} deletePerson={deletePerson} />)
      }
    </>
  )
}

export default Persons