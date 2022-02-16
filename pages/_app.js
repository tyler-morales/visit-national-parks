import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import {Nav} from '../components/Nav/Nav'
import Head from 'next/head'

// Configure Amplify
import Amplify from 'aws-amplify'
import awsconfig from '../src/aws-exports'
import Footer from '../components/Footer/Footer'

Amplify.configure({...awsconfig, ssr: true})

// Context
import {QueryProvider} from '../contexts/QueryContext'

function MyApp({Component, pageProps}) {
  return (
    <>
      <QueryProvider>
        <Head>
          <title>Parkway | Home</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </QueryProvider>
    </>
  )
}

export default MyApp
