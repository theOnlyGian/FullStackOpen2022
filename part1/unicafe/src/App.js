import { useState } from 'react'


const StatisticsLine = (props) => {
  const text = props.text
  const feedback = props.feedback
  return (
    <>
      <tr>
        <td>
          {text}
        </td>
        <td>
          {feedback}
        </td>
      </tr>
    </>
  )
}

const Statistics = (props) => {
  const { good, bad, neutral, allFeedbacks } = props.feedbacks
  if (allFeedbacks === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text={'good'} feedback={good} />
          <StatisticsLine text={'neutral'} feedback={neutral} />
          <StatisticsLine text={'bad'} feedback={bad} />
          <StatisticsLine text={'average'} feedback={(good - bad) / allFeedbacks} />
          <StatisticsLine text={'positive'} feedback={(good * 100) / allFeedbacks + '%'} />
        </tbody>
      </table>

    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  const [feedbacks, setFeedback] = useState({
    good: 0,
    bad: 0,
    neutral: 0,
    allFeedbacks: 0
  })

  const addGood = () => {
    setFeedback({
      ...feedbacks,
      good: feedbacks.good + 1,
      allFeedbacks: feedbacks.allFeedbacks + 1
    })
  }

  const addBad = () => {
    setFeedback({
      ...feedbacks,
      bad: feedbacks.bad + 1,
      allFeedbacks: feedbacks.allFeedbacks + 1
    })
  }

  const addNeutral = () => {
    setFeedback({
      ...feedbacks,
      neutral: feedbacks.neutral + 1,
      allFeedbacks: feedbacks.allFeedbacks + 1
    })

  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={addGood} text='good' />
      <Button onClick={addNeutral} text='neutral' />
      <Button onClick={addBad} text='bad' />
      <h1>Statistics</h1>
      <Statistics feedbacks={feedbacks} />
    </div>
  )
}

export default App;
