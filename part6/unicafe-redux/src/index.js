import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const updateAction = (theaction) => {
    switch(theaction) {
      case 'GOOD':
        store.dispatch({
          type: 'GOOD'
        })
        break
      case 'BAD':
        store.dispatch({
          type: 'BAD'
        })
        break
        case 'OK':
        store.dispatch({
          type: 'OK'
        })
        break
      case 'ZERO':
        store.dispatch({
          type: 'ZERO'
        })
        break
      default:
        return
    }
   
  }

  return (
    <div>
      <h1>Ratings counter</h1>
      <button onClick={() => updateAction('GOOD')}>good</button>
      <button onClick={() => updateAction('OK')}>ok</button>
      <button onClick={() => updateAction('BAD')}>bad</button>
      <button onClick={() => updateAction('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
