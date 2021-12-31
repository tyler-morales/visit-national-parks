import {useState, useEffect} from 'react'
import {Parallax} from 'react-parallax'
import {AiFillCaretDown} from 'react-icons/ai'
import {v4 as uuidv4} from 'uuid'

import Layout from '../../components/Layout'
import {useRouter} from 'next/router'
import {MdBookmark, MdBookmarkBorder} from 'react-icons/md'
import {BsCheckLg} from 'react-icons/bs'

import checkUser from '../../hooks/checkUser'

// GraphQL
import {API, Auth, withSSRContext} from 'aws-amplify'
import {createSite, updateSite} from '../../src/graphql/mutations'
import {listSites} from '../../src/graphql/queries'

export default function Park({
  name,
  description,
  parkCode,
  designation,
  images,
  allSites,
}) {
  const user = checkUser()
  const router = useRouter()

  // Get updated data
  const refreshData = () => {
    router.replace({pathname: router.asPath}, undefined, {scroll: false})
  }

  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [selectedCollection, setCollection] = useState(null)

  const {url, altText, caption, credit} = images[0]

  // Filter parks that match parkpage to the logged-in user
  let filteredSite = allSites?.owner == user?.username ? allSites : null

  // console.log(filteredSite.bookmarked)

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
  const handleDBQuery = async () => {
    if (filteredSite?.bookmarked) {
      setCollection('BOOKMARKED')
    } else if (filteredSite?.bookmarked == false) {
      setCollection('UNBOOKMARKED')
    } else if (filteredSite?.bookmarked == null) setCollection(null)

    try {
      user
        ? setCollection('BOOKMARK')
        : alert('Please sign in or create an account')

      const siteInfo = {
        id: uuidv4(),
        name: parkCode,
        bookmarked: true,
        owner: user?.username,
      }
      // A site does not exist, create a new entry
      if (filteredSite == null) {
        await API.graphql({
          query: createSite,
          variables: {input: siteInfo},
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })
        refreshData()
        console.log(`${name} added`)
      }
      // A site exists, update it
      else {
        console.log(filteredSite?.bookmarked)
        if (filteredSite?.bookmarked == false) {
          await API.graphql({
            query: updateSite,
            variables: {
              input: {
                id: filteredSite.id,
                bookmarked: true,
                owner: user?.username,
              },
            },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          })
          refreshData()
          setCollection('BOOKMARK')
          console.log(`${name} Bookmarked`)
        } else if (filteredSite?.bookmarked == true) {
          await API.graphql({
            query: updateSite,
            variables: {
              input: {
                id: filteredSite?.id,
                bookmarked: false,
              },
            },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          })
          refreshData()
          setCollection(null)
          console.log(`${name} Unbookmarked`)
        }
      }
      const {data} = await API.graphql({
        query: listSites,
        variables: {
          id: parkCode,
          filter: {name: {eq: parkCode}},
        },
      })

      console.log(
        `updated data: ${data.listSites.items[0].name} \n Bookmarked: ${data.listSites.items[0].bookmarked} \n  @ ${data.listSites.items[0].updatedAt}`
      )
    } catch (err) {
      console.error(err)
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
          {(!filteredSite?.bookmarked ||
            filteredSite?.owner != user?.username) && (
            <button
              onClick={handleDBQuery}
              className="relative flex items-center gap-3 text-white bg-blue-600 rounded-l-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
              <span className="flex items-center gap-3 px-4">
                <MdBookmarkBorder />
                <span>Want to Visit</span>
              </span>
            </button>
          )}

          {filteredSite?.bookmarked && filteredSite?.owner == user?.username && (
            <button
              onClick={handleDBQuery}
              className="relative flex items-center gap-3 text-white bg-blue-600 rounded-l-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
              <span className="flex items-center gap-3 px-4">
                <MdBookmark />
                <span>Bookmarked</span>
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

export async function getServerSideProps({params}) {
  const URL = 'https://developer.nps.gov/api/v1/'

  // Call API Data
  const res = await fetch(
    `${URL}parks?parkCode=${params?.parkCode}&limit=465&api_key=${process.env.API_KEY}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': '*',
      },
    }
  )

  const parkData = await res.json()

  const park = parkData?.data[0]

  const {name, description, parkCode, designation, images} = park

  const {data} = await API.graphql({
    query: listSites,
    variables: {
      id: params.parkCode,
      filter: {name: {eq: params.parkCode}},
    },
  })

  const allSites = data?.listSites?.items[0] || null

  return {
    props: {
      name,
      description,
      parkCode,
      designation,
      images,
      allSites,
    },
  }
}
