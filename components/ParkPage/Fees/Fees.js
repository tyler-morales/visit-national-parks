import {useState} from 'react'

const tabStyles = {
  active:
    'bg-orange-400 text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none',
  inActive:
    'text-orange-800 hover:shadow-md hover:shadow-orange-200 hover:border-2 hover:border-orange-700 hover:text-orange-800',
}

export default function Fees({title}) {
  const [tab, setTab] = useState('visited')

  return (
    <section className="col-span-2">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold text-green-800">{title}</h2>
        <div>
          <div className="flex gap-4">
            <button
              onClick={() => setTab('visited')}
              className={`transition-all text-base px-4 py-1 font-bold rounded-lg border-transparent border-2 ${
                tab == 'visited' ? tabStyles.active : tabStyles.inActive
              }`}>
              Visited
            </button>
            <button
              onClick={() => setTab('bookmark')}
              className={`transition-all text-base px-4 py-1 font-bold rounded-lg border-transparent border-2 ${
                tab == 'bookmark' ? tabStyles.active : tabStyles.inActive
              }`}>
              Want to Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
