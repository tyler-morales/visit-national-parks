import {useState, forwardRef} from 'react'

import Image from 'next/image'

import {IoLocationSharp, IoTimeSharp, IoPersonSharp} from 'react-icons/io5'
import {AiFillPhone} from 'react-icons/ai'
import {MdPark} from 'react-icons/md'

import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const Results = forwardRef(({events}, ref) => {
  const [open, setOpen] = useState(null)

  const openEvent = (id) => {
    setOpen(id)
  }
  const closeEvent = (id) => {
    if (open == id) setOpen(null)
  }

  const Cards = () => {
    if (events) {
      const createImage = (event) => {
        let url = event.hasOwnProperty('image')
          ? `https://www.nps.gov${event.image}`
          : 'https://www.nps.gov/common/uploads/teachers/assets/images/nri/20150811/teachers/228A0A1B-AC76-A822-1969282F47E5FA13/228A0A1B-AC76-A822-1969282F47E5FA13.jpg'
        return (
          <Image
            width={300}
            height={200}
            layout="responsive"
            className={`bg-gray-200 rounded-t-xl ${!open && 'cursor-pointer'} ${
              url ? 'object-contain' : 'object-cover'
            }`}
            src={url}
            onClick={() => openEvent(event.id)}
          />
        )
      }
      return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {events?.map((event, index) => {
            const year = event.date.split('-')[0]
            const month = event.date.split('-')[1]
            const day = event.date.split('-')[2]

            return (
              <div
                key={index}
                className={`grid grid-cols-1 ${
                  open == event.id ? 'col-span-3 grid-cols-2 grid-rows-2' : ''
                }`}>
                {/* Display the event image or a default NPS image */}
                {createImage(event)}
                <div className="col-start-1 p-4 bg-white border-t-2 border-green-800 rounded-bl-lg shadow-lg">
                  {/* Park Name */}
                  <div className="flex gap-2 text-gray-500">
                    <MdPark size="1.25em" />
                    <span className="font-display">{event.parkName}</span>
                  </div>
                  {/* Event Title */}
                  <h3 className="text-xl font-bold font-display">
                    {event.title}
                  </h3>

                  {/* Info Section */}
                  <div className="flex gap-2 mt-4">
                    {/* Event Date */}
                    <div className="h-max py-2 min-w-[70px] flex flex-col bg-green-800 items-center text-white rounded-md">
                      <span>{months[+month - 1]}</span>
                      <span className="text-xl font-bold">{day}</span>
                      <span>{year}</span>
                    </div>
                    <ul className="flex flex-col gap-2 mt-2 text-gray-500 font-display">
                      {event.location && (
                        // Event Location
                        <li className="flex gap-2">
                          <span className="w-[20px]">
                            <IoLocationSharp size="1.25em" />
                          </span>
                          <span>{event.location.slice(0, 33)}...</span>
                        </li>
                      )}
                      {/* Times */}
                      {event.times && (
                        <li className="flex gap-2">
                          <span className="w-[20px]">
                            <IoTimeSharp size="1.25em" />
                          </span>
                          <span>
                            {event.times.timestart}–{event.times.timeend}
                          </span>
                        </li>
                      )}
                      {/* Contact Name */}
                      {event.contactName && (
                        <li className="flex gap-2">
                          <span className="w-[20px]">
                            <IoPersonSharp size="1.25em" />
                          </span>
                          <span>{event.contactName}</span>
                        </li>
                      )}
                      {/* Contact Phone */}
                      {event.contacttelephonenumber && (
                        <li className="flex gap-2">
                          <span className="w-[20px]">
                            <AiFillPhone size="1.25em" />
                          </span>
                          <span>{event.phone}</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Categories */}
                  <h4 className="mt-4 font-sans text-sm uppercase">
                    Categories
                  </h4>
                  <ul className="flex flex-wrap items-center gap-x-2">
                    {event.categories.map((category, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-500 rounded-full">
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
                {open == event.id && (
                  <div className="p-4 bg-white border-t-2 border-green-800 shadow-lg rounded-br-xl">
                    <button onClick={() => closeEvent(event.id)}>Close</button>
                    <span className="block mb-4 text-sm text-gray-500 uppercase">
                      Description
                    </span>
                    <p>{ReactHtmlParser(event.description)}</p>
                    {event.registerInfo && (
                      <>
                        <span className="block mt-4 mb-2 text-sm text-gray-500 uppercase">
                          Regristration Info
                        </span>
                        <p>{event.registerInfo}</p>
                      </>
                    )}

                    {event.regresurl && (
                      <>
                        <span className="block mt-4 mb-2 text-sm text-gray-500 uppercase">
                          Regristration Info
                        </span>
                        <p>{event.regresurl}</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )
    } else {
      return <></>
    }
  }
  return (
    <section
      ref={ref}
      className="m-auto px-5 xl:px-0 lg:mb-12 max-w-[1200px] mt-20">
      <h2 className="my-5 text-5xl font-bold text-green-800">Results</h2>
      <Cards />
    </section>
  )
})

export default Results
