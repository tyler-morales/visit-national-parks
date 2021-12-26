import Image from 'next/image'

export default function Park({park}) {
  const {fullName, description, designation, images} = park?.data[0]
  const {url, altText, caption, credit} = images[0]

  return (
    <div className="max-w-[1080px] m-auto grid gap-20">
      <span className="block mb-2 text-center">{designation}</span>
      <h1 className="font-bold text-center text-green-800 text-7xl">
        {fullName}
      </h1>
      <figure>
        <img
          className="object-cover w-full m-auto max-h-96 rounded-xl"
          src={url}
          alt={altText}
        />
        <figcaption className="mt-3 text-sm text-center">
          <span>{caption}</span>
          <span className="italic"> {credit}</span>
        </figcaption>
      </figure>
      <p>{description}</p>
      <div className="h-[2000px] gap-5 columns-3">
        {images.map((img, index) => {
          return (
            <figure key={index} className="mt-5 mb-6 mr-4 text-center">
              <img className="rounded-xl" src={img.url} alt={img.altText} />
              <figcaption className="mt-4 text-sm italic text-gray-600 ">
                {img.altText}
              </figcaption>
            </figure>
          )
        })}
      </div>
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
    `${URL}parks?parkCode=${params.parkCode}&limit=465&api_key=${process.env.API_KEY}`,
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
