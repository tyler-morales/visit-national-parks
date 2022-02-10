import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import img1 from '../../../public/images/events.png'
import img2 from '../../../public/images/webcams.png'

export default function Topcis() {
  return (
    <section>
      <h2 className="mb-6 text-3xl font-bold text-green-800">
        Explore by topic
      </h2>
      <div className="grid grid-cols-2 gap-8 ">
        <Link href={`/events`}>
          <a className="relative">
            <Image
              layout="responsive"
              width={400}
              height={400}
              className="object-cover w-full min-h-full rounded-xl"
              src={img1}
              alt="events"
              placeholder="blur"
            />
            <h3 className="absolute text-5xl font-bold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 card-center">
              Events
            </h3>
          </a>
        </Link>

        <Link href={`/events`}>
          <a className="relative">
            <Image
              layout="responsive"
              width={400}
              height={400}
              className="object-cover w-full min-h-full rounded-xl"
              src={img1}
              alt="events"
              placeholder="blur"
            />
            <h3 className="absolute text-5xl font-bold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 card-center">
              Events
            </h3>
          </a>
        </Link>

        <Link href={`/events`}>
          <a className="relative">
            <Image
              layout="responsive"
              width={400}
              height={400}
              className="object-cover w-full min-h-full rounded-xl"
              src={img1}
              alt="events"
              placeholder="blur"
            />
            <h3 className="absolute text-5xl font-bold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 card-center">
              Events
            </h3>
          </a>
        </Link>

        <Link href={`/events`}>
          <a className="relative">
            <Image
              layout="responsive"
              width={400}
              height={400}
              className="object-cover w-full min-h-full rounded-xl"
              src={img1}
              alt="events"
              placeholder="blur"
            />
            <h3 className="absolute text-5xl font-bold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 card-center">
              Events
            </h3>
          </a>
        </Link>
      </div>
    </section>
  )
}
