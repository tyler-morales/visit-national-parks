import React from 'react'

export default function Button({title, type, dataId, state = null}) {
  return (
    <button
      type={type}
      className={`transition-all transform hover:translate-y-1 rounded-md bg-green-800 text-white py-3 mt-6 cursor-pointer border-2 border-transparent ring-offset-[#f5f5ee] ring-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        state ? 'opacity-50 cursor-wait' : 'opacity-100'
      }`}
      disabled={state ? true : false}
      data-cy={dataId}>
      {state ? 'Loading...' : `${title}`}
    </button>
  )
}
