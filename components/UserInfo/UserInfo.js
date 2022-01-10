import {useState} from 'react'
import Avatar from 'boring-avatars'
import {Auth} from 'aws-amplify'

export default function UserInfo({username, email, name, bio, visitedSites}) {
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

  return (
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
            <h3 className="text-3xl font-bold text-green-800">{inputName}</h3>
            <span className="block mt-2 text-lg text-green-800">{email}</span>
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
          Sites Visited: <span>{visitedSites}/463</span>
        </span>
      </div>
    </section>
  )
}
