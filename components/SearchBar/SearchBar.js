import {useState} from 'react'
import Input from '../Forms/Input/Input'
import Label from '../Forms/Label/Label'

export default function SearchBar() {
  const [tab, setTab] = useState('name')

  const tabStyles = {
    active: 'bg-green-200 backdrop-opacity-10',
  }

  return (
    <div className="p-8 pt-4 bg-white border-2 border-gray-200 rounded-3xl">
      {/* Nav Buttons */}
      <div className="pb-8 border-b-2 border-gray-200">
        <span className="block mb-6 text-sm text-gray-500">Search by</span>
        <div className="flex gap-10">
          <button
            onClick={() => setTab('name')}
            className={`transition-all px-6 py-3  text-green-800 text-lg rounded-full text-md w-40 font-bold hover:border-green-800 hover:border-2 border-2 border-transparent ${
              tab == 'name' ? tabStyles.active : null
            }`}>
            Park Name
          </button>
          <button
            onClick={() => setTab('filter')}
            className={`transition-all px-6 py-3  text-green-800 text-lg rounded-full text-md w-40 font-bold hover:border-green-800 hover:border-2 border-2 border-transparent ${
              tab == 'filter' ? tabStyles.active : null
            }`}>
            Filters
          </button>
        </div>
      </div>
      {/* Input and filters */}
      {tab == 'name' && (
        <form className="mt-8">
          <div className="flex flex-col justify-between gap-4">
            <Label title="Park Name" for="parkName" />
            <div className="flex justify-between gap-4">
              <input
                type="text"
                name="parkName"
                placeholder="Yellowstone"
                className="w-full px-6 py-3 bg-gray-100 rounded-full"
              />
              <button
                type="submit"
                className="px-4 py-3 text-white bg-green-800 rounded-full w-36 ring-blue-500 ring-offset-white ring-offset-2 focus:outline-none focus:ring-2">
                Search
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
