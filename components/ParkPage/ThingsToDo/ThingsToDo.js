import {useState, useEffect} from 'react'
import Image from 'next/image'
import {MdPets, MdOutlineAccessTimeFilled} from 'react-icons/md'
import {BsFillPeopleFill, BsLink45Deg} from 'react-icons/bs'

export default function ThingsToDo({thingsToDo, title}) {
  const [category, setCategory] = useState(thingsToDo.slice(0, 6))
  const [viewedAll, setViewedAll] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  
  const allThingsToDo = thingsToDo

  function Activity() {
    // Auto close <details> tag when a new one is opened
    const close = (id) => {
      for (let i = 0; i < thingsToDo.length; i++) {
        const detail = document.getElementsByTagName('details')

        if (detail[i]?.open === 'true') {
          detail[i]?.open = true
        } else if (detail[i]?.open === 'false') {
          detail[i]?.open = false
          // Close current open details if clicked again
        } else if (thingsToDo[i].id !== id) {
          detail[i]?.open = false
        }
      }
    }

    return (
      <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
        {category?.map((thing) => (
          <details
            key={thing.id}
            onClick={() => close(thing.id)}
            className="w-full shadow-md h-max rounded-xl">
            <summary className="list-none cursor-pointer">
              <figure className="relative block bg-gray-200">
                <Image
                  src={thing?.images[0].url}
                  alt={thing?.images[0].altText}
                  width={300}
                  height={200}
                  layout="responsive"
                  className="object-cover rounded-xl"
                />
                <h3 className="absolute bottom-0 w-full h-auto px-2 pt-4 pb-2 text-xl font-bold text-white rounded-b-xl bg-gradient-to-t from-black">
                  {thing.title}
                </h3>

                <span className="absolute px-2 bg-green-500 rounded-md right-2 top-2">
                  {thing?.doFeesApply == 'true' ? '$' : 'Free'}
                </span>
              </figure>
            </summary>
            <div className="p-4 bg-white rounded-b-xl">
              <h3 className="mb-2 font-sans text-xs tracking-widest uppercase text-slate-400">
                Description
              </h3>
              <p className=" font-display">{thing?.shortDescription}</p>
              <a
                target="_blank"
                href={thing?.url}
                className="text-blue-500 underline font-display">
                <div className="flex items-center gap-1">
                  <BsLink45Deg />
                  <span>More info</span>
                </div>
              </a>

              {/* Fees */}
              {thing?.doFeesApply == 'true' && (
                <>
                  <h3 className="mt-4 mb-2 font-sans text-xs tracking-widest uppercase text-slate-400">
                    Fees
                  </h3>
                  <p className=" font-display">
                    {thing?.feeDescription.replace(/<[^>]+>/g, '')}
                  </p>
                </>
              )}
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4 w-ful">
                {/* Pets allowed */}
                {thing?.arePetsPermitted == 'true' && (
                  <span className="flex items-center gap-2 px-2 py-1 text-sm text-white bg-blue-500 rounded-md">
                    <MdPets />
                    <span>Pet Friendly</span>
                  </span>
                )}
                {/* Ages */}
                {thing?.age != '' && (
                  <span className="flex items-center gap-2 px-2 py-1 text-sm text-white bg-orange-400 rounded-md">
                    <BsFillPeopleFill />
                    <span>Ages:{thing?.age}</span>
                  </span>
                )}
                {/* Duration */}
                {thing?.duration != '' && (
                  <span className="flex items-center gap-2 px-2 py-1 text-sm text-white bg-green-600 rounded-md">
                    <MdOutlineAccessTimeFilled />
                    <span>Time:{thing?.duration}</span>
                  </span>
                )}
              </div>
            </div>
          </details>
        ))}
      </ul>
    )
  }

  function Filters() {
    const allActivities = thingsToDo.map((thing) => thing?.activities[0].name)
    const uniqueActivities = new Set(allActivities)

    const changeCategory = (e, name) => {
      e.preventDefault()
      setViewedAll(true)
      

      // reset things to do to ALL things to do
      if (name == 'all') {
      setActiveTab('all')
      setCategory(allThingsToDo)
      } else {
        // filter for the category of things to do
        setActiveTab(name)
        setCategory(
          thingsToDo.filter((item) => item?.activities[0].name == name)
        )
      }
    }

    return (
      <ul className="flex flex-wrap gap-4 mb-8">
        <button 
          className={`px-4 py-2 text-white bg-green-700 rounded-md ${activeTab !== 'all' &&'opacity-60'}`}
          name="all"
          onClick={(e) => changeCategory(e, 'all')}>
          All
        </button>
        {[...uniqueActivities].map((name, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-white bg-green-700 rounded-md ${activeTab !== name &&'opacity-60'}`}
            name={name}
            onClick={(e) => changeCategory(e, name)}>
            {name}
          </button>
        ))}
      </ul>
    )
  }

  const viewAll = () => {
    setCategory(allThingsToDo)
    setViewedAll(true)
  }

  return (
    <section className="mt-24">
      <h2 className="mb-6 text-3xl font-bold text-green-800">{title}</h2>
      {/* Filter by category */}
      <div>
        <h3 className="mb-4 font-sans text-xs tracking-widest uppercase text-slate-400">
          Category
        </h3>
        <Filters />
      </div>
      <span className='block mb-4 font-sans text-xs tracking-widest uppercase text-slate-700'>{category?.length} Results</span>
      
      <Activity />
      {!viewedAll && (
        <div className="w-full mt-8 text-center">
          <button
            onClick={viewAll}
            className="px-4 py-2 text-white bg-green-700 rounded-md">
            View all
          </button>
        </div>
      )}
    </section>
  )
}
