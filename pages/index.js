import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar/SearchBar'

export default function Home() {
  return (
    <Layout>
      <div className="max-w-screen-lg px-5 m-auto">
        <SearchBar fullSearchBar={true} />
      </div>
    </Layout>
  )
}
