import React from 'react'
import Link from 'next/link'

export default function results({parks}) {
  console.log(parks)
  return (
    <div className="max-w-[1080px] m-auto px-5">
      <span className="block mb-2 text-xs tracking-wider text-gray-500">
        {parks.total} results
      </span>
      <h1 className="mb-5 text-5xl font-bold text-green-800">Results</h1>

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
    },
  }
}
