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
          Discover {totalEvents} unique events
        </h1>
      </div>
      <SearchBar resultRef={resultRef} />
      <InfiniteImages />

      {events.length > 0 && <Results ref={resultRef} events={events} />}
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

  // const createParamsObj = (state, q) => {
  //   let obj = {}
  //   if (stateCode) obj = {...obj, state}
  //   if (q) obj = {...obj, q}
  //   if (start) obj = {...obj, start}
  //   return obj
  // }

  if (state) URLWithParams.searchParams.append('stateCode', state)
  if (park) URLWithParams.searchParams.append('parkCode', park)
  URLWithParams.searchParams.append('pageSize', 20)
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
    totalEvents = events.total
    events = events?.data?.map((event) => {
      let obj = {
        id: event.id,
        title: event.title,
        description: event.description,
        parkName: event.parkfullname,
        location: event.location,
        date: event.date,
      }
      if (event.types.length > 0) obj.categories = event.types
      if (event.images.length > 0) obj.image = event.images[0].url
      if (event.times.length > 0) obj.times = event.times[0]
      if (event.regresurl.length > 0) obj.registerInfo = event.regresinfo
      if (event.regresurl.length > 0) obj.regresurl = event.regresurl
      if (event.contactname.length > 0) obj.contactName = event.contactname
      if (event.contacttelephonenumber.length > 0)
        obj.phone = event.contacttelephonenumber
      return obj
    })
  } catch (err) {
    console.error(err)
  }

  // On page load, dont load any events`
  if (!state && !park) events = []

  // console.log('**************************')
  // console.log(events)
  // console.log(totalEvents)

  return {
    props: {
      events,
      totalEvents,
      // params: createParamsObj(stateCode, q, start),
    },
  }
}
