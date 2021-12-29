import {useState, useEffect} from 'react'
import {Parallax} from 'react-parallax'
import {AiFillCaretDown} from 'react-icons/ai'

import Layout from '../../components/Layout'
import {useRouter} from 'next/router'
import {MdBookmark, MdBookmarkBorder} from 'react-icons/md'
import {BsCheckLg} from 'react-icons/bs'

import checkUser from '../../hooks/checkUser'

export default function Park({park}) {
  const user = checkUser()

  const router = useRouter()
  const {name, description, designation, images} = park?.data[0]
  const {url, altText, caption, credit} = images[0]
  const [selectedCollection, setCollection] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  const openDropdown = () => {
    if (!user) alert('Please sign in or create an account')

    if (user) {
      if (toggleDropdown) {
        setToggleDropdown(false)
      } else {
        setToggleDropdown(true)
      }
    }
  }

  // Close dropdown when user interacts with it
  useEffect(() => setToggleDropdown(false), [selectedCollection])

  return (
    <Layout>
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-600-700">
        ↞Back to Results
      </button>

      {/* Title */}
      <span className="block mb-2 text-center">{designation}</span>
      <h1 className="mb-5 font-bold text-center text-green-800 text-7xl">
        {name}
      </h1>

      {/* Image */}
      <figure>
        <Parallax
          bgImage={url}
          bgImageAlt={altText}
          strength={100}
          style={{borderRadius: '12px'}}>
          <div className="h-[450px]" />
        </Parallax>
        <figcaption className="mt-3 text-sm italic text-center">
          <span>{caption}</span>
          <span className="italic"> {credit}</span>
        </figcaption>
      </figure>

      <hr className="my-12 border-gray-400" />

      {/* Collection */}
      <div className="relative my-8 w-max">
        {/* Button */}
        <div className="flex">
          {selectedCollection == null && (
            <button
              onClick={() =>
                user
                  ? setCollection('BOOKMARK')
                  : alert('Please sign in or create an account')
              }
              className="relative flex items-center gap-3 text-white bg-blue-600 rounded-l-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
              <span className="flex items-center gap-3 px-4">
                <MdBookmarkBorder />
                <span>Want to Visit</span>
              </span>
            </button>
          )}

          {selectedCollection == 'VISITED' && (
            <button
              onClick={() => setCollection(null)}
              className="flex items-center gap-3 px-4 py-2 pr-6 text-white bg-green-600 rounded-md hover:bg-green-700 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
              <BsCheckLg />
              <span>Visited</span>
            </button>
          )}

          {selectedCollection == 'BOOKMARK' && (
            <button
              onClick={() => setCollection(null)}
              className="relative flex items-center gap-3 text-white bg-blue-600 rounded-l-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
              <span className="flex items-center gap-3 px-4">
                <MdBookmark />
                <span>Bookmarked</span>
              </span>
            </button>
          )}

          {/* Arrow */}
          {selectedCollection != 'VISITED' && (
            <button
              onClick={openDropdown}
              className={`px-4 py-3 pl-4 text-white rounded-r-md focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none ${
                selectedCollection == 'VISITED'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}>
              <AiFillCaretDown />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {(selectedCollection == null || selectedCollection == 'BOOKMARK') && (
          <button
            onClick={() => setCollection('VISITED')}
            className={`shadow-lg absolute items-center w-full gap-3 mt-2 text-black bg-blue-300 rounded-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none`}>
            <span
              className={`flex items-center gap-3 px-4 ${
                toggleDropdown ? 'flex' : 'hidden'
              }`}>
              <BsCheckLg />
              <span className="py-2">Visited</span>
            </span>
          </button>
        )}
      </div>

      {/* Description */}
      <h3 className="mb-3 text-3xl font-bold text-green-800">Overview</h3>
      <p className="mt-4">{description}</p>

      {/* Images */}
      <h3 className="mt-24 text-3xl font-bold text-green-800 mb-7">
        More Images
      </h3>
      <section className="gap-10 columns-1 sm:columns-2 md:columns-3">
        {images.map((img, index) => {
          return (
            <figure
              key={index}
              className="mb-10 text-center break-inside-avoid-column">
              <img className="rounded-xl" src={img.url} alt={img.altText} />
              <figcaption className="mt-4 text-sm italic text-gray-600 ">
                {img.altText}
              </figcaption>
            </figure>
          )
        })}
      </section>
    </Layout>
  )
}

export async function getStaticPaths() {
  const URL = 'https://developer.nps.gov/api/v1/'

  // Call an external API endpoint to get posts
  const res = await fetch(
    `${URL}parks?limit=465&api_key=${process.env.API_KEY}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': '*',
      },
    }
  )

  const parks = await res.json()

  const paths = parks.data.map((park) => {
    return {
      params: {
        parkCode: `${park.parkCode}`,
      },
    }
  })

  return {paths, fallback: false}
}

export async function getStaticProps(context) {
  const URL = 'https://developer.nps.gov/api/v1/'

  const {params} = context

  const res = await fetch(
    `${URL}parks?parkCode=${params.parkCode}&limit=465&api_key=${process.env.API_KEY}`,
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
      park: data,
    },
  }
}
