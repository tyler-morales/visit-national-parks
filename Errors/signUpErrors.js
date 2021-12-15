export const signUpErrors = ({errors, touched, type}) => {
  let responses = {
    email: 'Please select at least two players',
    password: 'Please select at least one winner',
  }

  return errors[type] && touched[type] ? (
    <div className="text-sm text-error">🚨 {responses[type]}</div>
  ) : null
}
