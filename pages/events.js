import SearchBar from '../components/EventsPage/SearchBar/SearchBar'
import InfiniteImages from '../components/InfiniteImages/InfiniteImages'
import Image from 'next/image'

import {IoLocationSharp, IoTimeSharp, IoPersonSharp} from 'react-icons/io5'
import {AiFillPhone} from 'react-icons/ai'
import {MdPark} from 'react-icons/md'

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

export default function Events({events, totalEvents}) {
  const Cards = () => {
    if (events) {
      const createImage = (src) => {
        let url = src
          ? `https://www.nps.gov${src}`
          : 'https://www.nps.gov/common/uploads/teachers/assets/images/nri/20150811/teachers/228A0A1B-AC76-A822-1969282F47E5FA13/228A0A1B-AC76-A822-1969282F47E5FA13.jpg'
        return (
          <Image
            width={300}
            height={200}
            layout="responsive"
            className={`bg-gray-200 rounded-t-xl ${
              src ? 'object-contain' : 'object-cover'
            }`}
            src={url}
          />
        )
      }
      return (
        <div className="grid grid-cols-3 gap-8">
          {events?.map((event, index) => {
            const year = event.date.split('-')[0]
            const month = event.date.split('-')[1]
            const day = event.date.split('-')[2]

            return (
              <div key={index}>
                {/* Display the event image or a default NPS image */}
                {event.image ? createImage(event.image) : createImage()}
                <div className="p-4 pt-4 bg-white border-t-2 border-green-800 shadow-lg rounded-b-xl">
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
    <main className="mb-36">
      <div className="my-6">
        <span className="block mb-2 text-sm text-center text-green-800 uppercase md:mb-6">
          Events
        </span>
        <h1 className="text-3xl font-bold text-center text-green-800 md:text-6xl">
          Discover 509 unique events
        </h1>
      </div>
      <SearchBar />
      <InfiniteImages />

      <section
        id="results"
        className="m-auto px-5 xl:px-0 lg:mb-12 max-w-[1200px] mt-20">
        <h2 className="my-5 text-5xl font-bold text-green-800">Results</h2>
        <Cards />
      </section>
    </main>
  )
}

export async function getServerSideProps(context) {
  const URLWithParams = new URL('https://developer.nps.gov/api/v1/events')
  const {params, query} = context
  const {state, park} = query

  // Set data to null to handle errors
  let events = []
  let totalEvents = 0
  // let date = 

  // const createParamsObj = (state, q) => {
  //   let obj = {}
  //   if (stateCode) obj = {...obj, state}
  //   if (q) obj = {...obj, q}
  //   if (start) obj = {...obj, start}
  //   return obj
  // }

  if (state) URLWithParams.searchParams.append('stateCode', state)
  if (park) URLWithParams.searchParams.append('parkCode', park)
  // if (q) URLWithParams.searchParams.append('q', q)
  // URLWithParams.searchParams.append('limit', 20)
  // URLWithParams.searchParams.append('start', start)
  URLWithParams.searchParams.append('dateStart', '2022-03-22')
  URLWithParams.searchParams.append('api_key', process.env.API_KEY)

  try {
    const eventsData = await fetch(URLWithParams.href, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': '*',
      },
    })

    events = await eventsData.json()
    // totalEvents = events.total
    events = events?.data?.map((event) => {
      let obj = {
        title: event.title,
        description: event.description,
        parkName: event.parkfullname,
        location: event.location,
        date: event.date,
        // categories: event.types,
      }
      if (event.types.length > 0) obj.categories = event.types
      if (event.images.length > 0) obj.image = event.images[0].url
      if (event.times.length > 0) obj.times = event.times[0]
      if (event.contactname.length > 0) obj.contactName = event.contactname
      if (event.contacttelephonenumber.length > 0)
        obj.phone = event.contacttelephonenumber
      return obj
    })
  } catch (err) {
    console.error(err)
  }

  // console.log('**************************')
  // console.log(events)
  // console.log(totalEvents)

  return {
    props: {
      events,
      // totalEvents,
      // params: createParamsObj(stateCode, q, start),
    },
  }
}
