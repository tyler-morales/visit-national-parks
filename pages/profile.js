import {withSSRContext} from 'aws-amplify'
import {Auth} from 'aws-amplify'
import {useRouter} from 'next/router'
import Layout from '../components/Layout'

function Profile({username, email}) {

  return (
    <Layout>
      <h1 className="my-5 text-5xl font-bold text-green-800">Profile</h1>

      <h2>Welcome, {email}</h2>
    </Layout>
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
