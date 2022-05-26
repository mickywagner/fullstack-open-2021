import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes =>
      dispatch(setAnecdotes(anecdotes))
    )
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  )
}

export default App