import {useState} from 'react'
import {Auth} from 'aws-amplify'
import {useRouter} from 'next/router'
import {Nav} from '../components/Nav/Nav'

import Link from 'next/link'
import {Formik, Form, Field} from 'formik'

import {serverErrorOptions} from '../Errors/serverErrorOptions'

import {
  ForgotPasswordValues,
  ForgotPasswordStepOneSchema,
  ForgotPasswordStepTwoSchema,
} from '../formik/ForgotPasswordValidation.js'

function ForgotPassword() {
  const router = useRouter()

  const [data, setData] = useState(ForgotPasswordValues)
  const [currentStep, setCurrentStep] = useState(0)

  const makeRequest = (formData) => {
    router.push('/signin')
  }

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({...prev, ...newData}))

    if (final) {
      makeRequest(newData)
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
      <Nav />
      <div className="flex flex-col justify-center w-11/12 pb-6 m-auto mt-9 md:max-w-4xl">
        {steps[currentStep]}
      </div>
    </>
  )
}

const StepOne = (props) => {
  const [signingIn, setSigningIn] = useState(false)
  const [serverError, setServerError] = useState()

  const handleSubmit = async ({username, password, email}) => {
    setSigningIn(true)
    try {
      await Auth.forgotPassword(username)
      props.next({username, password, email})
    } catch (err) {
      serverErrorOptions(err.code, setServerError)
      setSigningIn(false)

      console.error('error confirming account..', err)
    }
  }

  return (
    <div className="flex flex-col justify-center w-11/12 py-6 m-auto mt-9 md:mt-14 md:max-w-md">
      <section className="flex flex-col gap-4 md:w-full">
        <Formik
          validationSchema={ForgotPasswordStepOneSchema}
          initialValues={props.data}
          onSubmit={handleSubmit}>
          {({errors, touched}) => (
            <Form className="flex flex-col gap-4">
              <h1 className="mb-4 text-3xl font-bold text-green-800 md:text-left">
                Reset Password
              </h1>
              <div className="flex flex-col gap-3">
                <label className="text-sm text-green-800" htmlFor="username">
                  Email
                </label>
                <Field
                  name="username"
                  type="text"
                  className="py-3 pl-3 transition-all border-2 rounded-md focus-tertiary-ring"
                  placeholder="youremail@email.com"
                />

                {serverError && (
                  <span className="text-error">{serverError}</span>
                )}
                {errors.username && touched.username ? (
                  <span className="text-sm text-error">{errors.username}</span>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={signingIn ? true : false}
                className={`transition-all transform hover:translate-y-1 w-full rounded-md bg-green-800 text-white py-3 mt-6 cursor-pointer border-2 border-transparent focus-tertiary-ring ${
                  signingIn ? 'opacity-50 cursor-wait' : 'opacity-100'
                }`}>
                {signingIn ? 'Loading...' : 'Next'}
              </button>
            </Form>
          )}
        </Formik>

        {/* Already have an account */}
        <div className="mt-6">
          <p className="text-green-800 font-body">
            <span className="mr-2">Remembered your password?</span>
            <Link href="/login">
              <a className="cursor-pointer text-quad">Sign In</a>
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

const StepTwo = (props) => {
  const router = useRouter()

  const [signingIn, setSigningIn] = useState(false)
  const [serverError, setServerError] = useState(null)

  const handleSubmit = async ({username, confirmationCode, newPassword}) => {
    setSigningIn(true)
    console.log(username, confirmationCode, newPassword)
    try {
      await Auth.forgotPasswordSubmit(username, confirmationCode, newPassword)
      router.push('/signin')
    } catch (err) {
      setSigningIn(false)
      setServerError(err.message)
      console.error('error confirming account..', err)
    }
  }

  return (
    <section className="w-11/12 max-w-md m-auto">
      <Formik
        validationSchema={ForgotPasswordStepTwoSchema}
        initialValues={props.data}
        onSubmit={handleSubmit}>
        {({errors, touched}) => (
          <Form className="flex flex-col gap-2 md:w-full">
            <h1 className="text-3xl font-bold text-center text-green-800">
              Reset your Password
            </h1>
            <p className="mt-4 mb-8 text-sm text-center text-green-800 font-body">
              You were just emailed a validation code. Please enter it below to
              confrim you account
            </p>
            {/* Confirmation Code */}
            <div className="flex flex-col gap-4 mt-4">
              <label
                className="text-sm text-green-800"
                htmlFor="confirmationCode">
                Confirmation Code
              </label>
              <Field
                name="confirmationCode"
                type="text"
                className="py-3 pl-3 transition-all border-2 rounded-md"
                placeholder="123456"
              />
              {serverError && <span className="text-error">{serverError}</span>}
              {errors.confirmationCode && touched.confirmationCode ? (
                <span className="text-sm text-error">
                  {errors.confirmationCode}
                </span>
              ) : null}
            </div>
            {/* New password */}
            <div className="flex flex-col gap-4 mt-4">
              <label className="text-sm text-green-800" htmlFor="newPassword">
                New Password
              </label>
              <Field
                name="newPassword"
                type="text"
                className="py-3 pl-3 transition-all border-2 rounded-md"
                placeholder="qwerty123"
              />
              {serverError && <span className="text-error">{serverError}</span>}
              {errors.newPassword && touched.newPassword ? (
                <span className="text-sm text-error">{errors.newPassword}</span>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={signingIn ? true : false}
              className={`transition-all transform hover:translate-y-1 rounded-md bg-green-800 text-white py-3 mt-6 cursor-pointer border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent ${
                signingIn ? 'opacity-50 cursor-wait' : 'opacity-100'
              }`}>
              {signingIn ? 'Loading...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default ForgotPassword
