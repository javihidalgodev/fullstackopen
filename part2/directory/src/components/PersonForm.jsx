const PersonForm = ({ createPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form id='form' onSubmit={createPerson}>
      <div className="input">
        <span>Name</span>
        <input value={newName} onChange={handleNameChange} />
      </div>
      <div className="input">
        <span>Number</span>
        <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <button type="submit" id="add-btn">Add</button>
    </form>
  )
}

export default PersonForm