import {Nav} from '../components/Nav/Nav'
import SearchBar from '../components/SearchBar/SearchBar'

export default function Home() {
  return (
    <div>
      <Nav />
      <div className="max-w-screen-lg m-auto mt-48">
        <SearchBar />
      </div>
    </div>
  )
}
