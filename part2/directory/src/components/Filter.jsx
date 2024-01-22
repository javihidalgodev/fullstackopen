const Filter = ({ inputVal, handler }) => {
  return (
    <div id="filter-section" className="input">
      <span>Search</span>
      <input type="text" value={inputVal} onChange={handler} />
    </div>
  )
}

export default Filter