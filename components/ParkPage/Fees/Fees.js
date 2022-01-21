import {useState} from 'react'

const tabStyles = {
  active:
    'bg-orange-400 text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none',
  inActive:
    'text-orange-800 hover:shadow-md hover:shadow-orange-200 hover:border-2 hover:border-orange-700 hover:text-orange-800',
}

export default function Fees({entranceFees, entrancePasses, title}) {
  const [tab, setTab] = useState('fees')

  function Fees() {
    return (
      <ul>
        {entranceFees?.map((fee, index) => (
          <li key={index} className="mt-2">
            <span className="font-bold">{fee.title}: &nbsp;</span>
            <span className="font-bold">{fee.cost}</span>
            <p className="mt-2">{fee.description}</p>
            <hr className="my-4 border-gray-400" />
          </li>
        ))}
      </ul>
    )
  }

  function Passes() {
    return (
      <ul>
        {entrancePasses?.map((pass, index) => (
          <li key={index} className="mt-2">
            <span className="font-bold">{pass.title}: &nbsp;</span>
            <span className="font-bold">{pass.cost}</span>
            <p className="mt-2">{pass.description}</p>
            <hr className="my-4 border-gray-400" />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section className="col-span-2">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold text-green-800">{title}</h2>
        {/* Buttons */}
        <div>
          <div className="flex gap-4">
            <button
              onClick={() => setTab('fees')}
              className={`transition-all text-base px-4 py-1 font-bold rounded-lg border-transparent border-2 ${
                tab == 'fees' ? tabStyles.active : tabStyles.inActive
              }`}>
              Fees
            </button>
            <button
              onClick={() => setTab('passes')}
              className={`transition-all text-base px-4 py-1 font-bold rounded-lg border-transparent border-2 ${
                tab == 'bookmark' ? tabStyles.active : tabStyles.inActive
              }`}>
              Passes
            </button>
          </div>
        </div>
      </div>
      {/* Feeds and Passes */}
      <div className="mt-4">{tab == 'fees' ? <Fees /> : <Passes />}</div>
    </section>
  )
}
