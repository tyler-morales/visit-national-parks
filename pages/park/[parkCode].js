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
import Alert from '../../components/ParkPage/Alert/Alert'

export default function Park({parkInfo, thingsToDo, alerts}) {
  const router = useRouter()

  const thingCoordinates = thingsToDo?.map((thing) => {
    return {
      id: thing.id,
      name: thing.title,
      url: thing.url,
      latitude: thing.latitude,
      longitude: thing.longitude,
    }
  })

  if (parkInfo && thingsToDo) {
    const {fullName, name, latitude, longitude} = parkInfo
    console.log(thingsToDo)

    return (
      <>
        <Head>
          <title>{fullName}</title>
          <meta property="og:title" content={fullName} key="title" />
          <meta
            name="description"
            content={
              'Explore ' +
              fullName +
              ' and discover the great American outdoors'
            }></meta>
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>

        <Layout>
          {alerts.length > 0 && <Alert alerts={alerts} />}
          <button
            onClick={() => router.back()}
            aria-label="Back to results"
            className="text-sm text-gray-600-700">
            ↞Back to Results
          </button>

          {/* Title */}
          <span className="block mb-2 text-center">{parkInfo.designation}</span>
          <h1 className="mb-5 text-5xl font-bold text-center text-green-800 md:text-7xl">
            {name}
          </h1>

          {/* Hero Image */}
          <HeroImage image={parkInfo.images[0]} />

          <hr className="my-12 border-gray-400" />

          {/* Collection */}
          <CollectionButton
            name={name}
            parkCode={parkInfo.parkCode}
            fullName={parkInfo.fullName}
            url={parkInfo.images[0]?.url}
          />

          {/* General Info */}
          <GeneralInfo
            description={parkInfo.description}
            states={parkInfo.states}
            contacts={parkInfo.contacts}
            title="Overview"
          />

          <div className="grid gap-10 p-8 mt-10 border-2 border-green-700 rounded-lg bg-orange-50 col-1 md:grid-cols-4">
            {/* Hours */}
            <Hours operatingHours={parkInfo.operatingHours} title="Hours" />
            <Fees
              title="Fees & Passes"
              entranceFees={parkInfo.entranceFees}
              entrancePasses={parkInfo.entrancePasses}
            />
          </div>

          {/* Map */}
          <MapBox
            coordinates={{latitude, longitude}}
            fullName={parkInfo.fullName}
            parkCode={parkInfo.parkCode}
            title="Map"
          />

          {/* Things To Do */}
          {thingsToDo.length != 0 && (
            <ThingsToDo thingsToDo={thingsToDo} title="Things To Do" />
          )}

          {/* Images */}
          <Images images={parkInfo.images} title="More Images" />
        </Layout>
      </>
    )
  } else {
    return (
      <Layout>
        <h2 className="text-center">Loading...</h2>
      </Layout>
    )
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps({params}) {
  //  Set the base URL for the API
  const URL = 'https://developer.nps.gov/api/v1/'

  // Set data to null to handle errors
  let parkInfo = null
  let thingsToDo = null

  // Call API Data for /PARK
  try {
    const parkData = await fetch(
      `${URL}parks?parkCode=${params?.parkCode}&limit=465&api_key=${process.env.API_KEY}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'User-Agent': '*',
        },
      }
    )

    parkInfo = await parkData.json()
    parkInfo = parkInfo.data[0]
    parkInfo = {
      name: parkInfo?.name,
      description: parkInfo?.description,
      parkCode: parkInfo?.parkCode,
      designation: parkInfo?.designation,
      images: parkInfo?.images,
      fullName: parkInfo?.fullName,
      states: parkInfo?.states,
      contacts: parkInfo?.contacts,
      operatingHours: parkInfo?.operatingHours,
      entranceFees: parkInfo?.entranceFees,
      entrancePasses: parkInfo?.entrancePasses,
      latitude: parkInfo?.latitude,
      longitude: parkInfo?.longitude,
    }
  } catch (err) {
    console.error(err)
  }

  // Call API Data for /THINGS-TO-DO
  try {
    const thingsToDoData = await fetch(
      `${URL}thingstodo?parkCode=${params?.parkCode}&limit=100&api_key=${process.env.API_KEY}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'User-Agent': '*',
        },
      }
    )

    thingsToDo = await thingsToDoData.json()
    thingsToDo = thingsToDo?.data
  } catch (err) {
    console.error(err)
  }

  // Call API Data for /ALERTS
  const res3 = await fetch(
    `${URL}alerts?parkCode=${params?.parkCode}&limit=5&api_key=${process.env.API_KEY}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': '*',
      },
    }
  )

  const alertsData = await res3.json()
  const alerts = alertsData?.data

  if (!alerts) {
    return {notFound: true}
  }

  return {
    props: {
      parkInfo,
      thingsToDo,
      alerts,
    },
    revalidate: 60,
  }
}
