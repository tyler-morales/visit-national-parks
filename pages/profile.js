import {useState, useEffect} from 'react'
import {API, withSSRContext} from 'aws-amplify'
import Layout from '../components/Layout'
import {RiDeleteBinLine} from 'react-icons/ri'
import {RiEdit2Line} from 'react-icons/ri'
import {ToastContainer, toast} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import Link from 'next/link'

import {listSites} from '../src/graphql/queries'
import {deleteSite} from '../src/graphql/mutations'

import UserInfo from '../components/UserInfo/UserInfo'

const tabStyles = {
  active:
    'bg-green-600 text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none',
  inActive:
    'text-green-800 hover:shadow-md hover:shadow-green-200 hover:border-2 hover:border-green-700 hover:text-green-800',
}

function Profile({username, email, name, bio, visitedSites, bookmarkedSites}) {
  const [tab, setTab] = useState('visited')
  const [currentVisitedSites, setVisitedSites] = useState(visitedSites)
  const [currentBookmarkedSites, setBookmarkedSites] = useState(bookmarkedSites)
  const [sortDir, setSortDir] = useState('ASC')

  const sort = () => {
    if (sortDir == 'ASC') {
      setSortDir('DEC')
      currentVisitedSites = currentVisitedSites.sort((a, b) => a.name > b.name)
      currentBookmarkedSites = currentBookmarkedSites.sort(
        (a, b) => a.name > b.name
      )
    } else {
      setSortDir('ASC')
      currentVisitedSites = currentVisitedSites.sort((a, b) => a.name < b.name)
      currentBookmarkedSites = currentBookmarkedSites.sort(
        (a, b) => a.name < b.name
      )
    }
  }

  const removeSite = async ({id, name}) => {
    try {
      // Delete site from database
      API.graphql({query: deleteSite, variables: {input: {id}}})

      // Filter site from local state
      let collection =
        tab == 'visited' ? currentVisitedSites : currentBookmarkedSites

      let newSites = collection.filter((item) => item.id != id)

      tab == 'visited'
        ? setVisitedSites(newSites)
        : setBookmarkedSites(newSites)

      toast(`${name} removed`)
    } catch (err) {
      console.error(err)
    }
  }

  const VisitedSiteItems = ({site, num}) => {
    return (
      <tr className="w-full">
        <td data-th="Image" className="text-left ">
          <Link href={`/park/${site.code}`}>
            <a>
              <img
                src={site.img}
                alt={site.fullName}
                className="rounded-lg w-[150px] h-[100px] object-cover"
              />
            </a>
          </Link>
        </td>
        <td data-th="Name" className="max-w-[150px] text-left">
          <Link href={`/park/${site.code}`}>
            <a>
              <span className="text-lg font-bold text-green-800 hover:underline hover:underline-offset-4 hover:decoration-wavy">
                {site.name}
              </span>
            </a>
          </Link>
        </td>
        <td data-th="Average-rating" className="text-left ">
          <span className="text-lg font-bold text-green-800">3.8</span>
        </td>
        {tab == 'visited' && (
          <td data-th="Your-rating" className="text-left ">
            <span className="text-lg font-bold text-green-800">4.5</span>
          </td>
        )}

        <td data-th="list" className="text-left ">
          <span className="text-green-800 text-md">2017 Grand Canyon Trip</span>
        </td>
        {tab == 'visited' && (
          <td data-th="visited" className="text-left">
            <span className="text-lg text-green-800">6/2017</span>
          </td>
        )}

        <td data-th="Settings" className="text-left ">
          <div className="flex flex-col gap-2 text-gray-700">
            <button className="flex items-center w-full gap-2 items-between text-small">
              <RiEdit2Line size="1.25em" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => removeSite(site, num)}
              className="flex items-center w-full gap-2 items-between text-small">
              <RiDeleteBinLine size="1.25em" />
              <span>Delete</span>
            </button>
          </div>
        </td>
      </tr>
    )
  }

  const VisitedTable = ({data}) => {
    return (
      <table
        id="table"
        className="w-full mt-12 border-separate"
        style={{borderSpacing: '15px'}}>
        <tbody>
          <tr onClick={sort} className="w-full">
            <th className="text-sm font-thin text-left text-green-800 uppercase">
              Image
            </th>
            <th className="text-sm font-thin text-left text-green-800 uppercase cursor-pointer">
              <span>Name {sortDir == 'ASC' ? '🔼' : '🔽'}</span>
            </th>
            <th className="text-sm font-thin text-left text-green-800 uppercase">
              Avg. Rating
            </th>
            {tab == 'visited' && (
              <th className="text-sm font-thin text-left text-green-800 uppercase">
                Your Rating
              </th>
            )}
            <th className="text-sm font-thin text-left text-green-800 uppercase">
              List
            </th>
            {tab == 'visited' && (
              <th className="text-sm font-thin text-left text-green-800 uppercase">
                Visited
              </th>
            )}

            <th className="text-sm font-thin text-left text-green-800 uppercase">
              Settings
            </th>
          </tr>
          {data?.map((site, index) => (
            <VisitedSiteItems key={index} site={site} num={index} />
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <Layout>
      <h1 className="my-5 text-3xl font-bold text-green-800">Profile</h1>

      <main className="grid grid-cols-4 gap-20 mt-20 font-display">
        <UserInfo
          username={username}
          email={email}
          name={name}
          bio={bio}
          visitedSites={visitedSites.length}
        />
        <section className="w-full col-span-3">
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
          <VisitedTable
            data={
              tab == 'visited' ? currentVisitedSites : currentBookmarkedSites
            }
          />
        </section>
      </main>
      <ToastContainer />
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
