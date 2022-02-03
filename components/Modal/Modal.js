import {useState} from 'react'
import StarRating from '../StarRating/StarRating'
import Backdrop from './Backdrop'

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

const Modal = ({handleClose, site, editRating, editReview}) => {
  const [rating, setRating] = useState(site?.rating)
  const [review, setReview] = useState(site?.review)
  const [date, setDate] = useState({
    year: '--Year--',
    month: '--Month--',
    day: '--Day--',
  })

  const changeRating = (stars) => {
    setRating(stars)
  }

  const updateReview = (e) => {
    setReview(e.target.value)
  }

  const changeYear = (e) => {
    setDate({year: e.target.value})
  }
  const changeMonth = (e) => {
    setDate({month: e.target.value})
  }
  const changeDay = (e) => {
    setDate({day: e.target.value})
  }

  function CreateYearOptions() {
    const currentYear = new Date().getFullYear()
    let years = []
    for (let i = 1900; i <= currentYear; i++) {
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

  const setCurrentDate = () => {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const currentDay = new Date().getDate()

    setDate({year: currentYear, month: months[currentMonth], day: currentDay})
  }

  const saveData = () => {
    const oldRating = +site?.rating
    const oldReview = +site?.review

    // Only update database if the rating has changed from their previous rating
    if (oldRating !== +rating) {
      editRating(site, rating)
    }

    // Only update database if the review has changed from their previous review
    if (oldReview !== +review) {
      editReview(site, review)
    }

    // Close modal after save
    handleClose()
  }

  return (
    <Backdrop onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        className="max-w-[700px] p-8 bg-orange-100 rounded-lg">
        <div className="grid gap-4">
          {/* Image and Name */}
          <div className="flex items-end gap-8">
            <img
              src={site.img}
              alt={site.name}
              className="w-[300px] h-[200px] object-cover rounded-md"
            />
            <h2 className="text-4xl font-bold text-green-800 align-end">
              {site.name}
            </h2>
          </div>

          {/* Rating and Collection */}
          <div className="flex w-full gap-8">
            <div className="flex items-center gap-2 font-bold text-green-800 uppercase">
              <span>
                <StarRating rating={rating} changeRating={changeRating} />
              </span>
            </div>
            <div className="font-bold text-green-800 uppercase">Collection</div>
          </div>

          {/* Review */}
          <div className="flex flex-col gap-4">
            <label className="font-bold text-green-800 uppercase">Review</label>
            <textarea
              defaultValue={site?.review == review ? site?.review : review}
              onChange={(e) => updateReview(e)}
              className="p-4 rounded-md"
              rows="5"></textarea>
          </div>

          {/* Dates Visited */}
          <div>
            <button className="px-4 py-2 m-auto text-lg bg-orange-200 rounded-lg">
              Add Visit Date
            </button>
            <div className="max-w-screen-sm mt-4">
              {/* Year */}
              <select
                onChange={(e) => changeYear(e)}
                className="px-4 py-2 font-sans bg-white w-[100px] rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="Year">
                <option value={date.year} className="px-4 py-2 rounded-md">
                  {date.year}
                </option>
                <CreateYearOptions />
              </select>

              {/* Month */}
              <select
                onChange={(e) => changeMonth(e)}
                className="py-2 px-4 font-sans bg-white w-[130px] x-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="Month"
                style={{
                  borderLeft: '4px solid  #FFEDD5',
                  borderRight: '4px solid  #FFEDD5',
                }}>
                <option value={date.month} className="px-4 py-2 rounded-md">
                  {date.month}
                </option>
                <CreateMonthOptions />
              </select>

              {/* Day */}
              <select
                onChange={(e) => changeDay(e)}
                className="px-4 py-2 font-sans bg-white w-[100px] rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="Day">
                <option value={date.day} className="px-4 py-2 rounded-md">
                  {date.day}
                </option>
                <CreateDayOptions />
              </select>

              {/* Set Visited date to current date */}
              <button
                onClick={setCurrentDate}
                className="px-4 py-2 ml-4 bg-orange-200 rounded-md">
                Set to Today
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation button */}
        <div className="flex max-w-[200px] gap-4  mt-8">
          <button
            onClick={handleClose}
            className="px-4 py-2 w-[150px] m-auto text-lg text-white bg-red-400 rounded-lg">
            Cancel
          </button>
          <button
            onClick={saveData}
            className="px-4 py-2 w-[150px] m-auto text-lg bg-green-400 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </Backdrop>
  )
}

const ModalCloseButton = ({onClick, label}) => (
  <button
    className="px-4 py-2 text-lg transition-all rounded-md ring-offset-primary ring-offset-2 focus:ring-error focus:outline-none focus:ring-2 bg-error"
    type="button"
    onClick={onClick}>
    {label}
  </button>
)

export default Modal
