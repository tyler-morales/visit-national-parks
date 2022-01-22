import {useState} from 'react'
import MapGL, {Marker, Popup} from 'react-map-gl'

import {FaMapMarkerAlt} from 'react-icons/fa'
import {IoMdMap} from 'react-icons/io'

export default function MapBox({coordinates, fullName, parkCode: code, title}) {
  const {latitude, longitude} = coordinates

  const [viewport, setViewport] = useState({
    latitude: +latitude,
    longitude: +longitude,
    zoom: 8,
  })

  const [showPopup, togglePopup] = useState(false)

  return (
    <section className="mt-24">
      <h2 className="mb-10 text-3xl font-bold text-green-800">{title}</h2>
      {/* Map */}
      <MapGL
        {...viewport}
        width="100%"
        height="450px"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        className="border-2 border-green-800 rounded-lg">
        <Marker
          latitude={+latitude}
          longitude={+longitude}
          offsetLeft={-20}
          offsetTop={-10}
          className="relative">
          <FaMapMarkerAlt
            size="2em"
            className="text-blue-700 cursor-pointer"
            onClick={togglePopup}
          />
        </Marker>
        {showPopup && (
          <Popup
            latitude={+latitude}
            longitude={+longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => togglePopup(false)}
            style={{background: 'purple'}}
            anchor="top">
            <div className="px-4">
              <h3 className="px-4 mb-2 text-lg">{fullName}</h3>
              <div className="flex flex-col gap-2">
                <a
                  target="_blank"
                  href={`http://maps.google.com/maps?q=${latitude}+${longitude}`}>
                  <div className="flex items-center justify-center w-full gap-4 py-2 text-center text-white bg-blue-700 rounded-md font-display">
                    <IoMdMap color="#fff" size="1.25em" />
                    <span>Google Maps</span>
                  </div>
                </a>
                <a
                  target="_blank"
                  href={`https://www.nps.gov/${code}/planyourvisit/directions.htm`}>
                  <div className="flex items-center justify-center w-full gap-2 py-2 text-center text-blue-700 underline cursor-pointer font-display">
                    <span>NPS Link</span>
                  </div>
                </a>
              </div>
            </div>
          </Popup>
        )}
      </MapGL>
    </section>
  )
}
