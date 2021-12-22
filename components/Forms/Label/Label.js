import React from 'react'
// import PropTypes from 'prop-types'

export default function Label({title, name}) {
  return (
    <label className="text-sm text-green-800" htmlFor={name}>
      {title}
    </label>
  )
}

// Pill.propTypes = {
//   title: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
// }

// Pill.defaultProps = {
//   title: 'Email',
//   name: 'email',
// }
