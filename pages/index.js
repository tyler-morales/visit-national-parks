import AllParks from '../components/HomePage/AllParks/AllParks'
import Hero from '../components/HomePage/Hero/Hero'
import OfficialParks from '../components/HomePage/OfficialParks/OfficialParks'
import Topcis from '../components/HomePage/Topics/Topcis'
import Layout from '../components/Layout'
import Head from 'next/head'

export default function Home({nationalParks, parkNames}) {
  return (
    <Layout>
      <div className="grid gap-32">
        <Hero />
        <OfficialParks nationalParks={nationalParks} />
        {/* <Topcis /> */}
        <AllParks parkNames={parkNames} />
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  //  Set the base URL for the API
  const URL = 'https://developer.nps.gov/api/v1/'

  // Set data to null to handle errors
  let nationalParks = null
  let parkNames = null

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
        }
      })

    parkNames = data?.data

    // Map over each park and return the park name and park code
    parkNames = parkNames.map((park) => {
      return {
        name: park.name,
        code: park.parkCode,
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
      parkNames,
    },
  }
}
