import {withSSRContext} from 'aws-amplify'
import {useState, useEffect} from 'react'
import {Auth} from 'aws-amplify'
import {useRouter} from 'next/router'

import Link from 'next/link'
import {Formik, Form, Field, useFormikContext} from 'formik'

import {serverErrorOptions} from '../Errors/serverErrorOptions'

import {
  SignUpValues,
  SignUpStepOneSchema,
  SignUpStepTwoSchema,
} from '../formik/SignUpValidation.js'

import {AiOutlineEyeInvisible} from 'react-icons/ai'
import {AiOutlineEye} from 'react-icons/ai'
import {SignInWithGoogle} from '../components/GoogleSignIn/SignInWithGoogle'
import Button from '../components/Button/Button'
import Input from '../components/Forms/Input/Input'

function SignUp() {
  const router = useRouter()

  const [data, setData] = useState(SignUpValues)
  const [currentStep, setCurrentStep] = useState(0)

  console.log(data?.username, data?.password)

  const handleNextStep = async (newData, final = false) => {
    setData((prev) => ({...prev, ...newData}))

    // redirect to login, recgonize user is authenticated and send them to their profile
    if (final) {
      try {
        console.log('5. Move to profile if there')
        router.push('/login')
        // await Auth.signIn(data?.username, data?.password)
        console.log('6. Finish')
      } catch (err) {
        console.error('7.', err)
      }
      return
    }

    setCurrentStep((prev) => prev + 1)
  }

  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} data={data} />,
  ]

  return (
    <>
      <div className="flex flex-col justify-center w-11/12 py-6 m-auto mt-9 md:mt-10 md:max-w-md gap-9">
        {steps[currentStep]}
      </div>
    </>
  )
}

const StepOne = (props) => {
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

  const handleSubmit = async ({username, password}) => {
    console.log('First step')
    setSigningIn(true)
    try {
      await Auth.signUp({username, password})
      props.next({username, password})
    } catch (err) {
      serverErrorOptions(err.code, setServerError)
      setSigningIn(false)

      console.error('error confirming account..', err)
    }
  }

  return (
    <div className="flex flex-col gap-10 md:flex-row-reverse">
      <section className="flex flex-col gap-9 md:w-full">
        <Formik
          validationSchema={SignUpStepOneSchema}
          initialValues={props.data}
          onSubmit={handleSubmit}>
          {({errors, touched}) => (
            <Form className="flex flex-col gap-4">
              <h1 className="mb-4 text-3xl font-bold text-green-800 md:text-left">
                Create an Account
              </h1>

              <SignInWithGoogle type="Sign up" />

              <div className="flex items-center my-6">
                <div className="flex-grow bg bg-gray-300 h-0.5"></div>
                <div className="flex-grow-0 mx-5 text-gray-300 text">or</div>
                <div className="flex-grow bg bg-gray-300 h-0.5"></div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-sm text-green-800" htmlFor="username">
                  Email
                </label>
                <Input
                  type="email"
                  name="username"
                  placeholder="theodore_roosevelt@gmail.com"
                />
                {errors.username && touched.username ? (
                  <span className="text-sm text-error">{errors.username}</span>
                ) : null}
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-sm text-green-800" htmlFor="password">
                  Password
                </label>
                <div className="relative flex items-center w-full">
                  <Field
                    name="password"
                    type="password"
                    placeholder="password"
                    id="password"
                    className="w-full py-3 pl-3 transition-all border-2 rounded-md ring-offset-[#f5f5ee] ring-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              {serverError && <span className="text-error">{serverError}</span>}
              <Button title="Next" type="submit" state={signingIn} />
            </Form>
          )}
        </Formik>

        {/* Already have an account */}
        <div className="mt-6">
          <p className="text-green-800">
            <span className="mr-2">Already have an account?</span>
            <Link href="/login">
              <a className="cursor-pointer text-quad ring-offset-[#f5f5ee] ring-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Log In
              </a>
            </Link>
          </p>
        </div>
      </section>

      {/* Marketing Section */}
    </div>
  )
}

const StepTwo = (props) => {
  console.log('1. Second step')
  // console.log(props?.data.username, props?.data.password)
  const [signingIn, setSigningIn] = useState(false)
  const [serverError, setServerError] = useState(null)

  const AutoSubmitToken = () => {
    // Grab values and submitForm from context
    const {values, submitForm} = useFormikContext()
    useEffect(() => {
      // Submit the form imperatively as an effect as soon as form values. confirmationCode is 6 digits long
      if (values.confirmationCode.length === 6) {
        submitForm()
      }
    }, [values, submitForm])
    return null
  }

  const handleSubmit = async ({username, confirmationCode}) => {
    console.log('2. Trying to log in')
    setSigningIn(true)
    try {
      console.log('3. AWS logging in')
      await Auth.confirmSignUp(username, confirmationCode)
      console.log('4. Account confirmed')
      props.next(username, true)
    } catch (err) {
      setSigningIn(false)
      setServerError(err.message)
      console.error('Error confirming account..', err)
    }
  }

  return (
    <section className="w-11/12 max-w-md m-auto">
      <Formik
        validationSchema={SignUpStepTwoSchema}
        initialValues={props.data}
        onSubmit={handleSubmit}>
        {({errors, touched}) => (
          <Form className="flex flex-col gap-2 md:w-full">
            <h1 className="text-3xl font-bold text-center text-green-800">
              Enter your Validation Code
            </h1>
            <p className="mt-4 mb-8 text-center text-green-800 text-md">
              You were just emailed a validation code. Please enter it below to
              confrim you account
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <label
                className="text-sm text-green-800"
                htmlFor="confirmationCode">
                Authentication Code
              </label>
              <Field
                name="confirmationCode"
                type="text"
                className="py-3 pl-3 transition-all border-2 rounded-md ring-offset-[#f5f5ee] ring-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123456"
              />
              <AutoSubmitToken />
              {serverError && <span className="text-error">{serverError}</span>}
              {errors.confirmationCode && touched.confirmationCode ? (
                <span className="text-sm text-error">
                  {errors.confirmationCode}
                </span>
              ) : null}
            </div>
            <Button title="Submit" type="submit" state={signingIn} />
          </Form>
        )}
      </Formik>
    </section>
  )
}

export async function getServerSideProps({req, res}) {
  const {Auth} = withSSRContext({req})
  try {
    const user = await Auth.currentAuthenticatedUser()
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

export default SignUp
