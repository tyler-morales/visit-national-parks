import Backdrop from './Backdrop'
import {GoAlert} from 'react-icons/go'

const Modal = ({handleClose, alerts}) => {
  return (
    <Backdrop onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        className="max-w-[700px]  bg-orange-100 rounded-lg max-h-[700px] overflow-scroll">
        <h2 className="px-8 py-4 text-3xl font-bold text-white bg-red-600 rounded-t-md">
          Alerts
        </h2>
        <ul className="p-8">
          {alerts.slice(0, 4).map((alert) => {
            return (
              <li className="mb-4">
                <span className="block mb-2 font-bold text-red-600">
                  {alert.title} | {alert.lastIndexedDate.slice(0, 10)}
                </span>
                {alert.description}
                <a
                  target="_blank"
                  href={alert.url}
                  className="block mt-2 text-blue-600">
                  More info
                </a>
              </li>
            )
          })}
        </ul>
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
