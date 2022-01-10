import {useState} from 'react'
import {Auth, API, withSSRContext} from 'aws-amplify'
import Layout from '../components/Layout'
import {RiDeleteBinLine} from 'react-icons/ri'
import {RiEdit2Line} from 'react-icons/ri'

import Link from 'next/link'

import {listSites} from '../src/graphql/queries'
import UserInfo from '../components/UserInfo/UserInfo'

function Profile({username, email, name, bio, visitedSites, bookmarkedSites}) {
  const VisitedSiteItems = ({site}) => {
    return (
      <tr className="w-full">
        <td data-th="Image" className="text-base font-thin text-left">
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
        <td
          data-th="Name"
          className="max-w-[150px] text-base font-thin text-left">
          <Link href={`/park/${site.code}`}>
            <a>
              <span className="text-lg font-bold text-green-800 hover:underline hover:underline-offset-4 hover:decoration-wavy">
                {site.name}
              </span>
            </a>
          </Link>
        </td>
        <td data-th="Name" className="text-base font-thin text-left ">
          <span className="text-lg font-bold text-green-800">N/A</span>
        </td>
        <td data-th="Name" className="text-base font-thin text-left ">
          <span className="text-lg font-bold text-green-800">N/A</span>
        </td>
        <td data-th="Name" className="text-base font-thin text-left ">
          <span className="text-lg font-bold text-green-800">N/A</span>
        </td>
        <td data-th="Name" className="text-base font-thin text-left ">
          <span className="text-lg font-bold text-green-800">N/A</span>
        </td>
        <td data-th="Settings" className="text-base font-thin text-left">
          <div className="flex flex-col gap-2 text-gray-700">
            <button className="flex items-center w-full gap-2 items-between text-small">
              <RiEdit2Line size="1.25em" />
              <span>Edit</span>
            </button>
            <button className="flex items-center w-full gap-2 items-between text-small">
              <RiDeleteBinLine size="1.25em" />
              <span>Delete</span>
            </button>
          </div>
        </td>
      </tr>
    )
  }
  const visitedSiteItems = visitedSites.map((site, index) => (
    <VisitedSiteItems key={index} site={site} />
  ))

  const VisitedTable = () => {
    return (
      <table
        className="w-full mt-12 border-separate"
        style={{borderSpacing: '15px'}}>
        <tbody>
          <tr className="w-full">
            <th className="text-sm font-thin text-left text-green-800 uppercase ">
              Image
            </th>
            <th className="text-sm font-thin text-left text-green-800 uppercase ">
              Name
            </th>
            <th className="text-sm font-thin text-left text-green-800 uppercase ">
              Avg. Rating
            </th>
            <th className="text-sm font-thin text-left text-green-800 uppercase ">
              Your Rating
            </th>
            <th className="text-sm font-thin text-left text-green-800 uppercase ">
              List
            </th>
            <th className="text-sm font-thin text-left text-green-800 uppercase ">
              Visited
            </th>
            <th className="text-sm font-thin text-left text-green-800 uppercase ">
              Settings
            </th>
          </tr>
          {visitedSiteItems}
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
            <button className="px-4 py-2 text-2xl font-bold bg-orange-200 rounded-lg">
              Visited
            </button>
            <button className="px-4 py-2 text-2xl font-bold bg-orange-200 rounded-lg">
              Want to Visit
            </button>
          </div>
          {/* TABLE */}
          <VisitedTable />
        </section>
      </main>
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
