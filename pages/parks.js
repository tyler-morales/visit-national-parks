import {useState, useEffect} from 'react'
import MapBox from '../components/ParksPage/Map/Map'
import Layout from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import {FiLink} from 'react-icons/fi'
import CollectionButton from '../components/ParkPage/CollectionButton/CollectionButton'
import Head from 'next/head'

// Write state codes and state name
const stateCodes = [
  {code: 'AL', name: 'Alabama'},
  {code: 'AK', name: 'Alaska'},
  {code: 'AZ', name: 'Arizona'},
  {code: 'AR', name: 'Arkansas'},
  {code: 'CA', name: 'California'},
  {code: 'CO', name: 'Colorado'},
  {code: 'CT', name: 'Connecticut'},
  {code: 'DE', name: 'Delaware'},
  {code: 'DC', name: 'District Of Columbia'},
  {code: 'FL', name: 'Florida'},
  {code: 'GA', name: 'Georgia'},
  {code: 'HI', name: 'Hawaii'},
  {code: 'ID', name: 'Idaho'},
  {code: 'IL', name: 'Illinois'},
  {code: 'IN', name: 'Indiana'},
  {code: 'IA', name: 'Iowa'},
  {code: 'KS', name: 'Kansas'},
  {code: 'KY', name: 'Kentucky'},
  {code: 'LA', name: 'Louisiana'},
  {code: 'ME', name: 'Maine'},
  {code: 'MD', name: 'Maryland'},
  {code: 'MA', name: 'Massachusetts'},
  {code: 'MI', name: 'Michigan'},
  {code: 'MN', name: 'Minnesota'},
  {code: 'MS', name: 'Mississippi'},
  {code: 'MO', name: 'Missouri'},
  {code: 'MT', name: 'Montana'},
  {code: 'NE', name: 'Nebraska'},
  {code: 'NV', name: 'Nevada'},
  {code: 'NH', name: 'New Hampshire'},
  {code: 'NJ', name: 'New Jersey'},
  {code: 'NM', name: 'New Mexico'},
  {code: 'NY', name: 'New York'},
  {code: 'NC', name: 'North Carolina'},
  {code: 'ND', name: 'North Dakota'},
  {code: 'OH', name: 'Ohio'},
  {code: 'OK', name: 'Oklahoma'},
  {code: 'OR', name: 'Oregon'},
  {code: 'PA', name: 'Pennsylvania'},
  {code: 'RI', name: 'Rhode Island'},
  {code: 'SC', name: 'South Carolina'},
  {code: 'SD', name: 'South Dakota'},
  {code: 'TN', name: 'Tennessee'},
  {code: 'TX', name: 'Texas'},
  {code: 'UT', name: 'Utah'},
  {code: 'VT', name: 'Vermont'},
  {code: 'VA', name: 'Virginia'},
  {code: 'WA', name: 'Washington'},
  {code: 'WV', name: 'West Virginia'},
  {code: 'WI', name: 'Wisconsin'},
  {code: 'WY', name: 'Wyoming'},
  {code: 'VI', name: 'Virgin Islands'},
  {code: 'AS', name: 'American Samoa'},
]

// Convert state code to state name
const stateName = (code) => {
  return stateCodes.find((state) => state.code === code).name
}

export default function Parks({nationalParks}) {
  const [mapWidth, setMapWidth] = useState(true)
  const [selectedPark, setSelectedPark] = useState(null)

  useEffect(() => {
    if (selectedPark != null) {
      setMapWidth(false)
    } else {
      setMapWidth(true)
    }
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
              <div className="w-full p-6 bg-gray-100 border-2 border-green-800 rounded-lg">
                {nationalParks
                  .filter((park) => park.parkCode == selectedPark)
                  .map((park, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col justify-between h-full">
                        <div>
                          <h2 className="mb-2 text-3xl font-bold text-center text-green-900">
                            {park.name}
                          </h2>
                          <Image
                            height={350}
                            width={600}
                            src={park.image.url}
                            alt={park.image.altText}
                            layout="responsive"
                            className="object-cover w-full rounded-md"
                          />
                          <span className="block mt-4 text-sm text-gray-400 uppercase">
                            description
                          </span>
                          <p className="mt-2 font-display">
                            {park.description}
                          </p>

                          <span className="block mt-4 text-sm text-gray-400 uppercase">
                            States
                          </span>
                          <p className="mt-2 font-display">
                            {park.states.length == 2
                              ? stateName(park.states)
                              : park.states
                                  .split(',')
                                  .map(
                                    (state, index) => stateName(state) + ' '
                                  )}
                          </p>

                          {/* TODO: Add Collection Button */}
                          <CollectionButton
                            parkCode={
                              nationalParks
                                .filter((park) => park.parkCode == selectedPark)
                                .map((park) => park.parkCode)[0]
                            }
                            name={
                              nationalParks
                                .filter((park) => park.parkCode == selectedPark)
                                .map((park) => park.name)[0]
                            }
                            fullName={
                              nationalParks
                                .filter((park) => park.parkCode == selectedPark)
                                .map((park) => park.fullName)[0]
                            }
                            url={
                              nationalParks
                                .filter((park) => park.parkCode == selectedPark)
                                .map((park) => park.image.url)[0]
                            }
                          />
                        </div>

                        <Link href={`/park/${park.parkCode}`}>
                          <a className="flex gap-2 text-blue-600">
                            <FiLink size="1.25em" />
                            <span>More Info</span>
                          </a>
                        </Link>
                      </div>
                    )
                  })}
              </div>
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
