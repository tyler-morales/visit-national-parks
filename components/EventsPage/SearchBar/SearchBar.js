import {useState} from 'react'
import Select from 'react-select'

import states from '../../../data/states.json'
import parks from '../../../data/parks.json'

import {FaSearch} from 'react-icons/fa'

export default function SearchBar() {
  const [tab, setTab] = useState('STATE')
  const [selectedState, setselectedState] = useState(null)
  const [selectedPark, setselectedPark] = useState(null)

  const handleSubmitByState = (e) => {
    e.preventDefault()
    console.log('clicked state')
  }

  const handleSubmitByPark = (e) => {
    e.preventDefault()
    console.log('clicked park')
  }

  return (
    <>
      <div className="m-auto max-w-[1200px] my-10">
        <div className="flex justify-center gap-6">
          <button
            onClick={() => {
              setTab('STATE')
            }}
            className={`px-8 py-2 text-green-800 uppercase rounded-md transition-all ${
              tab == 'STATE' && 'bg-green-600 text-white'
            }`}>
            Search by State
          </button>
          <button
            onClick={() => setTab('PARK')}
            className={`px-8 py-2 text-green-800 uppercase rounded-md transition-all ${
              tab == 'PARK' && 'bg-green-600 text-white'
            }`}>
            Search by Park
          </button>
        </div>

        {/* Search by STATE */}
        {tab == 'STATE' && (
          <form
            onSubmit={handleSubmitByState}
            className="flex items-center justify-between gap-8 px-12 py-4 m-auto mt-6 bg-white border-2 border-green-900 rounded-full w-min">
            <div>
              <label className="text-xs">State</label>
              <Select
                options={states}
                value={selectedState}
                onChange={setselectedState}
                instanceId="states"
                className="w-[200px] cursor-text"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-5 text-white bg-green-800 rounded-full">
              <FaSearch size="1.25em" />
            </button>
          </form>
        )}

        {/* Search by PARK */}
        {tab == 'PARK' && (
          <form
            onSubmit={handleSubmitByPark}
            className="flex items-center justify-between gap-8 px-12 py-4 m-auto mt-6 bg-white border-2 border-green-900 rounded-full w-min">
            <div>
              <label className="text-xs">Park</label>
              <Select
                options={parks}
                value={selectedPark}
                onChange={setselectedPark}
                instanceId="parks"
                className="w-[300px] cursor-text"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-5 text-white bg-green-800 rounded-full">
              <FaSearch size="1.25em" />
            </button>
          </form>
        )}
      </div>
    </>
  )
}
