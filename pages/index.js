import {Nav} from '../components/Nav/Nav'
import SearchBar from '../components/SearchBar/SearchBar'

export default function Home() {
  return (
    <div>
      <Nav />
      <div className="max-w-screen-lg px-5 m-auto mt-24">
        <SearchBar />
      </div>
    </div>
  )
}
