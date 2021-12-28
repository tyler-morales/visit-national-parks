import React from 'react'
import Link from 'next/link'
import SearchBar from '../components/SearchBar/SearchBar'
import states from '../data/states.json'
import activities from '../data/activities.json'
import topics from '../data/topics.json'

let ids = [...activities, ...topics]

const convertValueToLabel = (code, arr) => {
  let str = ''
  Object.values(arr).forEach(({label, value}) =>
    code == value ? (str = label) : null
  )
  return str
}

export default function results({parks, params}) {
  const {state, q} = params

  return (
    <div className="max-w-[1080px] m-auto px-5">
      <div className="flex items-end w-full mb-8">
        <h1 className="my-5 text-5xl font-bold text-green-800">Results</h1>
        <SearchBar fullSearchBar={false} state={state} />
      </div>

      <span className="block mb-6 text-xs tracking-wider text-gray-500">
        {parks?.total} results for{' '}
        <span className="font-bold">{convertValueToLabel(state, states)}</span>
        {state && q ? ' and ' : ''}
        <span className="font-bold">{convertValueToLabel(q, ids)}</span>
      </span>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {parks?.data.map(({parkCode, fullName, images}) => (
          <Link href={`/park/${parkCode}`} key={parkCode}>
            <a className="p-4 bg-[#fafafa] rounded-lg shadow-lg hover:-translate-y-2 transition-all hover:shadow-xl">
              <img
                src={images[0].url}
                alt={images[0].altText}
                className="object-cover w-full h-64 rounded-md"
              />
              <h3 className="mt-2 text-2xl font-bold text-green-800">
                {fullName}
              </h3>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const URLWithParams = new URL('https://developer.nps.gov/api/v1/parks')
  const {params, query} = context
  const {stateCode, q} = query

  const createParamsObj = (state, q) => {
    let obj = {}
    if (stateCode) obj = {...obj, state}
    if (q) obj = {...obj, q}
    return obj
  }

  console.log(createParamsObj(stateCode, q))

  if (stateCode) URLWithParams.searchParams.append('stateCode', stateCode)
  if (q) URLWithParams.searchParams.append('q', q)

  const res = await fetch(
    `${URLWithParams.href}&api_key=${process.env.API_KEY}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': '*',
      },
    }
  )

  const data = await res.json()

  return {
    props: {
      parks: data,
      params: createParamsObj(stateCode, q),
    },
  }
}
