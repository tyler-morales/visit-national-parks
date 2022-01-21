import {AiFillPhone} from 'react-icons/ai'

export default function GeneralInfo({description, states, contacts, title}) {
  const phoneNumber = contacts?.phoneNumbers[0]?.phoneNumber

  return (
    <section>
      <h2 className="mb-3 text-3xl font-bold text-green-800">{title}</h2>
      <p className="mt-4">{description}</p>

      <div className="flex items-center justify-between mt-8">
        <span className="block ">
          {states?.length > 2
            ? `States: ${states.split(',').map((state) => `\n${state}`)}` //add space between state abbreviations
            : `State: ${states}`}
        </span>

        <a
          className="block gap-2 px-4 py-2 text-white bg-blue-600 rounded-md w-max"
          href={`tel:+${phoneNumber}`}
          name="Phone number">
          <span className="flex flex-row items-center gap-2">
            <AiFillPhone />
            {phoneNumber}
          </span>
        </a>
      </div>
    </section>
  )
}
