import * as Yup from 'yup'

// Formik initial values
const SignInValues = {
  email: '',
  password: '',
}

// Yup Schema
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email.')
    .min(8, `🚨 Too short: Must be at least 8 characters`)
    .max(50, '🚨 Too Long: Must be less than 50 characters')
    .required('🚨 Cannot be empty'),
  password: Yup.string()
    .min(8, `🚨 Too short: Must be at least 8 characters`)
    .required('🚨 Cannot be empty')
    .matches('(?=.*?[0-9]).+', '🚨 Must contain at least one number')
    .matches('(?=.*?[A-Za-z]).+', '🚨 Must contain at least one letter'),
})

export {SignInValues, SignInSchema}
