import deepFreeze from 'deep-freeze'
import noteReducer from './reducer'
import counterReducer from './reducer'

describe('note reducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = []
    const action = {
      type: 'NEW NOTE',
      date: {
        content: 'the app state is in redux',
        important: true,
        id: 1
      }
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })


  test('returns new state with action TOGGLE IMPORTANCE', () => {
    const state = [
      {
        content: "state changes are made with actions",
        important: true,
        id: 1
      },
      {
        content: "the app state is in redux",
        important: false,
        id: 2
      }
    ]

    const action = {
      type: 'TOGGLE IMPORTANCE',
      data: {
        id: 2
      }
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      content: 'the app state is in redux',
      important: true,
      id: 2
    })
  })

})