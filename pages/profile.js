import {useState} from 'react'
import {withSSRContext} from 'aws-amplify'
import {Auth} from 'aws-amplify'
import Layout from '../components/Layout'
import Avatar from 'boring-avatars'

// import {listSites} from '../src/graphql/queries'

function Profile({username, email, name}) {
  const [editingUser, setEditingUser] = useState(false)
  const [inputName, setInputName] = useState(name)
  const [inputBio, setInputBio] = useState('')

  const handleEditName = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()

      let result = await Auth.updateUserAttributes(user, {
        name: inputName,
      })
    } catch (err) {
      console.error(`ERROR:${err}`)
    }
  }

  const submitUserChanges = () => {
    setEditingUser(false)
    handleEditName()
    return null
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
            {!editingUser ? (
              <>
                <h3 className="text-3xl font-bold text-green-800">
                  {inputName}
                </h3>
                <span className="block mt-2 text-xl text-green-800">
                  {email}
                </span>
                <p className="mt-5">{inputBio}</p>
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
                    className="w-full py-2 pl-3 text-xl rounded-lg"
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
                    onClick={submitUserChanges}
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
