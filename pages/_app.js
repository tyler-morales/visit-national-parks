import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import {Nav} from '../components/Nav/Nav'
import Head from 'next/head'

import Amplify from 'aws-amplify'
import awsconfig from '../aws-exports'

Amplify.configure({...awsconfig, ssr: true})

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Parkway | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
