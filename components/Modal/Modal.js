import {useState} from 'react'
import Backdrop from './Backdrop'

const Modal = ({handleClose, site, editRating}) => {
  const [rating, setRating] = useState(site?.rating)

  const changeRating = () => {
    rating = +rating
    setRating((rating += 1))
    editRating(site, rating)
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
              className="w-[300px] h-auto object-cover rounded-md"
            />
            <h2 className="text-4xl font-bold text-green-800 align-end">
              {site.name}
            </h2>
          </div>

          {/* Rating and Collection */}
          <div className="flex w-full gap-8">
            <div className="flex items-center gap-2 font-bold text-green-800 uppercase">
              <span onClick={changeRating}>Your Rating</span>
              <span>{rating}</span>
            </div>
            <div className="font-bold text-green-800 uppercase">Collection</div>
          </div>

          {/* Review */}
          <div className="flex flex-col gap-4">
            <label className="font-bold text-green-800 uppercase">Review</label>
            <textarea className="p-4 rounded-md" rows="5"></textarea>
          </div>

          {/* Dates Visited */}
          <div>
            <button className="px-4 py-2 m-auto text-lg bg-orange-200 rounded-lg">
              Add Visit Date
            </button>
            <div>{/* Dates visited */}</div>
          </div>

          {/* Confirmation button */}
          <div className="flex max-w-[200px] gap-4  mt-8">
            <button
              onClick={handleClose}
              className="px-4 py-2 w-[150px] m-auto text-lg text-white bg-red-400 rounded-lg">
              Cancel
            </button>
            <button className="px-4 py-2 w-[150px] m-auto text-lg bg-green-400 rounded-lg">
              Save
            </button>
          </div>
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
