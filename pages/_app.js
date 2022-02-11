import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import {Nav} from '../components/Nav/Nav'
import Head from 'next/head'

// Configure Amplify
import Amplify from 'aws-amplify'
import awsconfig from '../src/aws-exports'
import Footer from '../components/Footer/Footer'

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
      <Footer />
    </>
  )
}

export default MyApp
