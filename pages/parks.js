import {useState, useEffect} from 'react'
import MapBox from '../components/ParksPage/Map/Map'
import Layout from '../components/Layout'

import Head from 'next/head'
import Sidebar from '../components/ParksPage/Sidebar/Sidebar'

export default function Parks({nationalParks}) {
  const [mapWidth, setMapWidth] = useState(true)
  const [selectedPark, setSelectedPark] = useState(null)
  const [parkData, setParkData] = useState(null)

  useEffect(() => {
    if (selectedPark != null) {
      setMapWidth(false)
    } else {
      setMapWidth(true)
    }

    // Send the park specific data to the Collection Button component
    setParkData(
      ...nationalParks
        .filter((park) => park.parkCode == selectedPark)
        .map((park) => {
          return {
            name: park.name,
            fullName: park.fullName,
            parkCode: park.parkCode,
            image: park.image.url,
          }
        })
    )
  }, [selectedPark])

  if (nationalParks) {
    const parks = nationalParks.map((park) => {
      return {
        latitude: park.latitude,
        longitude: park.longitude,
        parkCode: park.parkCode,
      }
    })

    return (
      <>
        <Head>
          <title>Official National Parks | Parkway </title>
          <meta
            property="og:title"
            content="Official National Parks | Parkway "
            key="title"
          />
          <meta
            name="description"
            content="View all 63 official National Parks"></meta>
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>

        <Layout fullWidth>
          <h1 className="mt-8 text-3xl font-bold text-center text-green-800 md:text-6xl">
            Official National Parks
          </h1>
          <div className="grid grid-cols-1 mt-8 gap-y-5 lg:gap-5 lg:grid-cols-3">
            <MapBox
              parks={parks}
              width={mapWidth}
              passMapData={setSelectedPark}
            />
            {selectedPark != null && (
              <Sidebar
                nationalParks={nationalParks}
                selectedPark={selectedPark}
                parkData={parkData}
              />
            )}
          </div>
        </Layout>
      </>
    )
  } else {
    return <div>Loading...</div>
  }
}

export async function getStaticProps() {
  //  Set the base URL for the API
  const URL = 'https://developer.nps.gov/api/v1/'

  // Set data to null to handle errors
  let nationalParks = null

  // Extract method and header from fetch
  const reqBody = {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'User-Agent': '*',
    },
  }

  // Call API Data for /PARK
  try {
    const res = await fetch(
      `${URL}parks?&limit=465&api_key=${process.env.API_KEY}`,
      reqBody
    )

    const data = await res.json()
    nationalParks = data?.data

    // Filter and map for Only the National Parks
    nationalParks = nationalParks
      .filter(
        (park) =>
          park.designation == 'National Park' ||
          park.designation == 'National Park & Preserve' ||
          park.designation == 'National Parks' ||
          park.designation == 'National Park and Preserve' ||
          park.designation == 'National and State Parks' ||
          park.name == 'National Park of American Samoa'
      )
      .map((park) => {
        return {
          name: park.name,
          fullName: park.fullName,
          parkCode: park.parkCode,
          image: park.images[0],
          description: park.description,
          states: park.states,
          latitude: park.latitude,
          longitude: park.longitude,
        }
      })
  } catch (err) {
    console.error(err)
  }

  // console.log('********************************')
  // console.log(nationalParks?.length, parkNames.length)

  return {
    props: {
      nationalParks,
    },
  }
}
