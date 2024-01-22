const Content = ({ parts }) => {

  let total = parts.reduce((acc, val) => acc + val.exercises, 0)

  console.log(total)

  return (
    <div className="course-content">
      {
        parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
      }

      <p><strong>Total of {total} exercises</strong></p>
    </div>
  )
}

export default Content