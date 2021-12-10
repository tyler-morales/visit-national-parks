import Link from 'next/link'

import {Pill} from '../components/Pill/Pill'

export default function Home() {
  return (
    <div>
      <nav>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
      <h1 className="text-5xl font-bold">Visit National Parks!</h1>
      <Pill label="Welcome" emoji="😊" />
    </div>
  )
}
