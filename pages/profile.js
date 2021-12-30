import {withSSRContext} from 'aws-amplify'
import {Auth} from 'aws-amplify'
import {useRouter} from 'next/router'

function Profile({username, email}) {
  const router = useRouter()

  return (
    <div>
      <h1>Profile</h1>

      <h2>Welcome, {username}</h2>
      <p>Email: {email}</p>

      <button
        onClick={() => {
          Auth.signOut()
          router.push('/')
        }}>
        Sign Out
      </button>
    </div>
  )
}

export async function getServerSideProps({req, res}) {
  const {Auth} = withSSRContext({req})
  try {
    const user = await Auth.currentAuthenticatedUser()
    return {
      props: {
        authenticated: true,
        username: user.username,
        email: user.attributes.email,
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
