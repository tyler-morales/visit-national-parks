import InfiniteImages from '../components/InfiniteImages/InfiniteImages'
import Layout from '../components/Layout'

export default function Events() {
  return (
    <main className="mb-36">
      <div className="my-6">
        <span className="block mb-2 text-sm text-center text-green-800 uppercase md:mb-6">
          Events
        </span>
        <h1 className="text-3xl font-bold text-center text-green-800 md:text-6xl">
          Discover 509 unique events
        </h1>
      </div>
      <InfiniteImages />
    </main>
  )
}
