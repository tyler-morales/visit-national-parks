import {withSSRContext} from 'aws-amplify'
import {Auth} from 'aws-amplify'
import Layout from '../components/Layout'
import Avatar from 'boring-avatars'

import {listSites} from '../src/graphql/queries'

function Profile({username, email, name}) {
  const handleEditName = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()

      let result = await Auth.updateUserAttributes(user, {
        name: 'Tyler Morales',
      })

      const {attributes} = user
      console.log(attributes, result)
    } catch (err) {
      console.error(`ERROR:${err}`)
    }
  }
  return (
    <Layout>
      <h1 className="my-5 text-3xl font-bold text-green-800">Profile</h1>

      <section className="grid grid-cols-4 mt-20 gap-14 font-display">
        <div className="">
          <div className="relative flex items-center justify-center m-auto ">
            <Avatar
              size="100%"
              name={name}
              variant="marble"
              colors={['#85A29E', '#FFEBBF', '#F0D442', '#F59330', '#B22148']}
            />
            <span
              className="absolute font-bold text-white text-7xl"
              style={{textShadow: '#e4e3f8 1px 0 10px'}}>
              {[...name][0].toUpperCase()}
            </span>
          </div>

          {/* User Info */}
          <div className="pb-6 mt-10 border-b-2 border-green-300">
            <h3 className="text-3xl font-bold text-green-800">{name}</h3>
            <span className="block mt-2 text-xl text-green-800">{email}</span>
            <p className="mt-5">Digital nomad</p>
            <button
              onClick={handleEditName}
              className="w-full py-1 m-auto mt-4 text-lg bg-orange-200 rounded-lg">
              Edit
            </button>
          </div>

          {/* Stats */}
          <div className="pb-6 mt-6 border-b-2 border-green-300 ">
            <h3 className="mb-4 text-xl font-bold text-green-800">Stats</h3>
            <span className="block">
              Sites Visited: <span>14/463</span>
            </span>
            <span className="block">
              National Parks Visited: <span>73/63</span>
            </span>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps({req, res}) {
  const {Auth} = withSSRContext({req})

  try {
    const user = await Auth.currentAuthenticatedUser()
    const {attributes} = user
    console.log(attributes)

    return {
      props: {
        authenticated: true,
        username: user.username,
        email: user.attributes.email,
        name: user.attributes.name,
      },
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        statusCode: 302,
      },
    }
  }
}
export default Profile
