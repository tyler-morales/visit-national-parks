import Head from 'next/head'

import {useRouter} from 'next/router'

import Layout from '../../components/Layout'
import Images from '../../components/ParkPage/Images/Images'
import GeneralInfo from '../../components/ParkPage/GeneralInfo/GeneralInfo'
import HeroImage from '../../components/ParkPage/HeroImage/HeroImage'
import CollectionButton from '../../components/ParkPage/CollectionButton/CollectionButton'
import Hours from '../../components/ParkPage/Hours/Hours'
import Fees from '../../components/ParkPage/Fees/Fees'
import MapBox from '../../components/ParkPage/Map/MapBox'
import ThingsToDo from '../../components/ParkPage/ThingsToDo/ThingsToDo'

export default function Park({
  name,
  fullName,
  description,
  parkCode,
  designation,
  images,
  states,
  contacts,
  operatingHours,
  entranceFees,
  entrancePasses,
  latitude,
  longitude,
  thingsToDo,
}) {
  const router = useRouter()

  if (router.isFallback) {
    return 'loading...'
  }

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
        <CollectionButton
          name={name}
          parkCode={parkCode}
          fullName={fullName}
          url={images[0]?.url}
        />

        {/* General Info */}
        <GeneralInfo
          description={description}
          states={states}
          contacts={contacts}
          title="Overview"
        />

        <div className="grid gap-10 p-8 mt-10 border-2 border-green-700 rounded-lg bg-orange-50 col-1 md:grid-cols-4">
          {/* Hours */}
          <Hours operatingHours={operatingHours} title="Hours" />
          <Fees
            title="Fees & Passes"
            entranceFees={entranceFees}
            entrancePasses={entrancePasses}
          />
        </div>

        {/* Map */}
        <MapBox
          coordinates={{latitude, longitude}}
          fullName={fullName}
          parkCode={parkCode}
          title="Map"
        />

        {/* Things To Do */}
        {thingsToDo.length != 0 && (
          <ThingsToDo thingsToDo={thingsToDo} title="Things To Do" />
        )}

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
    operatingHours,
    entranceFees,
    entrancePasses,
    latitude,
    longitude,
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
      operatingHours,
      entranceFees,
      entrancePasses,
      latitude,
      longitude,
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
