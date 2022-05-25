const initialState = []

const noteReducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'NEW NOTE':
      return state.concat(action.data)
    case 'TOGGLE IMPORTANCE':
      const noteToChange = state.find(note => note.id === action.data.id)

      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note => note.id !== action.data.id ? note : changedNote)
    default: return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0));
      
export const createNote = (content) => {
  const note = {
    content: content,
    important: false,
    id: generateId(),
  };

  return {
    type: "NEW NOTE",
    data: note,
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE IMPORTANCE",
    data: {
      id: id,
    },
  };
};

export default noteReducer