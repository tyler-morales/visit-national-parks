import AllParks from '../components/HomePage/AllParks/AllParks'
import Hero from '../components/HomePage/Hero/Hero'
import OfficialParks from '../components/HomePage/OfficialParks/OfficialParks'
import Topcis from '../components/HomePage/Topics/Topcis'
import Layout from '../components/Layout'

export default function Home({nationalParks, parkNames}) {
  return (
    <Layout>
      <div className="grid gap-32">
        <Hero />
        <OfficialParks nationalParks={nationalParks} />
        <Topcis />
        <AllParks parkNames={parkNames} />
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const URL = 'https://developer.nps.gov/api/v1/'

  // Call API Data for /PARK
  const res = await fetch(
    `${URL}parks?&limit=465&api_key=${process.env.API_KEY}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': '*',
      },
    }
  )

  const parksData = await res.json()

  if (!parksData) {
    return {notFound: true}
  }

  const parks = parksData?.data
  const nationalParks = parks.filter(
    (park) =>
      park.designation == 'National Park' ||
      park.designation == 'National Park & Preserve' ||
      park.designation == 'National Parks' ||
      park.designation == 'National Park and Preserve' ||
      park.designation == 'National and State Parks' ||
      park.name == 'National Park of American Samoa'
  )

  const parkNames = parks.map((park) => {
    return {
      name: park.name,
      code: park.parkCode,
    }
  })
  // console.log('********************************')
  // console.log(nationalParks.length)

  return {
    props: {
      nationalParks,
      parkNames,
    },
  }
}
