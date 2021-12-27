import {Parallax} from 'react-parallax'

export default function Park({park}) {
  const {name, description, designation, images} = park?.data[0]
  const {url, altText, caption, credit} = images[0]

  return (
    <main className="max-w-[1080px] m-auto">
      <span className="block mb-2 text-center">{designation}</span>
      <h1 className="mb-5 font-bold text-center text-green-800 text-7xl">
        {name}
      </h1>

      {/* Image */}
      <figure>
        <Parallax
          bgImage={url}
          bgImageAlt={altText}
          strength={100}
          style={{borderRadius: '12px'}}>
          <div className="h-[450px]" />
        </Parallax>
        <figcaption className="mt-3 text-sm italic text-center">
          <span>{caption}</span>
          <span className="italic"> {credit}</span>
        </figcaption>
      </figure>

      <hr className="my-12 border-gray-400" />

      {/* Description */}
      <h3 className="mb-3 text-3xl font-bold text-green-800">Overview</h3>
      <p className="mt-4">{description}</p>

      {/* Images */}
      <h3 className="mt-24 text-3xl font-bold text-green-800 mb-7">
        More Images
      </h3>
      <section className="gap-10 columns-1 sm:columns-2 md:columns-3">
        {images.map((img, index) => {
          return (
            <figure
              key={index}
              className="mb-10 text-center break-inside-avoid-column">
              <img className="rounded-xl" src={img.url} alt={img.altText} />
              <figcaption className="mt-4 text-sm italic text-gray-600 ">
                {img.altText}
              </figcaption>
            </figure>
          )
        })}
      </section>
    </main>
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
