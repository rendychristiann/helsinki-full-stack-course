// Passing state to child components
import { useState } from 'react'

const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value', counter)
  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }
  const decreaseByOne = () => { 
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }
  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={setToZero} text="zero" />
      <Button onClick={decreaseByOne} text="minus" />
    </div>
  )
} 
export default App

// Event Handling

// import { useState } from 'react'
// const App = () => {
//   const [ counter, setCounter ] = useState(0)
//   const increaseByOne = () => setCounter(counter + 1)
//   const setToZero = () => setCounter(0)
//   return (
//     <div>
//       <div>{counter}</div>
//       <button onClick={increaseByOne}>
//         plus
//       </button>
//       <button onClick={setToZero}>
//         zero
//       </button>
//     </div>
//   )
// }
// export default App

// UseState

// import { useState } from 'react'
// const App = () => {
//   const [ counter, setCounter ] = useState(0)
//   setTimeout(
//     () => setCounter(counter + 1),
//     1000
//   )
//   return (
//     <div>{counter}</div>
//   )
// }
// export default App


// Props restructuring

// const Hello = ({name, age}) => {
//   // const name = props.name;
//   // const age = props.age;
//   // const { name, age } = props;

//   // Using Return:
//   // const bornYear = () => {
//   //   const yearNow = new Date().getFullYear();
//   //   return yearNow - props.age;
//   // }

//   // Not using Return: 
//   const bornYear = () => new Date().getFullYear() - age;
//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }


// const App = () => {
//   const name = 'Peter'
//   const age = 10

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </div>
//   )
// }

// export default App;