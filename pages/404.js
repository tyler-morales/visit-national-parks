import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'

export default function Custom404() {
  return (
    <Layout>
      <div className="flex flex-col justify-center mt-20">
        <h1 className="mb-6 text-3xl font-bold text-center text-green-800">
          Sorry, we couldn't find what you were looking for.
        </h1>
        <Link href="/">
          <a className="px-6 py-3 m-auto my-10 font-bold text-white bg-green-700 border-2 border-transparent rounded-xl">
            Go home
          </a>
        </Link>
      </div>
    </Layout>
  )
}
