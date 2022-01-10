import {useState} from 'react'
import {Auth, API, withSSRContext} from 'aws-amplify'
import Layout from '../components/Layout'
import Avatar from 'boring-avatars'
import {RiDeleteBinLine} from 'react-icons/ri'
import {RiEdit2Line} from 'react-icons/ri'

import {listSites} from '../src/graphql/queries'

function Profile({username, email, name, bio, visitedSites, bookmarkedSites}) {
  const [editingUser, setEditingUser] = useState(false)
  const [inputName, setInputName] = useState(name)
  const [inputBio, setInputBio] = useState(bio)

  const updateUserInfo = async () => {
    setEditingUser(false)
    try {
      const user = await Auth.currentAuthenticatedUser()
      const attributes = {}
      if (inputName != name) attributes.name = inputName
      if (inputBio != bio) attributes['custom:bio'] = inputBio

      await Auth.updateUserAttributes(user, attributes)
    } catch (err) {
      console.error(`ERROR:${err}`)
    }
  }

  const VisitedSiteItems = ({site}) => {
    return (
      <tr className="w-full">
        <td data-th="Image" className="text-base font-thin text-left">
          <img
            src={site.img}
            alt={site.fullName}
            className="rounded-lg w-[150px] h-auto"
          />
        </td>
        <td
          data-th="Name"
          className="max-w-[150px] text-base font-thin text-left">
          <span className="text-lg font-bold text-green-800">{site.name}</span>
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
          <div className="flex flex-col gap-2">
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
        <section>
          <div className="relative flex items-center justify-center m-auto ">
            <Avatar
              size="100%"
              name={username}
              variant="marble"
              colors={['#85A29E', '#FFEBBF', '#F0D442', '#F59330', '#B22148']}
            />
            <span
              className="absolute font-bold text-white text-7xl"
              style={{textShadow: '#e4e3f8 1px 0 10px'}}>
              {inputName
                ? [...inputName][0].toUpperCase()
                : [...email][0].toUpperCase()}
            </span>
          </div>

          {/* User Info */}
          <div className="pb-6 mt-10 border-b-2 border-green-300">
            {!editingUser ? (
              <>
                <h3 className="text-3xl font-bold text-green-800">
                  {inputName}
                </h3>
                <span className="block mt-2 text-lg text-green-800">
                  {email}
                </span>
                <p className="mt-5 text-lg">{inputBio}</p>
                <button
                  onClick={() => setEditingUser(true)}
                  className="w-full py-1 m-auto mt-4 text-lg bg-orange-200 rounded-lg">
                  Edit
                </button>
              </>
            ) : (
              <div className="grid gap-5">
                <div>
                  <label className="block mb-2 text-xl font-bold text-green-800">
                    Name
                  </label>
                  <input
                    className="w-full py-2 pl-3 text-xl rounded-lg"
                    type="text"
                    value={inputName}
                    onInput={(e) => setInputName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-xl font-bold text-green-800">
                    Bio
                  </label>
                  <textarea
                    className="w-full px-3 py-2 text-xl rounded-lg"
                    type="text"
                    value={inputBio}
                    onInput={(e) => setInputBio(e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setEditingUser(false)}
                    className="w-full py-1 m-auto mt-4 text-lg text-white bg-red-400 rounded-lg">
                    Cancel
                  </button>
                  <button
                    onClick={updateUserInfo}
                    className="w-full py-1 m-auto mt-4 text-lg bg-green-400 rounded-lg">
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="pb-6 mt-6 border-b-2 border-green-300 ">
            <h3 className="mb-4 text-xl font-bold text-green-800">Stats</h3>
            <span className="block">
              Sites Visited: <span>{visitedSites.length}/463</span>
            </span>
            <span className="block">
              National Parks Visited: <span>7/63</span>
            </span>
          </div>
        </section>
        <section className="w-full col-span-3 border">
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

/*
type Site
  @model
  @auth(
    rules: [
      {allow: owner}
      {allow: public, operations: [create, read, update, delete]}
      {allow: private, operations: [create, read, update, delete]}
    ]
  ) {
  id: ID!
  code: String!
  owner: String!
  visited: Boolean
  bookmarked: Boolean
  name: String
  img: String
  rating: String
  avgRating: String
  dateVisited: String
}

*/
