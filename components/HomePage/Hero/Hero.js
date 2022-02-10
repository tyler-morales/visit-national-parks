import {useState, useEffect} from 'react'
import Image from 'next/image'
import SearchBar from '../../../components/SearchBar/SearchBar'

import glacier from '../../../public/images/glacier.jpeg'

export default function Hero() {
  const [screenWidth, setScreenWidth] = useState(0)
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth)
    }
    changeWidth()

    window.addEventListener('resize', changeWidth)

    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])

  return (
    <section className="relative top-0">
      {screenWidth > 1024 && (
        <Image
          layout="responsive"
          width="100%"
          height="60vh"
          className="object-cover w-full min-h-full rounded-3xl"
          src={glacier}
          placeholder="blur"
          alt="Glacier National Park"
        />
      )}

      <div className="top-0 w-full h-full lg:pt-20 md:absolute lg:bg-gradient-to-b from-white rounded-3xl">
        <h1 className="mb-4 text-4xl font-bold text-center text-green-800 sm:text-7xl">
          Explore America
        </h1>
        <p className="mb-6 text-xl sm:text-2xl text-center text-green-800 sm:w-[30ch] m-auto leading-8 font-display">
          Uncover over 450 unique & inviting locations across the United Sates
        </p>
        <div className="max-w-[1080px] m-auto">
          <SearchBar fullSearchBar={true} />
        </div>
      </div>
    </section>
  )
}
