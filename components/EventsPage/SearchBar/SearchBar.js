import {useState} from 'react'
import Select from 'react-select'

import states from '../../../data/states.json'
import parks from '../../../data/parks.json'

import {FaSearch} from 'react-icons/fa'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default function SearchBar() {
  const [tab, setTab] = useState('STATE')
  const [selectedState, setselectedState] = useState(null)
  const [selectedPark, setselectedPark] = useState(null)
  const [editStartDate, setEditStartDate] = useState(false)

  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: months[new Date().getMonth()],
    day: new Date().getDate(),
  })

  console.log(date)

  const handleSubmitByState = (e) => {
    e.preventDefault()
    setEditStartDate(false)
    //    Call NPS API???
  }

  const handleSubmitByPark = (e) => {
    e.preventDefault()
    console.log('clicked park')
  }

  const changeYear = (e) => {
    setDate({year: e.target.value, month: date.month, day: date.day})
  }

  const changeMonth = (e) => {
    setDate({year: date.year, month: e.target.value, day: date.day})
  }

  const changeDay = (e) => {
    setDate({year: date.year, month: date.month, day: e.target.value})
  }

  function CreateYearOptions() {
    const currentYear = new Date().getFullYear()
    let years = []
    for (let i = currentYear; i <= currentYear + 1; i++) {
      years.push(i)
    }

    years = years.reverse()

    return years.map((year) => (
      <option className="px-4 py-2 rounded-md" value={year} key={year}>
        {year}
      </option>
    ))
  }

  function CreateMonthOptions() {
    return months.map((item) => (
      <option className="px-4 py-2" value={item} key={item}>
        {item}
      </option>
    ))
  }

  function CreateDayOptions() {
    let days = []
    for (let i = 1; i <= 31; i++) {
      days.push(i)
    }

    return days.map((day) => (
      <option className="px-4 py-2 rounded-md" value={day} key={day}>
        {day}
      </option>
    ))
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
          <>
            <form
              onSubmit={(e) => handleSubmitByState(e)}
              className="relative flex items-center justify-between gap-8 px-12 py-4 m-auto mt-6 bg-white border-2 border-green-900 rounded-full w-min">
              <div className="w-[200px] cursor-text flex flex-col justify-between border-r-2 border-gray-200 pr-6">
                <label className="mb-2 text-xs">State</label>
                <Select
                  options={states}
                  value={selectedState}
                  onChange={setselectedState}
                  instanceId="states"
                />
              </div>

              {/* Date Picker */}
              <div className="relative w-[180px] flex flex-col justify-between pr-6 border-r-2 border-gray-200">
                <label className="block mb-2 text-xs">Date</label>
                <button
                  type="button"
                  className="px-2 py-2 text-left border border-gray-400 rounded-md"
                  onClick={() =>
                    setEditStartDate(editStartDate ? false : true)
                  }>
                  {date.month.slice(0, 3)} / {date.day} / {date.year}
                </button>
              </div>

              {/* Search */}
              <button
                type="submit"
                className="px-5 py-5 text-white bg-green-800 rounded-full">
                <FaSearch size="1.25em" />
              </button>
            </form>

            {editStartDate && (
              <div className="flex flex-col justify-center max-w-screen-sm gap-2 m-auto mt-4 rounded-md md:gap-4 md:flex-row">
                {/* Month */}
                <select
                  onChange={(e) => changeMonth(e)}
                  className="py-2 px-4 font-sans bg-white w-full md:w-[130px] x-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="Month">
                  <option value={date.month} className="px-4 py-2 rounded-md">
                    {date.month}
                  </option>
                  <CreateMonthOptions />
                </select>

                {/* Day */}
                <select
                  onChange={(e) => changeDay(e)}
                  className="pl-2 py-2 font-sans bg-white w-full md:w-[80px] rounded-md md:rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="Day">
                  <option value={date.day} className="px-4 py-2 rounded-md">
                    {date.day}
                  </option>
                  <CreateDayOptions />
                </select>

                {/* Year */}
                <select
                  onChange={(e) => changeYear(e)}
                  className="pl-2 py-2 font-sans bg-white w-full md:w-[100px] rounded-md md:rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="Year">
                  <option value={date.year} className="px-4 py-2 rounded-md">
                    {date.year}
                  </option>
                  <CreateYearOptions />
                </select>
              </div>
            )}
          </>
        )}

        {/* Search by PARK */}
        {tab == 'PARK' && (
          <>
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

              {/* Date Picker */}
              <div className="relative w-[180px] flex flex-col justify-between pr-6 border-r-2 border-gray-200">
                <label className="block mb-2 text-xs">Date</label>
                <button
                  type="button"
                  className="px-2 py-2 text-left border border-gray-400 rounded-md"
                  onClick={() =>
                    setEditStartDate(editStartDate ? false : true)
                  }>
                  {date.month.slice(0, 3)} / {date.day} / {date.year}
                </button>
              </div>

              {/* Search */}
              <button
                type="submit"
                className="px-5 py-5 text-white bg-green-800 rounded-full">
                <FaSearch size="1.25em" />
              </button>
            </form>

            {editStartDate && (
              <div className="flex flex-col justify-center max-w-screen-sm gap-2 m-auto mt-4 rounded-md md:gap-4 md:flex-row">
                {/* Month */}
                <select
                  onChange={(e) => changeMonth(e)}
                  className="py-2 px-4 font-sans bg-white w-full md:w-[130px] x-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="Month">
                  <option value={date.month} className="px-4 py-2 rounded-md">
                    {date.month}
                  </option>
                  <CreateMonthOptions />
                </select>

                {/* Day */}
                <select
                  onChange={(e) => changeDay(e)}
                  className="pl-2 py-2 font-sans bg-white w-full md:w-[80px] rounded-md md:rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="Day">
                  <option value={date.day} className="px-4 py-2 rounded-md">
                    {date.day}
                  </option>
                  <CreateDayOptions />
                </select>

                {/* Year */}
                <select
                  onChange={(e) => changeYear(e)}
                  className="pl-2 py-2 font-sans bg-white w-full md:w-[100px] rounded-md md:rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="Year">
                  <option value={date.year} className="px-4 py-2 rounded-md">
                    {date.year}
                  </option>
                  <CreateYearOptions />
                </select>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
