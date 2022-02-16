import {useContext} from 'react'
import {QueryContext} from '../contexts/QueryContext'

const useQuery = () => {
  const query = useContext(QueryContext)
  if (query == null) throw new Error('Context is not provided')

  return query
}

export default useQuery
