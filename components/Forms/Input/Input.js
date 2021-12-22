import React from 'react'
import {Field} from 'formik'

export default function Input({type, name, placeholder, dataId}) {
  return (
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      data-cy={dataId}
      className="py-3 pl-3 transition-all w-full border-2 border-gray-300 rounded-md ring-offset-[#f5f5ee] ring-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}
