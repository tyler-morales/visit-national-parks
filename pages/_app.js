import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import {Nav} from '../components/Nav/Nav'

import Amplify from 'aws-amplify'
import awsconfig from '../aws-exports'

Amplify.configure({...awsconfig, ssr: true})

function MyApp({Component, pageProps}) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
