import {Auth} from 'aws-amplify'
import {FcGoogle} from 'react-icons/fc'

// To federated sign in from Google
export const SignInWithGoogle = ({type}) => {
  return (
    <button
      onClick={() => Auth.federatedSignIn({provider: 'Google'})}
      className="flex flex-row justify-center w-full py-3 bg-white border-2 border-gray-400 rounded-lg ring-offset-[#f5f5ee] ring-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <span className="flex flex-row items-center gap-4 px-4 text-gray-700 ">
        <FcGoogle size="2em" />
        {type} with Google
      </span>
    </button>
  )
}
