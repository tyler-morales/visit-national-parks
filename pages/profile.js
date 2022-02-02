import {useState, useEffect} from 'react'
import {API, withSSRContext} from 'aws-amplify'
import Layout from '../components/Layout'

import {listSites} from '../src/graphql/queries'

import UserInfo from '../components/UserInfo/UserInfo'
import SiteTable from '../components/SiteTable/SiteTable'

const tabStyles = {
  active:
    'bg-green-600 text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none',
  inActive:
    'text-green-800 hover:shadow-md hover:shadow-green-200 hover:border-2 hover:border-green-700 hover:text-green-800',
}

function Profile({username, email, name, bio, visitedSites, bookmarkedSites}) {
  const [tab, setTab] = useState('visited')

  return (
    <Layout>
      <h1 className="my-5 text-3xl font-bold text-green-800">Profile</h1>

      <div className="grid grid-cols-1 gap-20 mt-20 md:grid-cols-4 font-display">
        <UserInfo
          username={username}
          email={email}
          name={name}
          bio={bio}
          visitedSites={visitedSites.length}
        />
        <section className="w-full md:col-span-3">
          <div className="flex gap-8">
            <button
              onClick={() => setTab('visited')}
              className={`transition-all px-4 py-2 text-2xl font-bold rounded-lg border-transparent border-2 ${
                tab == 'visited' ? tabStyles.active : tabStyles.inActive
              }`}>
              Visited
            </button>
            <button
              onClick={() => setTab('bookmark')}
              className={`transition-all px-4 py-2 text-2xl font-bold rounded-lg border-transparent border-2 ${
                tab == 'bookmark' ? tabStyles.active : tabStyles.inActive
              }`}>
              Want to Visit
            </button>
          </div>
          {/* TABLE */}
          <SiteTable
            visitedSites={visitedSites}
            bookmarkedSites={bookmarkedSites}
            tab={tab}
          />
        </section>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({req, res}) {
  const {Auth} = withSSRContext({req})
  const SSR = withSSRContext({req})

  try {
    const user = await Auth.currentAuthenticatedUser()

    const visited = await SSR.API.graphql({
      query: listSites,
      variables: {
        filter: {
          visited: {eq: true},
          owner: {eq: user?.username},
        },
      },
    })

    const bookmarked = await SSR.API.graphql({
      query: listSites,
      variables: {
        filter: {
          bookmarked: {eq: true},
          owner: {eq: user?.username},
        },
      },
    })

    // console.log(data)
    // const {attributes} = user
    // console.log('********************************')
    // console.log(attributes)

    return {
      props: {
        authenticated: true,
        username: user.username || null,
        email: user.attributes.email || null,
        name: user.attributes.name || null,
        bio: user.attributes['custom:bio'] || null,
        visitedSites: visited.data.listSites.items,
        bookmarkedSites: bookmarked.data.listSites.items,
      },
    }
  } catch (err) {
    console.error(err)
    return {
      redirect: {
        destination: '/login',
        statusCode: 302,
      },
    }
  }
}
export default Profile
