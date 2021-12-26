import {useState} from 'react'
import Select from 'react-select'
import {searchStyles, dropdownStyles} from '../../styles/dropdown'

import parks from '../../data/parks.json'
import states from '../../data/states.json'
import activities from '../../data/activities.json'
import topics from '../../data/topics.json'

export default function SearchBar() {
  const [tab, setTab] = useState('name')
  const [selectedPark, setselectedPark] = useState('')
  const [selectedState, setselectedState] = useState(null)
  const [selectedActivity, setselectedActivity] = useState(null)
  const [selectedTopic, setselectedTopic] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('prevent default')
  }

  const tabStyles = {
    active:
      'bg-green-600 text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none',
    inActive:
      'bg-green-200 text-green-500 hover:shadow-md hover:shadow-green-200 hover:-translate-y-1 hover:border-2 hover:border-green-700 hover:text-green-700',
  }

  return (
    <div className="p-8 pt-4 bg-white border-2 border-gray-200 rounded-3xl">
      {/* Nav Buttons */}
      <div className="pb-8 border-b-2 border-gray-200">
        <span className="block mb-4 text-xs tracking-widest text-center text-gray-400 uppercase">
          Search by
        </span>
        <div className="flex justify-center gap-10">
          <button
            onClick={() => setTab('name')}
            className={`transition-all px-6 py-3 text-lg rounded-xl text-md w-40 font-bold border-transparent border-2 ${
              tab == 'name' ? tabStyles.active : tabStyles.inActive
            }`}>
            Park Name
          </button>
          <button
            onClick={() => setTab('filter')}
            className={`transition-all px-6 py-3 text-lg rounded-xl text-md w-40 font-bold border-transparent border-2 ${
              tab == 'filter' ? tabStyles.active : tabStyles.inActive
            }`}>
            Filters
          </button>
        </div>
      </div>
      {/* Input and filters */}
      {tab == 'name' && (
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-between">
            <label className="block mb-4 text-xs tracking-widest text-gray-400 uppercase">
              Park Name
            </label>
            <div className="flex items-center justify-between gap-5">
              <Select
                options={parks}
                defaultValue={selectedPark}
                onChange={setselectedPark}
                id="parks"
                className="w-full cursor-text"
                styles={searchStyles}
              />
              <button
                type="submit"
                className="self-end px-12 py-3 text-white bg-green-700 rounded-full h-min focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
                Search
              </button>
            </div>
          </div>
        </form>
      )}
      {tab == 'filter' && (
        <form className="mt-8">
          <div className="flex w-full gap-5">
            <div className="flex flex-col w-full gap-4">
              <label className="block text-xs tracking-widest text-gray-400 uppercase">
                State
              </label>
              <Select
                options={states}
                defaultValue={selectedState}
                onChange={setselectedState}
                styles={dropdownStyles}
                id="states"
                isMulti
              />
            </div>
            <div className="flex flex-col w-full gap-4">
              <label className="block text-xs tracking-widest text-gray-400 uppercase">
                Activity
              </label>
              <Select
                options={activities}
                defaultValue={selectedActivity}
                onChange={setselectedActivity}
                styles={dropdownStyles}
                id="activity"
                isMulti
              />
            </div>
            <div className="flex flex-col w-full gap-4">
              <label className="block text-xs tracking-widest text-gray-400 uppercase">
                Topic
              </label>
              <Select
                options={topics}
                defaultValue={selectedTopic}
                onChange={setselectedTopic}
                styles={dropdownStyles}
                id="topic"
                isMulti
              />
            </div>
            <button
              type="submit"
              className="self-end px-12 py-3 text-white bg-green-700 rounded-full h-min focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
              Search
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
