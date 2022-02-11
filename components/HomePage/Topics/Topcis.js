import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import img1 from '../../../public/images/webcams.svg'
import img2 from '../../../public/images/events.svg'
import img3 from '../../../public/images/news.svg'
import img4 from '../../../public/images/alerts.svg'

export default function Topcis() {
  return (
    <section>
      <h2 className="mb-6 text-3xl font-bold text-green-800">
        Explore by topic
      </h2>
      <div className="grid grid-cols-2 gap-8 ">
        <Link href={`/alerts`}>
          <a className="relative">
            <Image
              layout="responsive"
              width={400}
              height={400}
              className="object-cover w-full min-h-full rounded-xl"
              src={img1}
              alt="alerts"
              // placeholder="blur"
            />
          </a>
        </Link>

        <Link href={`/news`}>
          <a className="relative">
            <Image
              layout="responsive"
              width={400}
              height={400}
              className="object-cover w-full min-h-full rounded-xl"
              src={img2}
              alt="news"
              // placeholder="blur"
            />
          </a>
        </Link>

        <Link href={`/events`}>
          <a className="relative">
            <Image
              layout="responsive"
              width={400}
              height={400}
              className="object-cover w-full min-h-full rounded-xl"
              src={img3}
              alt="events"
              // placeholder="blur"
            />
          </a>
        </Link>

        <Link href={`/webcams`}>
          <a className="relative">
            <Image
              layout="responsive"
              width={400}
              height={400}
              className="object-cover w-full min-h-full rounded-xl"
              src={img4}
              alt="webcams"
              // placeholder="blur"
            />
          </a>
        </Link>
      </div>
    </section>
  )
}
