import Content from "./Content"
import Header from "./Header"

const Course = ( {courses} ) => {
  console.log(courses)

  return (
    <>
      {
        courses.map(course => {
          return <div className="course">
            <Header title={course.name} />
            <Content parts={course.parts} />
          </div>
        })
      }
    </>

  )
}

export default Course