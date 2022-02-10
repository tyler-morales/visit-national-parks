import Hero from '../components/HomePage/Hero/Hero'
import OfficialParks from '../components/HomePage/OfficialParks/OfficialParks'
import Topcis from '../components/HomePage/Topics/Topcis'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar/SearchBar'

export default function Home({nationalParks}) {
  return (
    <Layout>
      <div className="grid gap-32">
        <Hero />
        <OfficialParks nationalParks={nationalParks} />
        <Topcis />
      </div>
    </Layout>
  )
}

export async function getStaticProps({params}) {
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
  // console.log('********************************')
  // console.log(nationalParks.length)

  return {
    props: {
      nationalParks,
    },
  }
}
