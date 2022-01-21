import {useState} from 'react'

import {AiOutlineInfoCircle} from 'react-icons/ai'
import {AiOutlineCloseCircle} from 'react-icons/ai'

export default function Hours({operatingHours, title}) {
  const {description, standardHours, name} = operatingHours[0]
  const {sunday, monday, tuesday, wednesday, thursday, friday, saturday} =
    standardHours

  const [descriptionBox, setDescriptionBox] = useState(false)

  const toggleText = () => {
    if (descriptionBox) {
      setDescriptionBox(false)
    } else {
      setDescriptionBox(true)
    }
  }

  return (
    <section className="relative">
      <div className="flex flex-row items-center gap-4">
        <h2 className="text-3xl font-bold text-green-800">{title}</h2>
        <div onClick={toggleText}>
          <button
            className="relative flex items-center w-full cursor-pointer"
            aria-label="Open hours description">
            {descriptionBox ? (
              <AiOutlineCloseCircle size="1.5em" />
            ) : (
              <AiOutlineInfoCircle size="1.5em" />
            )}
          </button>
          {descriptionBox && (
            <div className="absolute left-0 z-10 p-4 bg-white border-4 border-green-700 rounded-md shadow-lg md:w-[500px]">
              <h3 className="mb-4 text-2xl">{name}</h3>
              <p className="text-base font-normal text-black font-display">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
      <ul className="mt-4 text-lg text-black font-display">
        <li>
          <span className="font-bold">Sunday:</span>&nbsp;{sunday}
        </li>
        <li>
          <span className="font-bold">Monday:</span>&nbsp;{monday}
        </li>
        <li>
          <span className="font-bold">Tuesday:</span>&nbsp;{tuesday}
        </li>
        <li>
          <span className="font-bold">Wednesday:</span>&nbsp;{wednesday}
        </li>
        <li>
          <span className="font-bold">Thursday:</span>&nbsp;{thursday}
        </li>
        <li>
          <span className="font-bold">Friday:</span>&nbsp;{friday}
        </li>
        <li>
          <span className="font-bold">Saturday:</span>&nbsp;{saturday}
        </li>
      </ul>
    </section>
  )
}
