import * as Yup from 'yup'

// Formik initial values
const SignUpValues = {
  username: '',
  password: '',
  confirmationCode: '',
}

// Yup Schema
const SignUpStepOneSchema = Yup.object().shape({
  username: Yup.string().email('🚨 Invalid email').required('🚨 Required'),
  password: Yup.string()
    .min(8, `🚨 Too short: Must be at least 8 characters`)
    .required('🚨 Required')
    .matches('(?=.*?[0-9]).+', '🚨 Must contain at least one number')
    .matches('(?=.*?[A-Za-z]).+', '🚨 Must contain at least one letter'),
})

const SignUpStepTwoSchema = Yup.object().shape({
  confirmationCode: Yup.string()
    .length(6, `🚨 Must be exactly 6 numbers`)
    .required('🚨 Required'),
})

export {SignUpValues, SignUpStepOneSchema, SignUpStepTwoSchema}
