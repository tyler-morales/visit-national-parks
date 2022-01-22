import {useState, useEffect} from 'react'
import Image from 'next/image'

export default function ThingsToDo({thingsToDo, title}) {
  function Activity() {
    const close = (index) => {
      for (let i = 0; i < thingsToDo.length; i++) {
        const detail = document.getElementsByTagName('details')

        if (detail[i].open === 'true') {
          detail[i].open = true
        } else if (detail[i].open === 'false') {
          detail[i].open = false
        } else if (i !== index) {
          detail[i].open = false
        }
      }
    }

    return (
      <ul className="grid grid-cols-3 gap-10">
        {thingsToDo?.map((thing, index) => (
          <details
            key={index}
            onClick={() => close(index)}
            className="w-full shadow-md h-max rounded-xl">
            <summary className="list-none cursor-pointer">
              <figure className="relative block">
                <Image
                  src={thing?.images[0].url}
                  alt={thing?.images[0].altText}
                  width={300}
                  height={200}
                  layout="responsive"
                  className="object-cover rounded-xl"
                />
                <h3 className="absolute bottom-0 w-full h-auto pt-4 pb-2 pl-2 text-xl font-bold text-white rounded-b-xl bg-gradient-to-t from-black">
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

              {thing?.doFeesApply == 'true' && (
                <>
                  <h3 className="mt-4 mb-2 font-sans text-xs tracking-widest uppercase text-slate-400">
                    Fees
                  </h3>
                  <p className=" font-display">{thing?.feeDescription}</p>
                </>
              )}
            </div>
          </details>
        ))}
      </ul>
    )
  }

  return (
    <section className="mt-24">
      <h2 className="mb-10 text-3xl font-bold text-green-800">{title}</h2>
      <Activity />
    </section>
  )
}
