import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function OfficialParks({nationalParks}) {
  //   console.log(nationalParks.map((park) => console.log(park.name)))
  let limitedParks = nationalParks.slice(0, 9)
  console.log(limitedParks)
  return (
    <section className="grid grid-cols-3 gap-10">
      <div className="flex flex-col p-6 bg-green-700 rounded-xl">
        <div>
          <h2 className="mb-4 text-3xl font-bold text-white">
            Official National Parks
          </h2>
          <p className="text-lg text-white font-display">
            Discover all 63 sanctioned National Parks
          </p>
        </div>
        <Link href="/official-national-parks">
          <a className="w-full py-1 m-auto mt-4 text-lg text-center bg-orange-200 rounded-lg">
            View all
          </a>
        </Link>
      </div>

      <div className="grid grid-cols-3 col-span-2 gap-4 p-6 bg-[#fafafa] grid-cols rounded-xl">
        {limitedParks.map((park) => {
          return (
            <Link href={`/park/${park.parkCode}`} key={park.parkCode}>
              <a className="flex items-center gap-4 p-2 transition-all rounded-lg hover:bg-green-200">
                <Image
                  layout="fixed"
                  width={75}
                  height={75}
                  className="object-cover w-full min-h-full rounded-xl min-w-[75px]"
                  src={park.images[0].url}
                  alt={park.images[0].altText}
                />
                <h3 className="texdt-lg">{park.name}</h3>
              </a>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
