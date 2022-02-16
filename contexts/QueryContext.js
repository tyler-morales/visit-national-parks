import {createContext, useReducer} from 'react'

// Set initial state of search bar
const initialState = {
  searchQuery: '',
}

// create the context
export const QueryContext = createContext(null)

// create the provider
export const QueryProvider = ({children}) => {
  const [state, dispatch] = useReducer(QueryReducer, initialState)

  return (
    <QueryContext.Provider value={{searchQuery: state.searchQuery, dispatch}}>
      {children}
    </QueryContext.Provider>
  )
}

const QueryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}
