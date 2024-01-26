import { useState } from 'react'

const StatisticLine = (props) => {
  const {title, value} = props;
  return(
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props;
  const All = () => {
    return good + neutral + bad;
  }
  const Average = () => {
    return (good + -1 * bad) / All();
  }
  const Positive = () => {
    return (good / All() + " %")
  }
  if (All() === 0){
    return(
      <>
        <p>No Feedback Given</p>
      </>
    )
  }
  else{
    return(
      <>
        <h2>Statistics</h2>
        <StatisticLine title = 'Good' value = {good}/>
        <StatisticLine title = 'Neutral' value = {neutral}/>
        <StatisticLine title = 'Bad' value = {bad} />
        <StatisticLine title = 'All' value = {All()} />
        <StatisticLine title = 'Average' value = {Average()} />
        <StatisticLine title = 'Positive' value = {Positive()} />
      </>
    )
  }
  
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h2>Give Feedback</h2>
      <button onClick = {() => setGood(good + 1)}>Good</button>
      <button onClick = {() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick = {() => setBad(bad + 1)}>Bad</button>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App