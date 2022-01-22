import Image from 'next/image'

export default function ThingsToDo({thingsToDo, title}) {
  function Activity() {
    return (
      <ul className="grid grid-cols-3 gap-10">
        {thingsToDo?.map((thing, index) => (
          <li key={index} className="w-full h-max">
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
          </li>
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
