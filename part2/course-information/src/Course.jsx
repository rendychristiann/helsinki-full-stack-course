import Header from "./Header"
import Content from "./Content"

const Course = ({course}) => {
    return (
      <div>
        <Header course = {course[0].name}/>
        <Content parts = {course[0].parts}/>
        <Header course = {course[1].name}/>
        <Content parts = {course[1].parts}/>
      </div>
    )
  }

export default Course
  