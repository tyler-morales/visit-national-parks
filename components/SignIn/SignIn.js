import {Auth} from 'aws-amplify'
import Input from '../Input/Input'

export default function SignIn({onChange, signIn, setUiState}) {
  return (
    <div>
      <h3>Sign in to Your Account</h3>
      <button onClick={() => Auth.federatedSignIn({provider: 'Google'})}>
        Sign in With Google
      </button>
      <form>
        <div>
          <label>Email</label>
          <Input onChange={onChange} name="email" />
        </div>
        <div>
          <label>Password</label>
          <Input onChange={onChange} name="password" type="password" />
        </div>
        <button onClick={signIn}>Sign In</button>
      </form>

      <p>
        Don't have an account{' '}
        <button onClick={() => setUiState('signUp')}>Sign Up</button>{' '}
      </p>

      <p>
        Forgot your Password?{' '}
        <button onClick={() => setUiState('forgotPassword')}>Reset it.</button>{' '}
      </p>
    </div>
  )
}
