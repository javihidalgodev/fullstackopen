import { useState } from 'react'

const Title = ({ title }) => <h2>{title}</h2>

const Button = ({ id, text, handleClick }) => <button id={id}  onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const avg = (good - bad) / total
  const positive = (good / total) * 100

  if(total === 0) {
    return (<div><p>No given statistics</p></div>)
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text={'Good'} value={good} />
          <StatisticLine text={'Neutral'} value={neutral} />
          <StatisticLine text={'Bad'} value={bad} />
          <StatisticLine text={'All'} value={total} />
          <StatisticLine text={'Average'} value={avg ? avg : 0} />
          <StatisticLine text={'Positive'} value={`${total ? positive : 0}%`} />
        </tbody>
      </table>
    )
  }

}

function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (e) => {
    if(e.target.id === 'good') {
      const updatedGood = good + 1
      setGood(updatedGood)
    }
    if(e.target.id === 'neutral') {
      const updatedNeutral = neutral + 1
      setNeutral(updatedNeutral)
    }
    if(e.target.id === 'bad') {
      const updatedBad = bad + 1
      setBad(updatedBad)
    }
  }

  return (
    <>
      <Title title='Give Feedback' />
      <Button id='good' text='Good' handleClick={handleClick} />
      <Button id='neutral' text='Neutral' handleClick={handleClick} />
      <Button id='bad' text='Bad' handleClick={handleClick} />
      <Title title='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
