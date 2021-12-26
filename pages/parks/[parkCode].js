import {useRouter} from 'next/router'

export default function Park({park}) {
  const {fullName, description} = park?.data[0]

  return (
    <div>
      <h1>Park name is: {fullName}</h1>
      <h2>{description}</h2>
    </div>
  )
}

export async function getStaticPaths() {
  const URL = 'https://developer.nps.gov/api/v1/'

  // Call an external API endpoint to get posts
  const res = await fetch(
    `${URL}parks?limit=465&api_key=${process.env.API_KEY}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': '*',
      },
    }
  )

  const parks = await res.json()

  const paths = parks.data.map((park) => {
    return {
      params: {
        parkCode: `${park.parkCode}`,
      },
    }
  })

  return {paths, fallback: false}
}

export async function getStaticProps(context) {
  const URL = 'https://developer.nps.gov/api/v1/'

  const {params} = context

  const res = await fetch(
    `${URL}parks?parkCode=${params.parkCode}&api_key=${process.env.API_KEY}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': '*',
      },
    }
  )

  const data = await res.json()

  return {
    props: {
      park: data,
    },
  }
}
