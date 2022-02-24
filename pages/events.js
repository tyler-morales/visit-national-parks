import InfiniteImages from '../components/InfiniteImages/InfiniteImages'
import Layout from '../components/Layout'

export default function Events() {
  return (
    <main>
      <Layout>
        <div className="mt-6">
          <span className="block mb-6 text-sm text-center text-green-800 uppercase">
            Events
          </span>
          <h1 className="text-6xl font-bold text-center text-green-800">
            Discover 509 unique events
          </h1>
        </div>
      </Layout>
      <InfiniteImages />
    </main>
  )
}
