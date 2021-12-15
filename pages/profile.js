import {useState, useEffect} from 'react'
import {Auth} from 'aws-amplify'
import {useRouter} from 'next/router'
import '../configureAmplify'

import {Nav} from '../components/Nav/Nav'

function Profile() {
  const router = useRouter()
  const [session] = useSession()
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkUser()
    async function checkUser() {
      try {
        const user = await Auth.currentAuthenticatedUser()
        setUser(user)
      } catch (err) {
        setUser(null)
      }
    }w
  }, [])

  return (
    <div>
      <Nav />
      <h1>Profile</h1>

      <h2>Welcome, {user?.attributes.email}</h2>

      <button
        class="g_id_signout"
        onClick={() => {
          Auth.signOut()
          setUser(null)
          router.push('/')
        }}>
        Sign Out
      </button>
    </div>
  )
}
Profile.auth = true
export default Profile
