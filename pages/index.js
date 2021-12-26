import {Nav} from '../components/Nav/Nav'
import SearchBar from '../components/SearchBar/SearchBar'

export default function Home() {
  // console.log(parks)
  return (
    <div>
      <Nav />
      <div className="max-w-screen-lg px-5 m-auto mt-24">
        <SearchBar />
      </div>
    </div>
  )
}

// export async function getStaticProps() {
//   // console.log(process.env.API_KEY)
//   const res = await fetch(
//     `https://developer.nps.gov/api/v1/parks?parkCode=yell&api_key=${process.env.API_KEY}`
//   )
//   const data = await res.json()

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {parks: data}, // will be passed to the page component as props
//   }
// }
