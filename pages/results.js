import {useRef, forwardRef} from 'react'
import Link from 'next/link'
import SearchBar from '../components/SearchBar/SearchBar'
import states from '../data/states.json'
import activities from '../data/activities.json'
import topics from '../data/topics.json'
import Layout from '../components/Layout'
import {IoChevronBack, IoChevronForward} from 'react-icons/io5'
import Image from 'next/image'

import MapBox from '../components/Map/MapBox'

let ids = [...activities, ...topics]

const convertValueToLabel = (code, arr) => {
  let str = ''
  Object.values(arr).forEach(({label, value}) =>
    code == value ? (str = label) : null
  )
  return str
}

const Giphy = () => {
  return (
    <div className="flex justify-center mt-8 ">
      <div
        style={{
          width: '300px',
          height: 'auto',
          paddingBottom: '30%',
          position: 'relative',
        }}>
        <iframe
          src="https://giphy.com/embed/v2nT3Wb6yteT5M8VR0"
          width="100%"
          height="100%"
          style={{position: 'absolute'}}></iframe>
      </div>
    </div>
  )
}

export default function results({parks, params}) {
  const childCompRef = useRef(null)
  const {data, total} = parks
  const {state, q, start} = params

  const coordinates = parks.data.map((park) => {
    return {
      latitude: +park.latitude,
      longitude: +park.longitude,
      code: park.parkCode,
      fullName: park.fullName,
    }
  })

  return (
    <Layout fullWidth>
      <header className="flex flex-col w-full mb-8 ">
        <h1 className="my-5 text-5xl font-bold text-green-800">Results</h1>
        <SearchBar fullSearchBar={false} ref={childCompRef} />
      </header>

      <span className="block mb-6 text-xs tracking-wider text-gray-500">
        {total} results for{' '}
        <span className="font-bold">{convertValueToLabel(state, states)}</span>
        {state && q ? ' and ' : ''}
        <span className="font-bold">{convertValueToLabel(q, ids)}</span>
      </span>

      <div className="grid grid-cols-2 gap-10">
        {/* Sites */}
        <div>
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {total > 0 &&
              data.map(({parkCode, fullName, images}) => (
                <Link href={`/park/${parkCode}`} key={parkCode}>
                  <a className="p-4 bg-[#fafafa] rounded-lg shadow-lg hover:-translate-y-2 transition-all hover:shadow-xl">
                    <div className="relative h-64">
                      <Image
                        layout="fill"
                        src={images[0].url}
                        alt={images[0].altText}
                        className="object-cover w-full rounded-md"
                      />
                    </div>
                    <h3 className="mt-2 text-2xl font-bold text-green-800">
                      {fullName}
                    </h3>
                  </a>
                </Link>
              ))}
          </section>
          {/* No Results found */}
          {total == 0 && (
            <section>
              <h2 className="w-full mt-10 text-3xl font-bold text-center text-green-800">
                No results, try a different search
              </h2>
              <Giphy />
            </section>
          )}

          {/* Pagination buttons */}
          {total > 20 && (
            <div className="flex justify-center gap-5 mt-12">
              {start != 0 && (
                <button
                  onClick={() => childCompRef.current.paginate('decrement')}
                  className="flex items-center justify-center gap-3 py-3 pr-3 text-lg text-center text-white transition-all bg-green-700 rounded-lg shadow-md w-28 hover:bg-green-600 hover:-translate-x-1 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
                  <IoChevronBack />
                  Back
                </button>
              )}
              {total - start > start && (
                <button
                  onClick={() => childCompRef.current.paginate('increment')}
                  className="flex items-center justify-center gap-3 py-3 pl-3 text-lg text-center text-white transition-all bg-green-700 rounded-lg shadow-md w-28 hover:bg-green-600 hover:translate-x-1 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
                  Next
                  <IoChevronForward />
                </button>
              )}
            </div>
          )}
        </div>
        {/* Map */}
        <MapBox coordinates={coordinates} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const URLWithParams = new URL('https://developer.nps.gov/api/v1/parks')
  const {params, query} = context
  const {stateCode, q, start} = query

  const createParamsObj = (state, q) => {
    let obj = {}
    if (stateCode) obj = {...obj, state}
    if (q) obj = {...obj, q}
    if (start) obj = {...obj, start}
    return obj
  }

  if (stateCode) URLWithParams.searchParams.append('stateCode', stateCode)
  if (q) URLWithParams.searchParams.append('q', q)
  URLWithParams.searchParams.append('limit', 20)
  URLWithParams.searchParams.append('start', start)
  URLWithParams.searchParams.append('api_key', process.env.API_KEY)

  const res = await fetch(URLWithParams.href, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'User-Agent': '*',
    },
  })

  const data = await res.json()

  return {
    props: {
      parks: data,
      params: createParamsObj(stateCode, q, start),
    },
  }
}
