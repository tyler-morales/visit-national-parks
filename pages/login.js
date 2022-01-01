import {withSSRContext} from 'aws-amplify'
import {Auth} from 'aws-amplify'
import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {Formik, Form, Field} from 'formik'
import {SignInWithGoogle} from '../components/GoogleSignIn/SignInWithGoogle'

import {AiOutlineEyeInvisible} from 'react-icons/ai'
import {AiOutlineEye} from 'react-icons/ai'

import {SignInValues, SignInSchema} from '../formik/SignInValidation'
import Label from '../components/Forms/Label/Label'
import Button from '../components/Button/Button'

function Login() {
  const router = useRouter()

  const [signingIn, setSigningIn] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const toggle = () => {
    const passwordInput = document.getElementById('password')
    console.log(passwordInput)
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text'
      setIsPasswordVisible(true)
    } else {
      passwordInput.type = 'password'
      setIsPasswordVisible(false)
    }
  }

  const signIn = async ({email, password}) => {
    try {
      console.log('Signing in')
      console.log(email, password)
      setSigningIn(true)
      await Auth.signIn(email, password)

      router.push('/')
    } catch (err) {
      setServerError(err.message)
      console.error('error signing in..', err)
    }
    setSigningIn(false)
  }

  return (
    <>
      <div className="flex flex-col justify-center w-11/12 py-6 m-auto mt-9 md:mt-10 md:max-w-md gap-9">
        <h1 className="text-3xl font-bold text-green-800 md:text-left">
          Log in
        </h1>
        <SignInWithGoogle type="Log in" />

        <div className="flex items-center">
          <div className="flex-grow bg bg-gray-300 h-0.5"></div>
          <div className="flex-grow-0 mx-5 text-gray-300 text">or</div>
          <div className="flex-grow bg bg-gray-300 h-0.5"></div>
        </div>

        <Formik
          validationSchema={SignInSchema}
          initialValues={SignInValues}
          onSubmit={signIn}>
          {({errors, touched}) => (
            <Form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label title="Email" name="email" />
                <Field
                  className="py-3 pl-3 transition-all w-full border-2 border-gray-300 rounded-md ring-offset-[#f5f5ee] ring-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="email"
                  placeholder="theodore_roosevelt@gmail.com"
                  dataId="email"
                  data-cy="email"
                />
                {serverError && (
                  <span className="text-red-700" data-cy="login-server-error">
                    {serverError}
                  </span>
                )}
                {errors.email && touched.email ? (
                  <span className="text-sm text-error" data-cy="email-error">
                    {errors.email}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <Label title="Password" name="password" />
                  <span className="text-sm text-green-800 font-body">
                    <Link href="/forgot-password">
                      <a className="ml-2 cursor-pointer text-quad ring-offset-[#f5f5ee] ring-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Forget your password?
                      </a>
                    </Link>
                  </span>
                </div>
                <div className="relative flex items-center w-full">
                  <Field
                    className="py-3 pl-3 transition-all w-full border-2 border-gray-300 rounded-md ring-offset-[#f5f5ee] ring-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="iluvnature123"
                    dataId="password"
                    data-cy="password"
                  />
                  {isPasswordVisible ? (
                    <button
                      type="button"
                      onClick={toggle}
                      className="absolute p-1 transition-all cursor-pointer right-3">
                      <AiOutlineEye size="1.5em" color="grey" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={toggle}
                      data-cy="password-toggle"
                      className="absolute p-1 transition-all cursor-pointer right-3">
                      <AiOutlineEyeInvisible size="1.5em" color="grey" />
                    </button>
                  )}
                </div>

                {errors.password && touched.password ? (
                  <span className="text-sm text-error" data-cy="password-error">
                    {errors.password}
                  </span>
                ) : null}
              </div>
              <Button
                title="Sign in"
                type="submit"
                dataId="submit-login"
                state={signingIn}
              />
            </Form>
          )}
        </Formik>

        <div className="mt-6">
          <p className="text-green-800 font-body">
            Don't have an Account?
            <Link href="/signup">
              <a className="ml-2 cursor-pointer text-quad ring-offset-[#f5f5ee] ring-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Sign Up
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({req, res}) {
  const {Auth} = withSSRContext({req})
  try {
    const user = await Auth.currentAuthenticatedUser()
    console.log(user)
    if (user) {
      return {
        redirect: {
          destination: '/profile',
          statusCode: 302,
        },
      }
    }
  } catch (err) {
    console.error(err)
    return {props: {}}
  }
}

export default Login
