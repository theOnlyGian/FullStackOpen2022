import { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </>
  )
}

const DisplayText = (props)=>{
  const {title, anecdote, votes} = props
  return(
    <div>
      <h1>{title}</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const randomNumber = () => {
    const max = anecdotes.length;
    return Math.floor(Math.random() * max)
  }

  const [anecdote, setAnecdote] = useState({
    selectedAnecdote: anecdotes[randomNumber()]
  })

  const [mostVoted, setMostVoted] = useState('')

  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  })


  const generateAnecdote = () => {
    setAnecdote({
      ...anecdote,
      selectedAnecdote: anecdotes[randomNumber()]
    })
  }
  
  const getIndexOfAnecdote = () => {
    return anecdotes.indexOf(anecdote.selectedAnecdote)
  }

  const getIndexMostVoted = () => {
    let mostVotes = 0;
    let indexMostVoted = 0;
    for (let i = 0; i < Object.keys(votes).length; i++) {
      if (votes[i] > mostVotes) {
        mostVotes = votes[i]
        indexMostVoted = i;
      }
    }
    return indexMostVoted;
  }

  const getNumberOfVotes = (i)=>{
    return votes[i]
  }

  const vote = () => {
    const index = getIndexOfAnecdote()
    setVotes({
      ...votes,
      [index]: votes[index] + 1,
    })
    setMostVoted(anecdotes[getIndexMostVoted()])
  }

  return (
    <div>
      <DisplayText title={'Anecdote of the day'} anecdote={anecdote.selectedAnecdote} votes={getNumberOfVotes(getIndexOfAnecdote())} />
      <Button onClick={vote} text={'vote'} />
      <Button onClick={generateAnecdote} text={'next anecdote'} />
      <DisplayText title={'Anecdote with most votes'} anecdote={mostVoted} votes={getNumberOfVotes(getIndexMostVoted())}/>
    </div>
  )
}

export default App;
