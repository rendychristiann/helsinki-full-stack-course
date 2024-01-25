import { useState } from 'react'

const MostVoted = (props) => {
  const values = Object.keys(props.point).sort((a, b) => props.point[b] - props.point[a]);
  const maxNumber = values[0];
  console.log(maxNumber, props.point);
  return(
    <p>{props.anecdotes[maxNumber]}</p>
  )
}

const App = () => {
  const [point, setPoint] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [selected, setSelected] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const getSelected = () => {
    const randomNum =  Math.floor(Math.random() * 8);
    setSelected(randomNum);
  }
  const voteCount = () => {
    const updatePoint = [...point];
    updatePoint[selected] += 1;
    setPoint(updatePoint);
  }
  console.log(point);
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <button onClick = {() => voteCount()}>Vote</button>
      <button onClick = {() => getSelected()}>Next Anecdote</button>
      <h2>Anecdote with most votes</h2>
      <MostVoted anecdotes = {anecdotes} point = {point}/>
    </div>
  )
}
export default App