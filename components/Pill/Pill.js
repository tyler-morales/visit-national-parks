import React from 'react'
import PropTypes from 'prop-types'

export const Pill = ({label, bgColor, textColor, emoji}) => {
  return (
    <button
      onClick={() => alert(label)}
      className="w-max py-2 px-4 rounded-md"
      style={{backgroundColor: bgColor, color: textColor}}>
      <span>
        {emoji && <span className="pr-4">{emoji}</span>}
        {label}
      </span>
    </button>
  )
}

Pill.propTypes = {
  label: PropTypes.string.isRequired,
  emoji: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
}

Pill.defaultProps = {
  label: 'Hello world!',
  emoji: null,
  bgColor: 'black',
  textColor: 'white',
  onClick: undefined,
}
