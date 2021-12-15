import {Auth} from 'aws-amplify'
import {useState, useContext} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {Formik, Form, Field} from 'formik'
import {SignInWithGoogle} from '../components/GoogleSignIn/SignInWithGoogle'

import Input from '../components/Input/Input'

import {AiOutlineEyeInvisible} from 'react-icons/ai'
import {AiOutlineEye} from 'react-icons/ai'

import {Nav} from '../components/Nav/Nav'

// import {useUser} from '../contexts/UserContext'

import {SignInValues, SignInSchema} from '../formik/SignInValidation'

function Login() {
  const router = useRouter()
  //   const {login} = useUser

  const [signingIn, setSigningIn] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const toggle = () => {
    const passwordInput = document.getElementById('password')
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
      setSigningIn(true)
      //   await login(email, password)
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
      <Nav />
      <div className="flex flex-col justify-center w-11/12 py-6 m-auto mt-9 md:mt-10 md:max-w-md gap-9">
        <h1 className="mb-4 text-3xl font-bold text-green-800 md:text-left">
          Log in
        </h1>
        <SignInWithGoogle type="Log in" />

        <span className="text-center">Or Log in with Email & Password</span>
        <Formik
          validationSchema={SignInSchema}
          initialValues={SignInValues}
          onSubmit={signIn}>
          {({errors, touched}) => (
            <Form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-green-800" htmlFor="email">
                  Email
                </label>
                <Field
                  type="text"
                  name="email"
                  placeholder="theodore_roosevelt@gmail.com"
                  className="py-3 pl-3 transition-all border-2 border-gray-300 rounded-md ring-offset-[#f5f5ee] ring-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {serverError && (
                  <span className="text-error">{serverError}</span>
                )}
                {errors.email && touched.email ? (
                  <span className="text-sm text-error">{errors.email}</span>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="flex flex-row justify-between text-sm text-green-800"
                  htmlFor="password">
                  Password{' '}
                  <span className="text-green-800 font-body">
                    <Link href="/forgot-password">
                      <a className="ml-2 cursor-pointer text-quad ring-offset-[#f5f5ee] ring-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Forget your password?
                      </a>
                    </Link>
                  </span>
                </label>
                <div className="relative flex items-center w-full">
                  <Field
                    name="password"
                    type="password"
                    placeholder="iluvnature123"
                    id="password"
                    className="w-full py-3 pl-3 transition-all border-2 border-gray-300 rounded-md ring-offset-[#f5f5ee] ring-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="absolute p-1 transition-all cursor-pointer right-3">
                      <AiOutlineEyeInvisible size="1.5em" color="grey" />
                    </button>
                  )}
                </div>

                {errors.password && touched.password ? (
                  <span className="text-sm text-error">{errors.password}</span>
                ) : null}
              </div>
              <button
                type="submit"
                className={`transition-all transform hover:translate-y-1 rounded-md bg-green-800 text-white py-3 mt-6 cursor-pointer border-2 border-transparent ring-offset-[#f5f5ee] ring-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  signingIn ? 'opacity-50 cursor-wait' : 'opacity-100'
                }`}
                disabled={signingIn ? true : false}
                title="Log In">
                {signingIn ? 'Loading...' : 'Sign in'}
              </button>
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

export default Login
