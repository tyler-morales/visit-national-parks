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
      <Head>
        <title>Parway | Discover the Outdoors of America</title>

        {/* Misc */}
        <meta name="twitter:card" content="summary" />
        {/* <meta property="og:url" content="https://tylermorales.dev /" /> */}
        {/* <meta
          property="og:image"
          content="https://raw.githubusercontent.com/tyler-morales/portfolio-v5/main/public/images/og.png"
        /> */}
        <meta property="og:type" content="website" />
        {/* Favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <QueryProvider>
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </QueryProvider>
    </>
  )
}

export default MyApp
