import {useState} from 'react'
import MapBox from '../components/ParksPage/Map/Map'
import Layout from '../components/Layout'

export default function Parks({nationalParks}) {
  const [mapWidth, setMapWidth] = useState(true)
  const [selectedPark, setSelectedPark] = useState(null)

  if (nationalParks) {
    const coordinates = nationalParks.map((park) => {
      return {latitude: park.latitude, longitude: park.longitude}
    })

    return (
      <Layout fullWidth>
        <h1 className="mt-8 text-3xl font-bold text-center text-green-800 md:text-6xl">
          Official National Parks
        </h1>
        <div className="grid grid-cols-3 mt-8">
          <MapBox coordinates={coordinates} width={mapWidth} />
          {selectedPark && <div className="bg-gray-300">Park Name</div>}
        </div>
      </Layout>
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
          parkCode: park.parkCode,
          image: park.images[0],
          description: park.description,
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
