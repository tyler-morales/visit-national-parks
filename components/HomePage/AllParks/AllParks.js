import {useState} from 'react'
import Link from 'next/link'

export default function AllParks({parkNames}) {
  const [numberOfParks, setNumberOfParks] = useState(100)
  const [loadedParks, setLoadedParks] = useState(
    parkNames.slice(0, numberOfParks)
  )

  const showMore = (direction) => {
    if (direction === 'increment') {
      setNumberOfParks((numberOfParks += 100))
      setLoadedParks(parkNames.slice(0, numberOfParks))
    } else {
      setNumberOfParks(100)
      setLoadedParks(parkNames.slice(0, 100))
    }
  }

  return (
    <section>
      <h2 className="mb-6 text-3xl font-bold text-green-800">All parks</h2>
      <ul className="flex flex-wrap gap-2">
        {loadedParks.map((park) => {
          return (
            <Link href={`/park/${park.code}`} key={park.code}>
              <a>
                <li className="text-sm list-none transition-all opacity-50 hover:opacity-100">
                  {park.name}
                </li>
              </a>
            </Link>
          )
        })}
      </ul>
      <div className="flex gap-4">
        {numberOfParks < 500 && (
          <button className="mt-6" onClick={() => showMore('increment')}>
            View more
          </button>
        )}
        {numberOfParks < 601 && numberOfParks > 100 && (
          <button className="mt-6" onClick={() => showMore('decrement')}>
            View Less
          </button>
        )}
      </div>
    </section>
  )
}
