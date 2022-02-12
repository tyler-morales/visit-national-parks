import {useState} from 'react'

export default function Alert({alerts}) {
  const [alertStatus, setAlertStatus] = useState(true)

  return (
    <>
      {alertStatus && (
        <div className="flex items-center justify-between px-4 py-2 mb-4 text-white bg-red-500 rounded-md ">
          <h2 className="flex items-between">
            <span className="font-bold">Alert: {alerts[0]?.title}</span> –{' '}
            <span className="whitespace-nowrap inline-block max-w-[90ch] overflow-hidden text-ellipsis">
              {alerts[0]?.description}
            </span>
          </h2>
          <button onClick={() => setAlertStatus(false)}>X</button>
        </div>
      )}
    </>
  )
}
