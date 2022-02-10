import {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'

import {FaRandom} from 'react-icons/fa'

export default function OfficialParks({nationalParks}) {
  const [randomParks, setRandomParks] = useState(nationalParks)

  const randomizeParks = () => {
    setRandomParks(
      nationalParks
        .map((value) => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)
        .slice(0, 9)
    )
  }

  useEffect(() => {
    randomizeParks()
  }, [])

  return (
    <section className="grid grid-cols-1 gap-10 md:grid-cols-3">
      <div className="flex flex-col justify-center gap-6 p-6 bg-green-700 rounded-xl">
        <div>
          <h2 className="mb-4 text-3xl font-bold text-white">
            Official National Parks
          </h2>
          <p className="text-lg text-white font-display">
            Discover all 63 sanctioned National Parks
          </p>
        </div>

        <Link href="/official-national-parks">
          <a className="w-full py-1 mt-4 text-lg text-center bg-orange-200 rounded-lg">
            View all
          </a>
        </Link>
      </div>

      <div className=" p-6 bg-[#fafafa] rounded-xl md:col-span-2">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 md:col-span-2">
          {randomParks.map((park) => {
            return (
              <Link href={`/park/${park.parkCode}`} key={park.parkCode}>
                <a className="flex flex-col items-center gap-4 p-2 text-center transition-all rounded-lg md:text-left md:flex-row hover:bg-green-200">
                  <Image
                    layout="fixed"
                    width={85}
                    height={85}
                    className="object-cover w-full min-h-full rounded-xl min-w-[75px] bg-gray-200"
                    src={park.images[0].url}
                    alt={park.images[0].altText}
                  />
                  <h3 className="texdt-lg max-w-[13ch]">{park.name}</h3>
                </a>
              </Link>
            )
          })}
        </div>

        <button
          className="flex items-center gap-2 m-auto mt-4 text-blue-600"
          onClick={randomizeParks}>
          <FaRandom />
          <span className="text-sm">Randomize</span>
        </button>
      </div>
    </section>
  )
}
