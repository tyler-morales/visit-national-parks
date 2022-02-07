import {useState} from 'react'
import CreatableSelect from 'react-select/creatable'
import StarRating from '../StarRating/StarRating'
import Backdrop from './Backdrop'
import {v4 as uuidv4} from 'uuid'

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

const Modal = ({
  handleClose,
  site,
  allCollections,
  siteCollections,
  editRating,
  editReview,
  editDate,
  addNewCollection,
  editCollection,
  createSiteCollection,
}) => {
  const {dateVisited} = site

  if (dateVisited) {
    const loadedDates = {
      year: dateVisited.split(' ')[0],
      month: dateVisited.split(' ')[1],
      day: dateVisited.split(' ')[2],
    }
  } else {
    const defaultDates = {
      year: '--Year--',
      month: '--Month--',
      day: '--Day--',
    }
  }

  const [collections, setCollections] = useState(allCollections)
  const [rating, setRating] = useState(site?.rating)
  const [review, setReview] = useState(site?.review)
  const [date, setDate] = useState(loadedDates || defaultDates)
  const [visited, setVisited] = useState(site?.visited)

  let collectionId = site?.collections.items[0]?.collectionID
  let collectionName = collections.filter(
    (collection) => collection.id == collectionId
  )

  const [selectedCollection, setSelectedCollection] = useState(
    collectionName[0]?.label != undefined
      ? {label: collectionName[0]?.label, id: collectionName[0]?.id}
      : {label: 'Select...'}
  )

  let siteCollectionId = siteCollections.filter(
    (item) => item.siteID == site.id
  )

  console.log(siteCollectionId)

  const createDateSelects = () => {
    setVisited(true)
  }

  const changeRating = (stars) => {
    setRating(stars)
  }

  const updateReview = (e) => {
    setReview(e.target.value)
  }

  const changeYear = (e) => {
    setDate({year: e.target.value, month: date.month, day: date.day})
    console.log(date)
  }
  const changeMonth = (e) => {
    setDate({year: date.year, month: e.target.value, day: date.day})
    console.log(date)
  }
  const changeDay = (e) => {
    setDate({year: date.year, month: date.month, day: e.target.value})
    console.log(date)
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

  const handleCreateCollection = (val) => {
    setCollections((collections) => {
      return [...collections, {label: val}]
    })
    setSelectedCollection({id: uuidv4(), label: val})
  }

  const saveData = () => {
    const oldRating = +site?.rating
    const oldReview = +site?.review
    const oldDate = site?.dateVisited
    const oldCollection = collectionName[0]?.label

    // Only update database if the rating has changed from their previous rating
    if (oldRating !== +rating) {
      editRating(site, rating)
    }

    // Only update database if the review has changed from their previous review
    if (oldReview !== +review) {
      editReview(site, review)
    }

    // Only update database if the collection has changed from their previous collection
    if (oldDate !== date) {
      editDate(site, date)
    }

    // ONLY create a new collection if it doesn't exist already
    if (
      !collections
        .map((collection) => collection.label)
        .includes(selectedCollection.label)
    ) {
      console.log('Adding new collection')
      addNewCollection(site, selectedCollection)
    }

    // Only create a new siteCollection, if none exists
    if (siteCollectionId[0]?.id == undefined) {
      createSiteCollection(site, selectedCollection)
      console.log('create new siteCollection')
    }

    // Only update collection if it is different than the previous collection
    if (
      oldCollection !== selectedCollection.label &&
      siteCollectionId[0]?.id != null
    ) {
      editCollection(site, selectedCollection, siteCollectionId[0]?.id)
      console.log('Updating the collection')
    }

    // if (
    //   oldCollection !== selectedCollection.label &&
    //   siteCollectionId[0]?.id != null
    // ) {
    // editCollection(site, selectedCollection, siteCollectionId[0]?.id)
    // console.log('Updating the collection')
    // } else {
    //   createSiteCollection(site, selectedCollection)
    //   console.log('create new siteCollection')
    // }

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
          <div className="flex items-center gap-8">
            <img
              src={site.img}
              alt={site.name}
              className="w-[300px] h-[200px] object-cover rounded-md"
            />
            <h2 className="text-4xl font-bold text-green-800">{site.name}</h2>
          </div>

          <div className="flex w-full gap-8">
            {/* Rating */}
            <div className="flex items-center gap-2 font-bold text-green-800 uppercase">
              <span>
                <StarRating rating={rating} changeRating={changeRating} />
              </span>
            </div>
            {/* Collection */}
            <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
              <div className="font-bold text-green-800 uppercase">
                Collection
              </div>
              <CreatableSelect
                options={collections}
                value={selectedCollection}
                onChange={setSelectedCollection}
                onCreateOption={(val) => handleCreateCollection(val)}
                id="collections"
                className="min-w-[150px] cursor-pointer"
                // styles={searchStyles}
              />
            </div>
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
            {!visited && (
              <button
                onClick={createDateSelects}
                className="px-4 py-2 m-auto text-lg bg-orange-200 rounded-lg">
                Add Visit Date
              </button>
            )}

            {visited && (
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
            )}
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
