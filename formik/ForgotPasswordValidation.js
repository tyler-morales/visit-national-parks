import * as Yup from 'yup'

// Formik initial values
const ForgotPasswordValues = {
  username: '',
  confirmationCode: '',
  newPassword: '',
}

// Yup Schema
const ForgotPasswordStepOneSchema = Yup.object().shape({
  username: Yup.string()
    .min(8, `🚨 Too short: Must be at least 8 characters`)
    .max(100, '🚨 Too Long: Must be less than 20 characters')
    .required('🚨 Required'),
})

const ForgotPasswordStepTwoSchema = Yup.object().shape({
  confirmationCode: Yup.string()
    .length(6, 'Code is only 6 numbers')
    .required('🚨 Required'),
  newPassword: Yup.string()
    .min(8, `🚨 Too short: Must be at least 8 characters`)
    .required('🚨 Required')
    .matches('(?=.*?[0-9]).+', '🚨 Must contain at least one number')
    .matches('(?=.*?[A-Za-z]).+', '🚨 Must contain at least one letter'),
})

export {
  ForgotPasswordValues,
  ForgotPasswordStepOneSchema,
  ForgotPasswordStepTwoSchema,
}
