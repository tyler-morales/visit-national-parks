import {useState} from 'react'
import Layout from '../../components/Layout'
import {useRouter} from 'next/router'
import {AiFillCaretDown} from 'react-icons/ai'
import {v4 as uuidv4} from 'uuid'
import Head from 'next/head'

import checkUser from '../../hooks/checkUser'
import {API} from 'aws-amplify'

import {MdBookmark, MdBookmarkBorder} from 'react-icons/md'
import {BsCheckLg} from 'react-icons/bs'

import useSWR from 'swr'
import {createSite, updateSite} from '../../src/graphql/mutations'
import {listSites} from '../../src/graphql/queries'

import Image from 'next/image'
import Images from '../../components/ParkPage/Images/Images'
import GeneralInfo from '../../components/ParkPage/GeneralInfo/GeneralInfo'
import HeroImage from '../../components/ParkPage/HeroImage/HeroImage'
// import CollectionButton from '../../components/CollectionButton/CollectionButton'

export default function Park({
  name,
  fullName,
  description,
  parkCode,
  designation,
  images,
  states,
  contacts,
  thingsToDo,
}) {
  const router = useRouter()
  const user = checkUser()

  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [visited, setVisited] = useState(null)
  const [bookmarked, setBookmarked] = useState(null)
  const [id, setId] = useState(uuidv4())

  const phoneNumber = contacts?.phoneNumbers[0]?.phoneNumber

  // Once the  user data loads, call this function to populate the Collection button with the correct label ('Want to visit' or 'visited')
  const fetchUserSite = async (owner, code) => {
    try {
      const {data} = await API.graphql({
        query: listSites,
        variables: {
          filter: {
            code: {eq: code},
            owner: {eq: owner},
          },
        },
      })

      const userData = data?.listSites?.items[0]

      // Site is bookmarked, set UI to bookmarked
      if (userData?.bookmarked) {
        setBookmarked(true)
      }

      // Site is visited, set UI to visited
      if (userData?.visited) {
        setVisited(true)
      }

      if (userData != null) {
        setId(userData?.id)
      }

      // Create site object if no site exists
      if (userData == null) {
        setBookmarked(false)
        setVisited(false)

        const siteInfo = {
          id,
          name: fullName,
          code: parkCode,
          img: url,
          owner: user?.username,
          bookmarked: false,
          visited: false,
        }

        await API.graphql({
          query: createSite,
          variables: {input: siteInfo},
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })

        setBookmarked(false)
        setVisited(false)

        console.log(`${name} added for the first time`)
      }
      return userData
    } catch (err) {
      console.log('Site not added by user', err)
    }
  }
  // Only call the fetchUserSite method if `user` exists
  useSWR(user ? [user?.username, parkCode] : null, fetchUserSite)

  const openDropdown = () => {
    console.log('dropdown clicked')
    if (!user) alert('Please sign in or create an account')

    if (user) {
      if (toggleDropdown) {
        setToggleDropdown(false)
      } else {
        setToggleDropdown(true)
      }
    }
  }

  const toggleVisitedQuery = async () => {
    try {
      // A site exists, update it
      if (!visited) {
        await API.graphql({
          query: updateSite,
          variables: {
            input: {
              id,
              visited: true,
              bookmarked: false,
              owner: user?.username,
            },
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })
        setVisited(true)
        setBookmarked(false)
        setToggleDropdown(false)
        console.log(`${name} visited`)
      }
    } catch (err) {
      console.error(err)
    }
  }
  // When the user clicks on the button, update the state in the UI and database
  const handleDBQuery = async () => {
    try {
      // Make user log in if they are not already
      if (user) {
        setBookmarked(false)
      } else {
        alert('Please sign in or create an account')
      }

      // BOOKMARK SITE
      if (!bookmarked) {
        await API.graphql({
          query: updateSite,
          variables: {
            input: {
              id,
              bookmarked: true,
            },
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })
        setVisited(false)
        setBookmarked(true)
        console.log(`${name} Bookmarked`)
      }
      // REMOVE BOOKMARK SITE
      if (bookmarked) {
        await API.graphql({
          query: updateSite,
          variables: {
            input: {
              id,
              bookmarked: false,
            },
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })
        setBookmarked(false)
        console.log(`${name} Unbookmarked`)
      }
      // REMOVE VISIT
      if (visited) {
        console.log('unvisiting')
        await API.graphql({
          query: updateSite,
          variables: {
            input: {
              id,
              visited: false,
              bookmarked: false,
            },
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })
        setVisited(false)
        setBookmarked(false)
      }
    } catch (err) {
      console.error('errored out', err)
    }
  }

  if (router.isFallback) {
    return 'loading...'
  }

  // const {url, altText, caption, credit} = images[0]

  return (
    <>
      <Head>
        <title>{fullName}</title>
        <meta property="og:title" content={fullName} key="title" />
        <meta
          name="description"
          content={
            'Explore ' + fullName + ' and discover the great American outdoors'
          }></meta>
      </Head>

      <Layout>
        <button
          onClick={() => router.back()}
          aria-label="Back to results"
          className="text-sm text-gray-600-700">
          ↞Back to Results
        </button>

        {/* Title */}
        <span className="block mb-2 text-center">{designation}</span>
        <h1 className="mb-5 font-bold text-center text-green-800 text-7xl">
          {name}
        </h1>

        {/* Hero Image */}
        <HeroImage image={images[0]} />

        <hr className="my-12 border-gray-400" />

        {/* Collection */}
        <div className="relative my-8 w-max">
          {/* Button */}
          <div className="flex">
            {!bookmarked && !visited && (
              <button
                aria-label="Bookmark"
                onClick={handleDBQuery}
                className="relative flex items-center gap-3 text-white bg-blue-600 rounded-l-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
                <span className="flex items-center gap-3 px-4">
                  <MdBookmarkBorder />
                  <span>Want to Visit</span>
                </span>
              </button>
            )}

            {bookmarked && (
              <button
                aria-label="Bookmarked"
                onClick={handleDBQuery}
                className="relative flex items-center gap-3 text-white bg-blue-600 rounded-l-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
                <span className="flex items-center gap-3 px-4">
                  <MdBookmark />
                  <span>Bookmarked</span>
                </span>
              </button>
            )}

            {visited && (
              <button
                aria-label="Visited"
                onClick={handleDBQuery}
                className="flex items-center gap-3 px-4 py-2 pr-6 text-white bg-green-600 rounded-md hover:bg-green-700 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
                <BsCheckLg />
                <span>Visited</span>
              </button>
            )}

            {/* Arrow */}
            {!visited && (
              <button
                aria-label="Dropdown arrow"
                onClick={openDropdown}
                className={`px-4 py-3 pl-4 text-white rounded-r-md focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none ${
                  visited
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}>
                <AiFillCaretDown />
              </button>
            )}
          </div>

          {/* Dropdown */}
          <button
            aria-label="Visited"
            onClick={toggleVisitedQuery}
            className={`shadow-lg absolute items-center w-full gap-3 mt-2 text-black rounded-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none`}>
            <span
              className={`flex items-center gap-3 px-4 ${
                toggleDropdown
                  ? 'flex bg-white border-2 border-blue-600 rounded-md hover:bg-green-600 hover:border-green-800 hover:text-white'
                  : 'hidden'
              }`}>
              <BsCheckLg />
              <span className="py-2">Visited</span>
            </span>
          </button>
        </div>

        {/* General Info */}
        <GeneralInfo
          description={description}
          states={states}
          phoneNumber={phoneNumber}
          title="Overview"
        />

        {/* Images */}
        <Images images={images} title="More Images" />
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps({params}) {
  const URL = 'https://developer.nps.gov/api/v1/'

  // Call API Data for /PARK
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

  if (!parkData) {
    return {notFound: true}
  }

  const park = parkData?.data[0]

  const {
    name,
    description,
    parkCode,
    designation,
    images,
    fullName,
    states,
    contacts,
  } = park

  // Call API Data for /THINGS-TO-DO
  const res2 = await fetch(
    `${URL}thingstodo?parkCode=${params?.parkCode}&limit=100&api_key=${process.env.API_KEY}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': '*',
      },
    }
  )

  const thingsToDoData = await res2.json()
  const thingsToDo = thingsToDoData?.data

  if (!thingsToDo) {
    return {notFound: true}
  }

  return {
    props: {
      name,
      fullName,
      description,
      parkCode,
      designation,
      images,
      states,
      contacts,
      thingsToDo,
    },
    revalidate: 60,
  }
}

/*
ACTIVITIES

   const activities = thingsToDo
     ?.map((thing) => thing?.activities?.map((activity) => activity.name))
     .flat()

   const countedActivities = activities?.reduce(function (acc, curr) {
     return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc
   }, {})
   console.log(countedActivities)

{
  "Snowmobiling": 1,
  "Hiking": 49,
  "Front-Country Hiking": 4,
  "Mountain Biking": 10,
  "Self-Guided Tours - Walking": 2,
  "Skiing": 20,
  "Snowshoeing": 1
}

{
  "Biking": 1,
  "Rock Climbing": 1,
  "Auto and ATV": 1,
  "Museum Exhibits": 2,
  "Junior Ranger Program": 1,
  "Hiking": 2
}

{
  "Cultural Demonstrations": 1,
  "Guided Tours": 1,
  "Museum Exhibits": 1,
  "Hiking": 2,
  "Scenic Driving": 1
}

{
  "Astronomy": 2,
  "Camping": 2,
  "Wildlife Watching": 1,
  "Hiking": 4,
  "Scenic Driving": 5,
  "Biking": 1,
  "Guided Tours": 2,
  "Junior Ranger Program": 4,
  "Bookstore and Park Store": 1
}

{
  "Stargazing": 5,
  "Scenic Driving": 2,
  "Picnicking": 1,
  "Paddling": 4,
  "Hiking": 38,
  "Self-Guided Tours - Walking": 2,
  "Birdwatching": 13,
  "Swimming": 3,
  "Biking": 1,
  "Wildlife Watching": 5
}

{
  "Backcountry Camping": 1,
  "Snowshoeing": 3,
  "Mountain Climbing": 1,
  "Backcountry Hiking": 3,
  "Biking": 1,
  "Hiking": 7,
  "Car or Front Country Camping": 1,
  "Scenic Driving": 2,
  "Self-Guided Tours - Walking": 1,
  "Freshwater Fishing": 1,
  "Cross-Country Skiing": 1
}

{
  "Birdwatching": 3,
  "Fishing": 1,
  "Boat Tour": 2,
  "Guided Tours": 1,
  "Junior Ranger Program": 1,
  "Biking": 1,
  "Front-Country Hiking": 1
}

{
  "Paddling": 2,
  "Hiking": 5,
  "Hands-On": 2,
  "Junior Ranger Program": 1
}
*/
