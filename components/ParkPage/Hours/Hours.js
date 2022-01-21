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
    <section className="relative mt-24 text-3xl font-bold text-green-800 mb-7">
      <div className="flex flex-row items-center gap-4">
        <h2 className="text-3xl font-bold text-green-800">{title}</h2>
        <div onClick={toggleText}>
          <button
            className="cursor-pointer"
            aria-label="Open hours description">
            {descriptionBox ? (
              <AiOutlineCloseCircle />
            ) : (
              <AiOutlineInfoCircle />
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
      <ul className="text-lg text-black font-display">
        <li>Sunday:&nbsp;{sunday}</li>
        <li>Monday:&nbsp;{monday}</li>
        <li>Tuesday:&nbsp;{tuesday}</li>
        <li>Wednesday:&nbsp;{wednesday}</li>
        <li>Thursday:&nbsp;{thursday}</li>
        <li>Friday:&nbsp;{friday}</li>
        <li>Saturday:&nbsp;{saturday}</li>
      </ul>
    </section>
  )
}
