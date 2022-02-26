import {useRef} from 'react'

import SearchBar from '../components/EventsPage/SearchBar/SearchBar'
import InfiniteImages from '../components/InfiniteImages/InfiniteImages'

import Results from '../components/EventsPage/Results/Results'



export default function Events({events, totalEvents}) {
  const resultRef = useRef(null)

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
      <SearchBar resultRef={resultRef} />
      <InfiniteImages />

      <Results ref={resultRef} events={events} />

      {/* <section
        ref={resultRef}
        className="m-auto px-5 xl:px-0 lg:mb-12 max-w-[1200px] mt-20">
        <h2 className="my-5 text-5xl font-bold text-green-800">Results</h2>
        <Cards />
      </section> */}
    </main>
  )
}

export async function getServerSideProps(context) {
  const URLWithParams = new URL('https://developer.nps.gov/api/v1/events')
  const {params, query} = context
  const {state, park, startDate} = query

  // Set data to null to handle errors
  let events = []
  let totalEvents = 0
  console.log(startDate)

  // const createParamsObj = (state, q) => {
  //   let obj = {}
  //   if (stateCode) obj = {...obj, state}
  //   if (q) obj = {...obj, q}
  //   if (start) obj = {...obj, start}
  //   return obj
  // }

  if (state) URLWithParams.searchParams.append('stateCode', state)
  if (park) URLWithParams.searchParams.append('parkCode', park)
  // URLWithParams.searchParams.append('limit', 20)
  URLWithParams.searchParams.append('dateStart', startDate)
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
