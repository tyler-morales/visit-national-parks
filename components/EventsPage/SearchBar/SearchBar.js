import {useState} from 'react'
import Select from 'react-select'
import {useRouter} from 'next/router'
import splitbee from '@splitbee/web'

import states from '../../../data/states.json'
import parks from '../../../data/parks.json'

import {FaSearch} from 'react-icons/fa'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

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

const SearchBar = ({resultRef}) => {
  const router = useRouter()

  const [tab, setTab] = useState('STATE')
  const [selectedState, setSelectedState] = useState(null)
  const [selectedPark, setSelectedPark] = useState(null)
  const [editStartDate, setEditStartDate] = useState(false)
  const [loading, setLoading] = useState(false)

  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: months[new Date().getMonth()],
    day: new Date().getDate(),
  })

  const convertDate = (date) => {
    let monthNum = months.indexOf(date.month) + 1
    monthNum = monthNum < 10 ? `0${monthNum}` : monthNum

    return `${date.year}-${monthNum}-${date.day}`
  }

  const handleSubmitByState = async (e) => {
    e.preventDefault()
    setEditStartDate(false)
    setLoading(true)

    splitbee.track('Search Events', {
      filter: 'State',
    })

    try {
      // Load events based on state
      await router.push(
        `/events?state=${selectedState.value}&startDate=${convertDate(date)}`
      )

      // Scroll to results
      resultRef.current.scrollIntoView({behavior: 'smooth'})
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmitByPark = async (e) => {
    e.preventDefault()
    setEditStartDate(false)

    splitbee.track('Search Events', {
      filter: 'Park',
    })

    try {
      // Load events based on state
      await router.push(
        `/events?park=${selectedPark.value}&startDate=${convertDate(date)}`
      )
      // Scroll to results
      resultRef.current.scrollIntoView({behavior: 'smooth'})
    } catch (err) {
      console.error(err)
    }
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

  const formBuilder = (
    name,
    options,
    selectedOption,
    setSelectedOption,
    submitter
  ) => {
    return (
      <>
        <form
          onSubmit={submitter}
          className="relative flex flex-col items-center justify-between w-full gap-6 px-4 py-4 m-auto mt-6 bg-white border-2 border-green-900 rounded-lg shadow-lg md:rounded-3xl md:gap-8 md:flex-row md:px-12 md:w-min">
          {/* Select State */}
          <div className="w-full md:w-[200px] flex flex-col justify-between md:border-r-2 md:border-gray-200 pr-6">
            <label className="mb-2 text-xs">{name}</label>
            <Select
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
              instanceId={name}
            />
          </div>

          {/* Selecet Date */}
          <div className="w-full relative md:w-[180px] flex flex-col justify-between pr-6 md:border-r-2 md:border-gray-200">
            <label className="block mb-2 text-xs">Date</label>
            <button
              type="button"
              className="px-2 py-2 text-left border border-gray-400 rounded-md"
              onClick={() => setEditStartDate(editStartDate ? false : true)}>
              {date.month.slice(0, 3)} / {date.day} / {date.year}
            </button>
          </div>

          {/* Search */}
          <button
            type="submit"
            className="flex justify-center w-full px-5 py-5 text-white bg-green-800 rounded-full md:w-min">
            {loading ? (
              <AiOutlineLoading3Quarters
                size="1.25em"
                className="animate-spin"
              />
            ) : (
              <FaSearch size="1.25em" />
            )}
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
    )
  }

  return (
    <>
      <div className="m-auto max-w-[1200px] my-10 px-4">
        <div className="flex justify-center gap-6">
          <button
            onClick={() => {
              setTab('STATE')
            }}
            className={`px-4 py-2 text-green-800 uppercase rounded-md transition-all ${
              tab == 'STATE' && 'bg-green-600 text-white'
            }`}>
            Search by State
          </button>
          <button
            onClick={() => setTab('PARK')}
            className={`px-4 py-2 text-green-800 uppercase rounded-md transition-all ${
              tab == 'PARK' && 'bg-green-600 text-white'
            }`}>
            Search by Park
          </button>
        </div>

        {/* Search by STATE */}
        {tab == 'STATE' &&
          formBuilder(
            'State',
            states,
            selectedState,
            setSelectedState,
            handleSubmitByState
          )}

        {/* Search by PARK */}
        {tab == 'PARK' &&
          formBuilder(
            'Park',
            parks,
            selectedPark,
            setSelectedPark,
            handleSubmitByPark
          )}
      </div>
    </>
  )
}

export default SearchBar
