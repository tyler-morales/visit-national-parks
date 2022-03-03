import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {FiLink} from 'react-icons/fi'
import CollectionButton from '../../ParkPage/CollectionButton/CollectionButton'
// Write state codes and state name
const stateCodes = [
  {code: 'AL', name: 'Alabama'},
  {code: 'AK', name: 'Alaska'},
  {code: 'AZ', name: 'Arizona'},
  {code: 'AR', name: 'Arkansas'},
  {code: 'CA', name: 'California'},
  {code: 'CO', name: 'Colorado'},
  {code: 'CT', name: 'Connecticut'},
  {code: 'DE', name: 'Delaware'},
  {code: 'DC', name: 'District Of Columbia'},
  {code: 'FL', name: 'Florida'},
  {code: 'GA', name: 'Georgia'},
  {code: 'HI', name: 'Hawaii'},
  {code: 'ID', name: 'Idaho'},
  {code: 'IL', name: 'Illinois'},
  {code: 'IN', name: 'Indiana'},
  {code: 'IA', name: 'Iowa'},
  {code: 'KS', name: 'Kansas'},
  {code: 'KY', name: 'Kentucky'},
  {code: 'LA', name: 'Louisiana'},
  {code: 'ME', name: 'Maine'},
  {code: 'MD', name: 'Maryland'},
  {code: 'MA', name: 'Massachusetts'},
  {code: 'MI', name: 'Michigan'},
  {code: 'MN', name: 'Minnesota'},
  {code: 'MS', name: 'Mississippi'},
  {code: 'MO', name: 'Missouri'},
  {code: 'MT', name: 'Montana'},
  {code: 'NE', name: 'Nebraska'},
  {code: 'NV', name: 'Nevada'},
  {code: 'NH', name: 'New Hampshire'},
  {code: 'NJ', name: 'New Jersey'},
  {code: 'NM', name: 'New Mexico'},
  {code: 'NY', name: 'New York'},
  {code: 'NC', name: 'North Carolina'},
  {code: 'ND', name: 'North Dakota'},
  {code: 'OH', name: 'Ohio'},
  {code: 'OK', name: 'Oklahoma'},
  {code: 'OR', name: 'Oregon'},
  {code: 'PA', name: 'Pennsylvania'},
  {code: 'RI', name: 'Rhode Island'},
  {code: 'SC', name: 'South Carolina'},
  {code: 'SD', name: 'South Dakota'},
  {code: 'TN', name: 'Tennessee'},
  {code: 'TX', name: 'Texas'},
  {code: 'UT', name: 'Utah'},
  {code: 'VT', name: 'Vermont'},
  {code: 'VA', name: 'Virginia'},
  {code: 'WA', name: 'Washington'},
  {code: 'WV', name: 'West Virginia'},
  {code: 'WI', name: 'Wisconsin'},
  {code: 'WY', name: 'Wyoming'},
  {code: 'VI', name: 'Virgin Islands'},
  {code: 'AS', name: 'American Samoa'},
]

export default function Sidebar({nationalParks, selectedPark, parkData}) {
  // Convert state code to state name
  const stateName = (code) => {
    return stateCodes.find((state) => state.code === code).name
  }
  return (
    <div className="w-full p-6 bg-gray-100 border-2 border-green-800 rounded-lg">
      {nationalParks
        .filter((park) => park.parkCode == selectedPark)
        .map((park, index) => {
          return (
            <div key={index} className="flex flex-col justify-between h-full">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-center text-green-900">
                  {park.name}
                </h2>
                <Image
                  height={350}
                  width={600}
                  src={park.image.url}
                  alt={park.image.altText}
                  layout="responsive"
                  className="object-cover w-full rounded-md"
                />
                <span className="block mt-4 text-sm text-gray-400 uppercase">
                  description
                </span>
                <p className="mt-2 font-display">{park.description}</p>

                <span className="block mt-4 text-sm text-gray-400 uppercase">
                  States
                </span>
                <p className="mt-2 font-display">
                  {park.states.length == 2
                    ? stateName(park.states)
                    : park.states
                        .split(',')
                        .map((state, index) => stateName(state) + ' ')}
                </p>

                {/* TODO: Add Collection Button */}
                <CollectionButton
                  parkCode={parkData?.parkCode}
                  name={parkData?.name}
                  fullName={parkData?.fullName}
                  url={parkData?.image}
                />
              </div>

              <Link href={`/park/${park.parkCode}`}>
                <a className="flex gap-2 text-blue-600">
                  <FiLink size="1.25em" />
                  <span>More Info</span>
                </a>
              </Link>
            </div>
          )
        })}
    </div>
  )
}
