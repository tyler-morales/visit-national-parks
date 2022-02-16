import {useState, forwardRef, useImperativeHandle} from 'react'
import Select from 'react-select'
import {searchStyles, dropdownStyles} from '../../styles/dropdown'
import {useRouter} from 'next/router'
import {ImSpinner8} from 'react-icons/im'

import parks from '../../data/parks.json'
import states from '../../data/states.json'
import activities from '../../data/activities.json'
import topics from '../../data/topics.json'

import useQuery from '../../hooks/useQuery'

const SearchBar = forwardRef(({fullSearchBar}, ref) => {
  const router = useRouter()
  const {searchQuery, dispatch} = useQuery()
  const query = useQuery()

  useImperativeHandle(ref, () => ({
    paginate(direction) {
      paginate(direction)
    },
  }))

  const [tab, setTab] = useState('filter')
  const [selectedPark, setselectedPark] = useState(null)
  const [selectedState, setselectedState] = useState(null)
  const [selectedActivity, setselectedActivity] = useState(null)
  const [selectedTopic, setselectedTopic] = useState(null)
  const [incrementPage, setIncrementPage] = useState(0)
  const [loading, setLoading] = useState(false)

  const paramsString = ''
  let searchParams = new URLSearchParams(paramsString)
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      router.push(`/park/${selectedPark.value}`)
      // setLoading(false)
    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  }

  const handleFilterSubmit = (e) => {
    setIncrementPage(0)

    e.preventDefault()
    setLoading(true)
    try {
      if (selectedState) {
        searchParams.append('stateCode', selectedState.value)
        // Update query
        dispatch({
          type: 'SET_QUERY',
          payload: selectedState.value,
        })
      }
      if (selectedActivity) {
        searchParams.append('q', selectedActivity.value)
        // Update query
        dispatch({
          type: 'SET_QUERY',
          payload: selectedActivity.value,
        })
      }
      if (selectedTopic) {
        searchParams.append('q', selectedTopic.value)
        // Update query
        dispatch({
          type: 'SET_QUERY',
          payload: selectedTopic.value,
        })
      }
      searchParams.append('start', 0)

      router.push(`/results/?${searchParams.toString()}`)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  }

  const paginate = (direction) => {
    direction == 'increment'
      ? setIncrementPage((incrementPage += 20))
      : setIncrementPage((incrementPage -= 20))

    try {
      // attatch the stateCode query parametar
      if (searchQuery.length == 2) searchParams.append('stateCode', searchQuery)
      // attatch the q (catch-all) query parametar
      if (searchQuery.length > 2) searchParams.append('q', searchQuery)
      // attatch the start query parametar to every query
      searchParams.append('start', incrementPage)

      router.push(`/results/?${searchParams.toString()}`)
    } catch (err) {
      console.error(err)
    }
  }

  // clear filter inputs
  const clearInputs = (e) => {
    e.preventDefault
    setselectedPark(null)
    setselectedState(null)
    setselectedActivity(null)
    setselectedTopic(null)
  }

  const tabStyles = {
    active:
      'bg-green-600 text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none',
    inActive:
      'bg-green-200 text-green-500 hover:shadow-md hover:shadow-green-200 hover:-translate-y-1 hover:border-2 hover:border-green-700 hover:text-green-700',
  }

  return (
    <div
      className={`w-full rounded-3xl ${
        fullSearchBar
          ? ' pb-4 bg-white border-2 border-green-800 p-6 shadow-xl'
          : 'pb-6'
      }`}>
      {/* Nav Buttons */}
      {fullSearchBar && (
        <div className="pb-8 border-b-2 border-gray-200">
          <span className="block mb-4 text-xs tracking-widest text-center text-gray-400 uppercase">
            Search by
          </span>
          <div className="flex justify-center gap-4 md:gap-10">
            <button
              onClick={() => setTab('filter')}
              className={`transition-all text-md md:px-6 px-2 py-3 md:text-lg rounded-xl md:w-40 w-full font-bold border-transparent border-2 ${
                tab == 'filter' ? tabStyles.active : tabStyles.inActive
              }`}>
              Filters
            </button>
            <button
              onClick={() => setTab('name')}
              className={`transition-all text-md md:px-6 px-2 py-3 md:text-lg rounded-xl md:w-40 w-full font-bold border-transparent border-2 ${
                tab == 'name' ? tabStyles.active : tabStyles.inActive
              }`}>
              Park Name
            </button>
          </div>
        </div>
      )}

      {/* Input and filters */}
      {tab == 'name' && (
        <div>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between">
              <label className="block mb-4 text-xs tracking-widest text-gray-400 uppercase">
                Park Name
              </label>
              <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
                <Select
                  options={parks}
                  value={selectedPark}
                  onChange={setselectedPark}
                  id="parks"
                  className="w-full cursor-text"
                  styles={searchStyles}
                />
                <button
                  type="submit"
                  className="self-end w-full py-3 font-bold text-white transition-all bg-green-700 border-2 border-transparent rounded-full md:px-12 md:w-auto h-min focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none hover:bg-green-600">
                  {!loading ? (
                    <span>Search</span>
                  ) : (
                    <ImSpinner8 size="1.5em" className="animate-spin-slow" />
                  )}
                </button>
              </div>
            </div>
          </form>
          <button
            onClick={(e) => clearInputs(e)}
            className="px-4 py-2 mt-4 text-xs text-center text-gray-800 bg-gray-300 rounded-full w-max">
            x Clear
          </button>
        </div>
      )}

      {tab == 'filter' && (
        <div>
          <form
            onSubmit={handleFilterSubmit}
            className={fullSearchBar ? 'mt-8' : null}>
            <div className="flex flex-col w-full gap-5 md:flex-row">
              <div
                className={`flex flex-col w-full ${
                  fullSearchBar ? 'gap-5' : 'gap-3'
                }`}>
                <label className="block text-xs tracking-widest text-gray-400 uppercase">
                  State
                </label>
                <Select
                  options={states}
                  value={selectedState}
                  onChange={setselectedState}
                  styles={dropdownStyles}
                  id="states"
                />
              </div>
              <div
                className={`flex flex-col w-full ${
                  fullSearchBar ? 'gap-5' : 'gap-3'
                }`}>
                <label className="block text-xs tracking-widest text-gray-400 uppercase">
                  Activity
                </label>
                <Select
                  options={activities}
                  value={selectedActivity}
                  onChange={setselectedActivity}
                  styles={dropdownStyles}
                  id="activity"
                />
              </div>
              <div
                className={`flex flex-col w-full ${
                  fullSearchBar ? 'gap-5' : 'gap-3'
                }`}>
                <label className="block text-xs tracking-widest text-gray-400 uppercase">
                  Topic
                </label>
                <Select
                  options={topics}
                  value={selectedTopic}
                  onChange={setselectedTopic}
                  styles={dropdownStyles}
                  id="topic"
                />
              </div>
              <button
                type="submit"
                className="self-end w-full py-3 font-bold text-white transition-all bg-green-700 border-2 border-transparent rounded-full md:px-12 md:w-auto h-min focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none hover:bg-green-600">
                {!loading ? (
                  <span>Search</span>
                ) : (
                  <ImSpinner8 size="1.5em" className="animate-spin-slow" />
                )}
              </button>
            </div>
          </form>
          <div className={`relative ${fullSearchBar ? null : 'mb-6'}`}>
            <button
              onClick={clearInputs}
              className={`mt-4 text-xs text-center bg-gray-300 text-gray-800 py-2 px-4 rounded-full ${
                !fullSearchBar ? 'absolute' : 'text-center w-max'
              }`}>
              x Clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
})

export default SearchBar
